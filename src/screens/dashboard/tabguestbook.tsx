import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import TotalConfirmed from '@/components/totalconfirmed';
import DashboardCard from '@/components/dashboardcard';
import GuestBookDetailScreens from './guestbookdetailscreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { supabase } from '@/database/supabaseConfig';

const Tab2Stack = createStackNavigator();

interface GuestBookProps {
    navigation: StackNavigationProp<any>;
    route: RouteProp<{ params: { eventId: number } }, 'params'>;
}

function GuestBook({ navigation, route }: GuestBookProps) {
    const { eventId } = route.params;
    const [totalGuests, setTotalGuests] = useState(0);
    const [totalCheckIns, setTotalCheckIns] = useState(0);
    const [totalGifts, setTotalGifts] = useState(0);
    const [totalSouvenirs, setTotalSouvenirs] = useState(0);

    useEffect(() => {
        const fetchEventData = async () => {
            // Fetch total guests for the event
            const { data: guests, error: guestError } = await supabase
                .from('guests')
                .select('id')
                .eq('event_id', eventId);

            if (guestError) {
                console.error('Error fetching guests:', guestError.message);
                return;
            }

            setTotalGuests(guests.length);

            // Fetch total check-ins for the event
            const { data: checkins, error: checkinError } = await supabase
                .from('checkins')
                .select('id')
                .eq('event_id', eventId);

            if (checkinError) {
                console.error('Error fetching check-ins:', checkinError.message);
                return;
            }

            setTotalCheckIns(checkins.length);

            // Fetch total gifts for the event
            const { data: gifts, error: giftError } = await supabase
                .from('checkins')
                .select('id')
                .eq('event_id', eventId)
                .eq('gift_status', true);

            if (giftError) {
                console.error('Error fetching gifts:', giftError.message);
                return;
            }

            setTotalGifts(gifts.length);

            // Fetch total souvenirs for the event
            const { data: souvenirs, error: souvenirError } = await supabase
                .from('checkins')
                .select('id')
                .eq('event_id', eventId)
                .eq('souvenir_status', true);

            if (souvenirError) {
                console.error('Error fetching souvenirs:', souvenirError.message);
                return;
            }

            setTotalSouvenirs(souvenirs.length);
        };

        fetchEventData();
    }, [eventId]);

    const handleDetailPress = () => {
        navigation.navigate('GuestBookDetail', { eventId });
    };

    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white flex-1 h-full">
                <TotalConfirmed label="Total Confirmed" total={totalGuests} description="undangan" />
                <View className='justify-center items-center'>
                    <DashboardCard label={"Checked-In"} icon="supervised-user-circle" status={totalCheckIns} invitees={totalGuests} pax={`${((totalCheckIns / totalGuests) * 100).toFixed(2)} %`} color={"#690895"} />
                    <DashboardCard label={"Angpao"} icon="money" status={totalGifts} invitees={totalGuests} pax={`${((totalGifts / totalGuests) * 100).toFixed(2)} %`} color={"#690895"} />
                    <DashboardCard label={"Souvenir"} icon="card-giftcard" status={totalSouvenirs} invitees={totalGuests} pax={`${((totalSouvenirs / totalGuests) * 100).toFixed(2)} %`} color={"#690895"} />
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

export default function Tab3({ navigation, initialParams }: { navigation: StackNavigationProp<any>; initialParams: { eventId: number } }) {
    return (
        <Tab2Stack.Navigator>
            <Tab2Stack.Screen
                name="GuestBook"
                component={GuestBook}
                options={{ headerShown: false }}
                initialParams={initialParams}
            />
            <Tab2Stack.Screen
                name="GuestBookDetail"
                component={GuestBookDetailScreens}
                options={{ headerShown: false }}
                initialParams={initialParams}
            />
        </Tab2Stack.Navigator>
    );
}
