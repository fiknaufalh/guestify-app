import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { type HomeNavigation } from '@/app/(tabs)/home';
import React from 'react'

export default function Payment() {
    const { navigate } = useNavigation<HomeNavigation>();
    const handleSelesaiPress = () => {
        navigate('HomeScreen');
    };
    return (
        <View className='bg-white h-full'>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-bold text-3xl my-10' style={{ textAlign: 'center', marginTop: 60 }}>Pembayaran</Text>
                <Text className='text-secondary-2 text-3xl font-bold my-10 mx-2'>Pembayaran Berhasil</Text>
                <Text className='text-black text-md m-2'>Silakan Menuju Dashboard Untuk Manage Acara Kamu</Text>
            </View>
            <TouchableOpacity className='justify-center items-center' onPress={handleSelesaiPress}>
                <View className="bg-secondary-2 my-10 px-4 py-3 w-11/12 rounded-full flex-row justify-center items-center">
                    <Text className="text-white font-semibold mr-2">Selesai</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}