import { View, Text, Image } from 'react-native'
import React from 'react'
import QRCodeCard from '../../components/qrcodecard'

export default function DaftarQR() {
    return (
        <View className='bg-white h-full items-center'>
            <Text className='text-primary-2 font-bold text-3xl mt-20 mb-10'>Daftar QR Code</Text>
            <View className='flex justify-center items-center'>
                <QRCodeCard eventName="Event A" daysLeft={2} />
                <QRCodeCard eventName="Event B" daysLeft={5} />
                <QRCodeCard eventName="Event C" daysLeft={1} />
                <QRCodeCard eventName="Event D" daysLeft={3} />
            </View>
        </View>
    )
}
