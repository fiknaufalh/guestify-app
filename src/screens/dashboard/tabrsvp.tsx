import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import TotalConfirmed from '@/components/totalconfirmed';
import DashboardCard from '@/components/dashboardcard';
import RSVPDetailScreen from './rsvpdetailscreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { supabase } from '@/database/supabaseConfig';

const Tab2Stack = createStackNavigator();

interface RSVPDashboardProps {
    navigation: StackNavigationProp<any>;
    route: RouteProp<{ params: { eventId: number } }, 'params'>;
}

function RSVPDashboard({ navigation, route }: RSVPDashboardProps) {
    const { eventId } = route.params;
    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const [totalPending, setTotalPending] = useState(0);
    const [totalDeclined, setTotalDeclined] = useState(0);
    const [totalGuests, setTotalGuests] = useState(0);

    console.log('Event ID:', eventId);
    useEffect(() => {
        const fetchRSVPData = async () => {
            const { data: guests, error } = await supabase
                .from('guests')
                .select('*')
                .eq('event_id', eventId);

            if (error) {
                console.error('Error fetching guests:', error);
                return;
            }

            setTotalGuests(guests.length);

            const { data: rsvps, error: rsvpError } = await supabase
                .from('rsvp')
                .select('*')
                .eq('event_id', eventId);

            if (rsvpError) {
                console.error('Error fetching RSVPs:', rsvpError);
                return;
            }

            const confirmed = rsvps.filter(rsvp => rsvp.status === 'confirmed').length;
            const pending = rsvps.filter(rsvp => rsvp.status === 'pending').length;
            const declined = rsvps.filter(rsvp => rsvp.status === 'declined').length;

            setTotalConfirmed(confirmed);
            setTotalPending(pending);
            setTotalDeclined(declined);
        };

        fetchRSVPData();
    }, [eventId]);

    const handleDetailPress = () => {
        navigation.navigate('RSVPDetail');
    };

    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white flex-1 h-full">
                <TotalConfirmed label="Total Confirmed" total={totalConfirmed} description="undangan" />
                <View className='justify-center items-center'>
                    <DashboardCard label={"Confirmed"} icon="supervised-user-circle" status={totalConfirmed} invitees={totalGuests} pax={`${totalConfirmed / totalGuests} %`} color={"#3EC04B"} />
                    <DashboardCard label={"Pending"} icon="pending-actions" status={totalPending} invitees={totalGuests} pax={`${((totalPending / totalGuests) * 100).toFixed(2)} %`} color={"#E9A400"} />
                    <DashboardCard label={"Declined"} icon="cancel" status={totalDeclined} invitees={totalGuests} pax={`${((totalDeclined / totalGuests) * 100).toFixed(2)} %`} color={"#ED4C4D"} />
                </View>
                <TouchableOpacity className='items-center mt-4' onPress={handleDetailPress}>
                    <View className="bg-secondary-2 py-4 px-8 rounded-full flex-row justify-center items-center">
                        <Text className="text-white font-nun_semibold">Lihat Detail</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default function Tab2({ navigation, initialParams }: { navigation: StackNavigationProp<any>; initialParams: { eventId: number } }) {
    return (
        <Tab2Stack.Navigator>
            <Tab2Stack.Screen
                name="RSVPDashboard"
                component={RSVPDashboard}
                options={{ headerShown: false }}
                initialParams={initialParams}
            />
            <Tab2Stack.Screen
                name="RSVPDetail"
                component={RSVPDetailScreen}
                options={{ headerShown: false }}
                initialParams={initialParams}
            />
        </Tab2Stack.Navigator>
    );
}
