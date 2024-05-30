import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react'
import { useRouter, useRootNavigationState, Redirect } from 'expo-router';
import { useAuth } from '@/contexts/authContext';

const profilePic = require('../assets/profpic.jpeg');
const appIcon = require('../assets/icon.png');

export default function ProfileScreen() {

    const { logout, user } = useAuth()
    const router = useRouter();

    const handleLogout = async () => {
        console.log("logout")
        console.log("user: ", user)
        const { success } = await logout()
    }

    // Debug
    const handleEditProfile = async () => {
        console.log("user: ", user)
    }

    return (
        <>
            <View className="pt-8 bg-primary-2 justify-center items-center"
                style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
            </View>
            <ScrollView className='bg-white h-full mb-200' contentContainerStyle={{ paddingBottom: 200 }}>
                <View className="p-5 items-center">
                    <Text className="text-primary-2 text-2xl font-jos_bold">Profil Kamu</Text>
                </View>
                <View className="items-center mt-5">
                    <Image source={profilePic} className="w-40 h-40 rounded-full" />
                </View>
                <View className="px-5 mt-5">
                    <View className="mb-5">
                        <Text className="text-primary-1 text-lg font-nun_bold mb-2">Nama:</Text>
                        <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{user?.name}</Text>
                    </View>

                    <View className="mb-5">
                        <Text className="text-primary-1 text-lg font-nun_bold mb-2">Email:</Text>
                        <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{user?.email}</Text>
                    </View>

                    <View>
                        <Text className="text-primary-1 text-lg font-nun_bold mb-2">Phone:</Text>
                        <Text className="bg-gray-200 px-4 py-3 rounded-lg font-nun_regular">{user?.phone}</Text>
                    </View>

                    <TouchableOpacity onPress={handleEditProfile}>
                        <View className="bg-primary-2 my-5 px-4 py-2 rounded-full flex-row justify-center items-center">
                            <Text className="text-white text-lg font-nun_semibold mr-2">Edit Profil</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout}>
                        <View className="bg-red-600 px-4 py-2 rounded-full flex-row justify-center items-center">
                            <Text className="text-white text-lg font-nun_semibold mr-2">Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}