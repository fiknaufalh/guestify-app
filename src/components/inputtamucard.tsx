import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function InputTamuCard({ number, title, description, icon, buttonText }) {
    const handleButtonPress = () => {
        console.log('Button Pressed');
    };

    return (
        <View className='border border-gray-300 p-4 rounded-lg w-11/12 mb-4'>
            <View className='flex-row'>
                <View className='items-center justify-center bg-primary-2 rounded-full h-10 w-10'>
                    <Text className='font-nun_bold text-xl text-white'>{number}</Text>
                </View>
                <View className='flex-1 ml-5'>
                    <Text className='text-lg font-nun_bold text-primary-2'>{title}</Text>
                    <Text className='text-md font-nun_regular text-gray-500 my-4'>
                        {description}
                    </Text>
                    <TouchableOpacity onPress={handleButtonPress} className="bg-secondary-2 px-4 py-3 rounded-md">
                        <View className='flex-row items-center'>
                            <MaterialIcons name={icon} size={24} color="white" />
                            <Text className="text-white font-nun_semibold text-center ml-2">{buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
