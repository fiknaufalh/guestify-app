import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { type HomeNavigation } from '@/app/(tabs)/home';

export default function QRCodeCard({ eventName, daysLeft, qrCodeString }) {
    const { navigate } = useNavigation<HomeNavigation>();

    const handleQRCodePress = () => {
        navigate('QRCodeScreen', { qrCodeString });
    };

    const handleEditPress = () => {
        navigate('EditEvent');
    };

    return (
        <View className='bg-primary-2 w-11/12 my-2 p-4 px-8 rounded-3xl flex-row'>
            <View className="flex-1">
                <Text className="text-white text-xl mt-3 font-nun_bold">{eventName}</Text>
                <Text className="text-white text-lg my-3 font-nun_light">{daysLeft} hari lagi</Text>
            </View>
            <View className="flex-1 items-end justify-center">
                <TouchableOpacity className="bg-secondary-2 py-3 px-4 rounded-full mt-2 flex-row items-center" onPress={handleQRCodePress}>
                    <Text className="text-white mr-2 font-nun_bold"> QR </Text>
                    <MaterialIcons name="qr-code" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
