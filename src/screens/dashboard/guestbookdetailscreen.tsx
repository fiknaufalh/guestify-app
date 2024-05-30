import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import GuestTable from '@/components/guesttable';
import { supabase } from '@/database/supabaseConfig';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    GuestBookDetail: { eventId: number };
};

export default function GuestBookDetailScreens({ route }: { route: RouteProp<RootStackParamList, 'GuestBookDetail'> }) {
    const [guestData, setGuestData] = useState([]);
    const [eventId, setEventId] = useState(0);

    useEffect(() => {
        const fetchGuestData = async () => {
            // Get the eventId from route params
            const { eventId } = route.params;

            setEventId(eventId);

            // Fetch data for the event from checkins table
            const { data, error } = await supabase
                .from('checkins')
                .select('id, guest_id, scan_status, gift_status, souvenir_status')
                .eq('event_id', eventId);

            if (error) {
                console.error('Error fetching guest data:', error.message);
                return;
            }

            setGuestData(data);
        };

        fetchGuestData();
    }, [route.params]);

    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <GuestTable data={guestData} />
        </ScrollView>
    );
}
