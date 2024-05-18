import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Tab2 from './tabrsvp';
import Tab3 from './tabguestbook';
import InputTamuCard from '@/components/inputtamucard';
import { ScrollView } from 'react-native-gesture-handler';

const appIcon = require('@/assets/icon.png');

const Tab = createMaterialTopTabNavigator();

export default function DashboardScreenEvent() {
    return (
        <View className='bg-white h-full'>
            <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
            </View>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: '#000',
                        tabBarInactiveTintColor: '#ccc',
                        tabBarLabelStyle: { fontSize: 12, fontFamily: 'NunitoSans-Regular', textTransform: 'none' },
                        tabBarItemStyle: { width: 120 },
                        tabBarStyle: { backgroundColor: '#fff' },
                        tabBarIndicatorStyle: { backgroundColor: '#690895' }
                    }}
                    className='mt-2 mx-3'
                >
                    <Tab.Screen name="Input Tamu" component={Tab1} />
                    <Tab.Screen name="RSVP Dashboard" component={Tab2} />
                    <Tab.Screen name="Guest Book" component={Tab3} />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

function Tab1() {
    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 150, paddingTop: 50 }}>
            <View className="bg-white flex-1 justify-center items-center">
                <InputTamuCard number={1} title={"Silakan Download Template"} description={"Silakan klik tombol “Download Template” di sini untuk mendapatkan template daftar tamu dalam format file spreadsheet (*.XLS). Selanjutnya, isi file tersebut dengan data tamu Anda sesuai format yang ditentukan."} icon={"file-download"} buttonText={"Download Template"} />
                <InputTamuCard number={2} title={"Unggah File yang Telah Anda Isi"} description={"Kemudian upload file yang sudah Anda isi dengan mengklik tombol upload di bawah. Format file harus *.XLS dengan ukuran maksimal 100 KB."} icon={"file-upload"} buttonText={"Upload Filled File"} />
                <InputTamuCard number={3} title={"Unduh File yang Dihasilkan"} description={"Terakhir, Anda dapat mendownload hasilnya setelah tombol download dapat diklik."} icon={"file-download"} buttonText={"Download Generated File"} />
            </View>
        </ScrollView>
    );
}

