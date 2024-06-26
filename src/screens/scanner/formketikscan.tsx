import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { type ScannerNavigation } from '@/app/(tabs)/scanner';
import { supabase } from '@/database/supabaseConfig';

const appIcon = require('@/assets/icon.png');

const FormKetikManual = () => {
    const [textInputValue, setTextInputValue] = useState('');
    const { navigate } = useNavigation<ScannerNavigation>();

    const handleLanjutkanPress = async () => {
        if (textInputValue.trim() === '') {
            // Alert jika teks kosong
            Alert.alert('Peringatan', 'Mohon masukkan kode undangan terlebih dahulu.');
        } else {
            // Cek kode undangan pada tabel guests
            const { data: guests, error } = await supabase
                .from('guests')
                .select('event_id, id')
                .eq('qr_code', textInputValue.trim())
                .single();

            if (!guests) {
                Alert.alert('Peringatan', 'Kode undangan tidak terdaftar.');
                return;
            }

            // Kode undangan valid, lanjutkan ke FormCheckIn dengan event_id
            navigate('FormCheckIn', { eventId: guests.event_id, guestId: guests.id });
        }
    }

    const handleTextInputChange = (text) => {
        setTextInputValue(text);
    }

    const handleBarcodePress = () => {
        console.log('Barcode pressed');
        navigate('Scanner');
    }

    return (
        <View className="flex-1">
            {/* Banner di atas page */}
            <View className="bg-primary-2 py-8 rounded-b-3xl">
                <View className='justify-center items-center '>
                    <Image source={appIcon} className="w-40 h-24" />
                    <Text className="text-white text-xl font-nun_semibold" style={{ textAlign: 'center' }}>Silakan Masukkan Kode Undangan</Text>
                    <Text className="mt-5 text-white font-nun_light text-xs">Pastikan kode sesuai dan sama persis</Text>
                </View>
                {/* Form */}
                <View className="p-5">
                    <Text className="text-white text-sm font-nun_bold my-5 mb-2">Kode Undangan:</Text>
                    <TextInput
                        placeholder="Masukkan Kode Undangan..."
                        textAlign="left"
                        style={styles.input}
                        placeholderTextColor="gray"
                        onChangeText={handleTextInputChange} // Handle text input change
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
            <View className='justify-center items-center'>
                <TouchableOpacity onPress={handleBarcodePress}>
                    <View className="mt-8 bg-secondary-2 py-4 px-5 rounded-full flex-row justify-center items-center" style={{ width: 300 }}>
                        <Text className="text-white font-nun_semibold mr-2">Kembali ke QR Code</Text>
                        <MaterialIcons name="qr-code" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 18,
    },
});

export default FormKetikManual;
