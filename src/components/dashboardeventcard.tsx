import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { EventNavigation } from '@/app/(tabs)/dashboard';
import { convertDate } from '@/utils/dateConverter';

interface EventCardProps {
    type: string,
    name: string,
    place: string,
    event_date: Date,
    status: string,
}

export default function DashboardEventCard({ type, name, place, event_date, status }: EventCardProps) {
    const navigation = useNavigation<EventNavigation>();

    const handlePress = () => {
        navigation.navigate('DashboardScreenEvent');
    };

    return (
        <TouchableOpacity
            className='bg-primary-2 my-3 rounded-xl py-4 px-8 w-11/12 justify-center items-center'
            style={{ width: 350 }}
            onPress={handlePress}
        >
            <Text className='text-white font-nun_bold text-lg mb-2'>{type}</Text>
            <Text className='text-secondary-2 font-nun_semibold text-md mb-2'>{name}</Text>
            <Text className='text-white font-nun_regular text-xs mb-2' style={{ textAlign: 'center' }}>{place}</Text>
            <Text className='text-white font-nun_regular text-xs mb-4'>{convertDate(event_date)}</Text>
            <View className='bg-secondary-2 rounded-full p-3'>
                <Text className='font-nun_semibold text-xs text-white'>{status}</Text>
            </View>
        </TouchableOpacity>
    )
}
