import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import TableRSVP from '@/components/tablersvp';
import { supabase } from '@/database/supabaseConfig';

export default function RSVPDetailScreen({ route }) {
    const { eventId } = route.params;
    const [rsvpData, setRsvpData] = useState([]);

    // console.log('Event ID sekarang:', eventId);
    useEffect(() => {
        const fetchRSVPData = async () => {
            const { data: rsvpData, error: rsvpError } = await supabase
                .from('rsvp')
                .select('id, guest_id, status')
                .eq('event_id', eventId);

            if (rsvpError) {
                console.error('Error fetching RSVP data:', rsvpError);
                return;
            }

            const guestIds = rsvpData.map(rsvp => rsvp.guest_id);
            const { data: guestsData, error: guestError } = await supabase
                .from('guests')
                .select('id, details')
                .in('id', guestIds);

            if (guestError) {
                console.error('Error fetching guest data:', guestError);
                return;
            }

            const userIds = guestsData.map(guest => guest.id);
            const { data: usersData, error: userError } = await supabase
                .from('users')
                .select('id, name, phone')
                .in('id', userIds);

            if (userError) {
                console.error('Error fetching user data:', userError);
                return;
            }

            const combinedData = rsvpData.map(rsvp => {
                const guest = guestsData.find(g => g.id === rsvp.guest_id);
                const user = usersData.find(u => u.id === guest.id);
                return {
                    id: rsvp.id,
                    guestName: user ? user.name : 'Unknown Guest',
                    phoneNumber: user ? user.phone : 'Unknown',
                    details: guest.details,
                    rsvpStatus: rsvp.status,
                };
            });

            setRsvpData(combinedData);
        };

        fetchRSVPData();
    }, [eventId]);

    console.log('RSVP Data:', rsvpData);
    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <TableRSVP data={rsvpData} />
        </ScrollView>
    );
}
