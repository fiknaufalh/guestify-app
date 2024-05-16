import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TotalConfirmed from '@/components/totalconfirmed';
import DashboardCard from '@/components/dashboardcard';
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
        <View className="bg-white flex-1 justify-center items-center">
            <Text>Tab 1 Content</Text>
        </View>
    );
}

function Tab2() {
    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white flex-1 h-full">
                <TotalConfirmed label="Total Confirmed" total="111200" description="undangan" />
                <View className='justify-center items-center'>
                    <DashboardCard />
                    <DashboardCard />
                    <DashboardCard />
                    <DashboardCard />
                </View>
            </View>
        </ScrollView>
    );
}

function Tab3() {
    return (
        <View className="bg-white flex-1">
            <TotalConfirmed label="Total Hadir" total="1" description="undangan" />
        </View>
    );
}
