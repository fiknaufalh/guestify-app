import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export default function DashboardCard() {
    return (
        <View className='bg-primary-2 rounded-xl p-4 my-2'>
            <View className='flex-row justify-between'>
                <View className='bg-white rounded-full p-3 mr-4'>
                    <MaterialIcons name="event" size={40} color="#690895" />
                </View>
                <View className='flex-col'>
                    <Text className='font-nun_bold text-white'>Confirmed</Text>
                    <View className='flex-row'>
                        <Text className='text-3xl font-nun_bold text-white mt-2'>140</Text>
                        <Text className='text-white mt-4 font-nun_regular'> / 129 invitees</Text>
                    </View>
                </View>
                <View className='bg-white rounded-full justify-center self-center px-3 py-1 ml-2'>
                    <Text className='text-black text-md font-nun_semibold'>200 pax</Text>
                </View>
            </View>
        </View>
    )
}