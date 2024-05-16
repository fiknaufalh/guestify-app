import { View, Text } from 'react-native'
import React from 'react'

export default function TotalConfirmed({ label, total, description }) {
    return (
        <View className='items-center mt-6'>
            <Text className='text-black text-lg font-nun_extrabold'>{label}</Text>
            <View className='flex-row mt-4'>
                <Text className='text-primary-2 p-1 text-5xl font-nun_bold mr-2'>{total}</Text>
                <Text className='text-black text-lg font-nun_regular mt-4'>{description}</Text>
            </View>
        </View>
    )
}
