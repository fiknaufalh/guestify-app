import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function QRCodeCard({ eventName, daysLeft }) {
    const navigation = useNavigation();

    const handleQRCodePress = () => {
        navigation.navigate('QRCode');
    };

    const handleEditPress = () => {
        navigation.navigate('EditEvent');
    };

    return (
        <View className='bg-primary-2 w-11/12 my-2 p-4 rounded-3xl flex-row'>
            <View className="flex-1">
                <Text className="text-white text-3xl font-bold my-2">{eventName}</Text>
                <Text className="text-white text-lg my-5">{daysLeft} hari lagi</Text>
            </View>
            <View className="flex-1 items-end justify-center">
                <TouchableOpacity className="bg-secondary-2 py-3 px-4 rounded-full mt-2 flex-row items-center" onPress={handleQRCodePress}>
                    <Text className="text-white font-bold mr-2"> QR </Text>
                    <MaterialIcons name="qr-code" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-secondary-2 py-3 px-4 rounded-full mt-2 flex-row items-center" onPress={handleEditPress}>
                    <Text className="text-white font-bold mr-2">Edit</Text>
                    <MaterialIcons name="edit" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
