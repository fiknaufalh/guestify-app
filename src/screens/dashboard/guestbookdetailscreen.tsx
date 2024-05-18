import GuestTable from '@/components/guesttable';
import React from 'react';
import data from '@/assets/datadummyguest.json';
import { ScrollView } from 'react-native-gesture-handler';

export default function GuestBookDetailScreens() {
    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 150 }}>
            <GuestTable data={data} />
        </ScrollView>
    );
}
