import { View, Image } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useRoute, RouteProp } from '@react-navigation/native';
import Tab2 from './tabrsvp';
import Tab3 from './tabguestbook';
import InputTamuCard from '@/components/inputtamucard';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';

const appIcon = require('@/assets/icon.png');

const Tab = createMaterialTopTabNavigator();

type RootStackParamList = {
    DashboardScreenEvent: { eventId: number };
};

export default function DashboardScreenEvent() {
    const route = useRoute<RouteProp<RootStackParamList, 'DashboardScreenEvent'>>();
    const { eventId } = route.params;

    console.log("sedang mengakses:", eventId)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View className="pt-8 bg-primary-2 justify-center items-center"
                style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
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
                    style={{ marginTop: 2, marginHorizontal: 3 }}
                >
                    <Tab.Screen name="Input Tamu" component={Tab1} />

                    <Tab.Screen name="RSVP Dashboard">
                        {({ navigation }) => <Tab2 navigation={navigation} initialParams={{ eventId }} />}
                    </Tab.Screen>

                    <Tab.Screen name="Guest Book">
                        {({ navigation }) => <Tab3 navigation={navigation} initialParams={{ eventId }} />}
                    </Tab.Screen>

                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
}

function Tab1() {
    return (
        <ScrollView style={{ backgroundColor: 'white', flex: 1, paddingBottom: 150, paddingTop: 50 }}>
            <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <InputTamuCard number={1} title={"Silakan Download Template"} description={"Silakan klik tombol “Download Template” di sini untuk mendapatkan template daftar tamu dalam format file spreadsheet (*.XLS). Selanjutnya, isi file tersebut dengan data tamu Anda sesuai format yang ditentukan."} icon={"file-download"} buttonText={"Download Template"} />
                <InputTamuCard number={2} title={"Unggah File yang Telah Anda Isi"} description={"Kemudian upload file yang sudah Anda isi dengan mengklik tombol upload di bawah. Format file harus *.XLS dengan ukuran maksimal 100 KB."} icon={"file-upload"} buttonText={"Upload Filled File"} />
                <InputTamuCard number={3} title={"Unduh File yang Dihasilkan"} description={"Terakhir, Anda dapat mendownload hasilnya setelah tombol download dapat diklik."} icon={"file-download"} buttonText={"Download Generated File"} />
            </View>
        </ScrollView>
    );
}