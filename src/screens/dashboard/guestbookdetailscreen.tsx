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
            const { data: checkinsData, error: checkinsError } = await supabase
                .from('checkins')
                .select('id, guest_id, scan_status, gift_status, souvenir_status')
                .eq('event_id', eventId);

            if (checkinsError) {
                console.error('Error fetching checkins data:', checkinsError.message);
                return;
            }

            const guestIds = checkinsData.map(checkin => checkin.guest_id);

            // Fetch guest details from users table
            const { data: guestsData, error: guestsError } = await supabase
                .from('users')
                .select('id, name, phone')
                .in('id', guestIds);

            if (guestsError) {
                console.error('Error fetching guests data:', guestsError.message);
                return;
            }

            // Fetch total guests from guestbook table
            const { data: guestbookData, error: guestbookError } = await supabase
                .from('guestbook')
                .select('id, guest_id, total_guests')
                .in('guest_id', guestIds);

            if (guestbookError) {
                console.error('Error fetching guestbook data:', guestbookError.message);
                return;
            }

            // Combine the data
            const combinedData = checkinsData.map(checkin => {
                const guest = guestsData.find(guest => guest.id === checkin.guest_id);
                const guestbookEntry = guestbookData.find(entry => entry.guest_id === checkin.guest_id);
                return {
                    id: checkin.id,
                    guestName: guest ? guest.name : 'Unknown Guest',
                    phoneNumber: guest ? guest.phone : 'Unknown',
                    scanStatus: checkin.scan_status,
                    giftStatus: checkin.gift_status,
                    souvenirStatus: checkin.souvenir_status,
                    totalGuests: guestbookEntry ? guestbookEntry.total_guests : 0,
                };
            });

            setGuestData(combinedData);
        };

        fetchGuestData();
    }, [route.params]);

    console.log('Guest Data:', guestData);
    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <GuestTable data={guestData} />
        </ScrollView>
    );
}
