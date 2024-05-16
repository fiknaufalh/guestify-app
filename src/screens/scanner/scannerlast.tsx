import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { type ScannerNavigation } from '@/app/(tabs)/scanner';

const appIcon = require('@/assets/icon.png');
const checked = require('@/assets/checkinberhasil.png');

export default function ScannerLast() {
    const { navigate } = useNavigation<ScannerNavigation>();

    const handleBarcodePress = () => {
        console.log('Barcode pressed');
        navigate('Scanner');
    }
    return (
        <View className='bg-white h-full'>
            <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
            </View>
            <View className='justify-center items-center'>
                <Text className='text-primary-2 font-jos_bold text-2xl mb-5' style={{ textAlign: 'center', marginTop: 40 }}>Data Anda Berhasil Disimpan Dalam Buku Tamu</Text>
                <Image source={checked} className='mb-5' />
                <TouchableOpacity onPress={handleBarcodePress}>
                    <View className="mt-8 bg-secondary-2 py-4 px-5 rounded-full flex-row justify-center items-center" style={{ width: 300 }}>
                        <Text className="text-white font-nun_bold mr-2">Kembali ke QR Code</Text>
                        <MaterialIcons name="qr-code" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}