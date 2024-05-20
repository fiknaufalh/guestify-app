import { View, Text } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function DashboardCard({ label, icon, status, invitees, pax, color }) {
    return (
        <View className='bg-primary-2 rounded-xl p-4 my-2 w-full'>
            <View className='flex-row justify-between'>
                <View className='bg-white rounded-full p-1.5 mr-4'>
                    <MaterialIcons name={icon} size={50} color={color} />
                </View>
                <View className='flex-col flex-1'>
                    <Text className='font-nun_bold text-white'>{label}</Text>
                    <View className='flex-row items-start'>
                        <Text className='text-3xl font-nun_bold text-white mt-2'>{status}</Text>
                        <Text className='text-white mt-4 font-nun_regular'> / {invitees} invitees</Text>
                    </View>
                </View>
                <View className='bg-white rounded-full justify-center self-center px-3 py-1 ml-2'>
                    <Text className='text-black text-md font-nun_semibold'>{pax}</Text>
                </View>
            </View>
        </View>
    );
}
