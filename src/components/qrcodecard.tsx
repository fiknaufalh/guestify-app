import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook

export default function QRCodeCard({ eventName, daysLeft }) {
    const navigation = useNavigation(); // initialize navigation

    // function to handle button press
    const handleQRCodePress = () => {
        navigation.navigate('QRCode'); // navigate to QRCode screen
    };

    return (
        <View className='bg-primary-2 w-11/12 my-2 p-4 rounded-3xl flex-row'>
            <View className="flex-1">
                <Text className="text-white text-3xl font-bold my-2">{eventName}</Text>
                <Text className="text-white text-lg my-2">{daysLeft} hari lagi</Text>
            </View>
            <View className="flex-1 items-end justify-center">
                <TouchableOpacity className="bg-secondary-2 py-3 px-4 rounded-full mt-2" onPress={handleQRCodePress}>
                    <Text className="text-white font-bold">QR Code</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
