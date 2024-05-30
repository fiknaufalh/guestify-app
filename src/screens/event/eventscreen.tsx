import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { type EventNavigation } from '@/app/(tabs)/event'
import { useState } from 'react'
import { useAuth } from '@/contexts/authContext'
import { supabase } from '@/database/supabaseConfig';

export default function EventScreen() {
    const [textInputValue, setTextInputValue] = useState('');
    const { navigate } = useNavigation<EventNavigation>();
    const { user } = useAuth();
    const firstName = user?.name?.split(" ")[0] || "User";

    const handleLanjutkanPress = async () => {
        if (textInputValue.trim() === '') {
            // Alert jika teks kosong
            Alert.alert('Peringatan', 'Mohon masukkan kode undangan terlebih dahulu.');
            return;
        } 

        console.log('Kode undangan:', textInputValue)

        // Ambil data acara berdasarkan kode undangan
        const { data, error } = await supabase
            .from('events') // Sesuaikan dengan nama tabel acara Anda di Supabase
            .select('*')
            .eq('event_code', textInputValue) // Sesuaikan dengan kolom kode undangan Anda di Supabase
            .single();

        if (error || !data) {
            Alert.alert('Error', 'Kode undangan tidak valid atau acara tidak ditemukan.');
            return;
        }

        navigate('RSVPScreen', { event: data });
    }

    return (
        <View className="bg-white h-full">
            <View className="pt-8 bg-primary-2 items-center p-3" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Text className="text-white text-xl font-nun_semibold self-start mx-4 mt-10">
                    👋 Halo, {firstName}!
                </Text>
                <Text className="text-white text-md font-nun_light self-start mx-4 mt-5">
                    Ada undangan ke acara mana nih...
                </Text>
                <Image
                    source={require("@/assets/wedding-banner.png")}
                    style={{
                        width: "100%",
                        height: 200,
                        marginVertical: 15,
                    }}
                />
            </View>
            {/* Form */}
            <View className="p-5">
                <Text className="text-primary-2 text-md font-nun_bold my-5 mb-2">Kode Undangan:</Text>
                <TextInput
                    placeholder="Masukkan Kode Undangan..."
                    textAlign="left"
                    style={styles.input}
                    placeholderTextColor="gray"
                    onChangeText={setTextInputValue} // Handle text input change
                    value={textInputValue}
                    className='font-nun_light'
                />
            </View>
            <View className="mt-5 justify-center items-center">
                <TouchableOpacity onPress={handleLanjutkanPress}>
                    <View className="bg-secondary-2 py-4 px-32 rounded-full w-11/12 flex-row items-center">
                        <Text className="text-white font-nun_semibold mr-2">Lanjutkan</Text>
                        <MaterialIcons name="arrow-right" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 18,
    },
});
