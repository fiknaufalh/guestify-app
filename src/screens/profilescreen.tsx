import { View, Text, Image } from 'react-native'
import React from 'react'

const profilePic = require('../assets/profpic.jpeg');
const appIcon = require('../assets/icon.png');

export default function ProfileScreen() {
    return (
        <View className='bg-white h-full'>
            <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
            </View>
            <View className="p-5 items-center">
                <Text className="text-primary-2 text-2xl font-jos_bold">Profil Kamu</Text>
            </View>
            <View className="items-center mt-5">
                <Image source={profilePic} className="w-40 h-40 rounded-full" />
            </View>
            <View className="px-5 mt-5">
                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Nama:</Text>
                    <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{`Michael Sihotang`}</Text>
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Email:</Text>
                    <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{`michaelganteng@gmail.com`}</Text>
                </View>

                <View>
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Password:</Text>
                    <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{`********`}</Text>
                </View>
            </View>
        </View>
    )
}