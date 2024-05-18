import React from 'react';
import data from '@/assets/datadummyrsvp.json';
import TableRSVP from '@/components/tablersvp';
import { ScrollView } from 'react-native-gesture-handler';

export default function RSVPDetailScreen() {
    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <TableRSVP data={data} />
        </ScrollView>
    );
}
