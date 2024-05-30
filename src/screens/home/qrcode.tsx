import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type HomeNavigation } from '@/app/(tabs)/home';
import QRCode from 'react-native-qrcode-svg';

const qr = require('@/assets/qrdummy.png');
export default function QRCodeScreen() {
    const { navigate } = useNavigation<HomeNavigation>();
    const route = useRoute();
    const { qrCodeString }: any = route.params;

    console.log('QR Code:', qrCodeString);

    const handleDaftarQRPress = () => {
        console.log('Barcode pressed');
        navigate('DaftarQR');
    }
    return (
        <View className='bg-white h-full'>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-jos_bold text-3xl mb-10' style={{ textAlign: 'center', marginTop: 60 }}>Silakan Scan QR Code Kamu Saat Sebelum Masuk</Text>

                <QRCode
                    value={qrCodeString}
                    size={200}
                    color="#000"
                    backgroundColor="#fff"
                />

                <Text className='text-primary-2 mt-4 text-lg font-nun_semibold' style={{ textAlign: 'center' }}>{qrCodeString}</Text>
                <Text className='text-black font-nun_bold text-lg my-5' style={{ textAlign: 'center' }}>Jangan lupa hadir!</Text>
                <TouchableOpacity onPress={handleDaftarQRPress}>
                    <View className="mt-6 bg-secondary-2 py-4 px-5 rounded-full flex-row justify-center items-center" style={{ width: 200 }}>
                        <Text className="text-white text-lg font-nun_semibold mr-2">Daftar QR Code</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}