import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { type HomeNavigation } from '@/app/(tabs)/home';

const qr = require('@/assets/qrdummy.png');
export default function QRCode() {
    const { navigate } = useNavigation<HomeNavigation>();

    const handleDaftarQRPress = () => {
        console.log('Barcode pressed');
        navigate('DaftarQR');
    }
    return (
        <View className='bg-white h-full'>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-bold text-3xl mb-10' style={{ textAlign: 'center', marginTop: 60 }}>Silakan Scan QR Code Kamu Saat Sebelum Masuk</Text>
                <Image source={qr} className='mt-10 mb-5' />
                <Text className='text-primary-2 text-lg' style={{ textAlign: 'center' }}>A100</Text>
                <Text className='text-primary-2 font-bold text-lg my-5' style={{ textAlign: 'center' }}>Jangan lupa hadir!</Text>
                <TouchableOpacity onPress={handleDaftarQRPress}>
                    <View className="mt-8 bg-secondary-2 py-4 px-5 rounded-full flex-row justify-center items-center" style={{ width: 200 }}>
                        <Text className="text-white font-semibold mr-2">Daftar QR Code</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}