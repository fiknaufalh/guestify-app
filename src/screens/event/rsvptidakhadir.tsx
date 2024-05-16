import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { type EventNavigation } from '@/app/(tabs)/event';

const checked = require('@/assets/checkinberhasil.png');

export default function RSVPTidakHadir() {
    const { navigate } = useNavigation<EventNavigation>();

    const handleBerandaPress = () => {
        navigate('EventScreen'); // Navigasi ke EventScreen saat tombol Beranda diklik
    };

    return (
        <View className='bg-white h-full'>
            <View className='justify-center items-center'>
                <Text className='text-primary-2 font-jos_bold text-3xl mx-20 mb-5' style={{ textAlign: 'center', marginTop: 80 }}>Selamat, Kamu Berhasil Mengisi RSVP</Text>
                <Image source={checked} className='mb-5' />
                <Text className='text-black font-nun_semibold text-lg mx-5 mb-5' style={{ textAlign: 'center' }}>Terima kasih sudah mengisi. Semoga lain kali kamu bisa ikut acaranya yaa!</Text>
                <TouchableOpacity onPress={handleBerandaPress}>
                    <View className="bg-secondary-2 py-4 px-5 rounded-full flex-row justify-center items-center" style={{ width: 300 }}>
                        <Text className="text-white font-nun_semibold mr-2">Selesai</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}