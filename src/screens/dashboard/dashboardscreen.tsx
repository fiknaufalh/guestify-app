import { View, Text, Image } from 'react-native'
import React from 'react'
import DashboardEventCard from '@/components/dashboardeventcard';
import { ScrollView } from 'react-native-gesture-handler';

const appIcon = require('../../assets/icon.png');

export default function DashboardScreen() {
    const events = [
        {
            title: 'Acara Pernikahan',
            names: 'Michael & Putri',
            location: 'Wisma Tamansari, Medan, Sumatera Utara',
            date: '20 Maret 2024',
            status: 'Belum Berlangsung'
        },
        {
            title: 'Acara Ulang Tahun',
            names: 'Dewi & Siti',
            location: 'Hotel Santika, Jakarta',
            date: '10 Juni 2024',
            status: 'Sudah Berlangsung'
        },
        {
            title: 'Acara Seminar',
            names: 'Dr. Arief & Tim',
            location: 'Balai Kartini, Jakarta',
            date: '15 Juli 2024',
            status: 'Akan Datang'
        }
    ];

    return (
        <ScrollView>
            <View className="bg-white h-full" style={{ paddingBottom: 200 }}>
                <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Image source={appIcon} className="w-40 h-24" />
                    <Text className='mb-5 font-nun_bold text-white text-lg'>Daftar Acara Anda</Text>
                </View>
                <View className='justify-center items-center p-4'>
                    {events.map((event, index) => (
                        <DashboardEventCard
                            key={index}
                            title={event.title}
                            names={event.names}
                            location={event.location}
                            date={event.date}
                            status={event.status}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}
