import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export default function Payment() {
    const navigation = useNavigation();
    const handleLanjutkanPress = () => {
        navigation.navigate('PaymentCompleted');
    };
    return (
        <View className='bg-white h-full'>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-jos_bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>Pembayaran</Text>
            </View>
            <View className="px-5">
                <Text className='text-secondary-2 text-3xl font-nun_bold mx-2'>Total Harga</Text>
                <Text className='text-black text-xl font-nun_bold m-2'>Rp 1,000,000</Text>
            </View>
            <TouchableOpacity className='justify-center items-center' onPress={handleLanjutkanPress}>
                <View className="bg-secondary-2 my-10 px-4 py-3 w-11/12 rounded-full flex-row justify-center items-center">
                    <Text className="text-white text-lg font-nun_semibold mr-2">Lanjutkan</Text>
                    <MaterialIcons name="arrow-right" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    )
}