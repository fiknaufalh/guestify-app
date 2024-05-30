import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import QRCodeCard from '../../components/qrcodecard'
import { ScrollView } from 'react-native-gesture-handler'
import { supabase } from '@/database/supabaseConfig';
import { useAuth } from '@/contexts/authContext';
import { formatDistanceToNow } from 'date-fns';

export default function DaftarQR() {
    const [events, setEvents] = useState<any[]>([]);
    const { user } = useAuth();
    const userId = user?.userId;

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('guests')
                .select('*, events(*)')
                .eq('id', userId);

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

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    console.log(events);

    return (
        <ScrollView className='bg-white'>
            <View className='h-full items-center' style={{ paddingBottom: 200 }}>
                <Text className='text-primary-2 font-jos_bold text-3xl mt-20 mb-10'>Daftar QR Code</Text>
                <View className='flex justify-center items-center'>
                    {events.map(data => (
                            <QRCodeCard key={data.id} eventName={data.events.name} 
                                    qrCodeString={data.qr_code} daysLeft={
                                formatDistanceToNow(data.events.event_date, { addSuffix: false }).replace(" days", "")
                            }/>
                        ))}
                </View>
            </View>
        </ScrollView>
    )
}
