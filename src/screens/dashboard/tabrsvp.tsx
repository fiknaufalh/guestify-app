import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import TotalConfirmed from '@/components/totalconfirmed';
import DashboardCard from '@/components/dashboardcard';
import RSVPDetailScreen from './rsvpdetailscreen';

const Tab2Stack = createStackNavigator();

function RSVPDashboard({ navigation }) {
    const handleDetailPress = () => {
        navigation.navigate('RSVPDetail');
    };

    return (
        <ScrollView className='bg-white' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white flex-1 h-full">
                <TotalConfirmed label="Total Confirmed" total="111200" description="undangan" />
                <View className='justify-center items-center'>
                    <DashboardCard label={"Confirmed"} icon="supervised-user-circle" status={140} invitees={129} pax={"200 pax"} color={"#3EC04B"} />
                    <DashboardCard label={"Pending"} icon="pending-actions" status={185} invitees={150} pax={"80 %"} color={"#E9A400"} />
                    <DashboardCard label={"Declined"} icon="cancel" status={60} invitees={100} pax={"40 %"} color={"#ED4C4D"} />
                </View>
                <TouchableOpacity className='items-center mt-4' onPress={handleDetailPress}>
                    <View className="bg-secondary-2 py-4 px-8 rounded-full flex-row justify-center items-center">
                        <Text className="text-white font-nun_semibold">Lihat Detail</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default function Tab2() {
    return (
        <Tab2Stack.Navigator>
            <Tab2Stack.Screen
                name="RSVPDashboard"
                component={RSVPDashboard}
                options={{ headerShown: false }}
            />
            <Tab2Stack.Screen
                name="RSVPDetail"
                component={RSVPDetailScreen}
                options={{ headerShown: false }}
            />
        </Tab2Stack.Navigator>
    );
}
