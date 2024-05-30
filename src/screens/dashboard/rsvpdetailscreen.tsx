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
            const { data, error } = await supabase
                .from('rsvp')
                .select('id, guest_id, status')
                .eq('event_id', eventId);

            if (error) {
                console.error('Error fetching RSVP data:', error);
                return;
            }

            const guestIds = data.map(rsvp => rsvp.guest_id);
            const { data: guests, error: guestError } = await supabase
                .from('guests')
                .select('id, details')
                .in('id', guestIds);

            if (guestError) {
                console.error('Error fetching guest data:', guestError);
                return;
            }

            const combinedData = data.map(rsvp => {
                const guest = guests.find(g => g.id === rsvp.guest_id);
                return {
                    id: rsvp.id,
                    guestName: guest ? guest.details : 'Unknown Guest',
                    phoneNumber: guest ? guest.details : 'Unknown',
                    details: guest ? guest.details : 'No details',
                    rsvpStatus: rsvp.status,
                };
            });

            setRsvpData(combinedData);
        };

        fetchRSVPData();
    }, [eventId]);

    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <TableRSVP data={rsvpData} />
        </ScrollView>
    );
}
