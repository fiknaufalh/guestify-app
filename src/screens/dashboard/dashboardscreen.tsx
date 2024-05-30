import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import DashboardEventCard from '@/components/dashboardeventcard';
import { ScrollView } from 'react-native-gesture-handler';
import { collection, getDocs, Timestamp, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/database/firebaseConfig';
import { supabase } from '@/database/supabaseConfig';
import { useAuth } from '@/contexts/authContext';

const appIcon = require('../../assets/icon.png');

type Event = {
    id: number,
    organizer_id: string,
    type: string,
    name: string,
    place: string,
    event_date: Date,
    price: number,
    status: string,
}

export default function DashboardScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const { user } = useAuth();
    const userId = user.userId;

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('organizer_id', userId);

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                const eventsData = data.map(event => ({
                    ...event,
                    event_date: new Date(event.event_date), // Convert string to Date object
                }));
                setEvents(eventsData);
            }
        };

        fetchData();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel("event-changes")
            .on(
                'postgres_changes',
                {
                    event: "*",
                    schema: "public",
                    table: "events",
                },
                payload => { fetchData(); }
            )
            .subscribe();

        console.log("HAI")

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return (
        <ScrollView className="bg-white h-full" contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
                <Text className='mb-5 font-nun_bold text-white text-lg'>Daftar Acara Anda</Text>
            </View>
            <View className='justify-center items-center p-4'>
                {events.map((event, index) => (
                    <View key={index} style={{ width: '100%', alignItems: 'center' }}>
                        <DashboardEventCard
                            id={event.id}
                            type={event.type}
                            name={event.name}
                            place={event.place}
                            event_date={event.event_date}
                            status={event.status}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}
