import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { type ScannerNavigation } from '@/app/(tabs)/scanner';
import { supabase } from '@/database/supabaseConfig';
import { Alert } from 'react-native';

const appIcon = require('@/assets/icon.png');

const ScannerCamera = () => {
    // const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const { navigate } = useNavigation<ScannerNavigation>();
    const [permission, requestPermission] = useCameraPermissions();

    // Request Camera Permission
    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    // What happens when we scan the bar code
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setText(data); // Update nilai text dengan nilai data yang baru saja dipindai
        console.log('Type: ' + type + '\nData: ' + data);
        // Cek kode undangan pada tabel guests
        const { data: guests, error } = await supabase
            .from('guests')
            .select('event_id, id')
            .eq('qr_code', data) // Gunakan nilai data yang baru saja dipindai
            .single();

        if (error) {
            console.error('Error fetching guest data:', error.message);
            Alert.alert('Error', 'Terjadi kesalahan saat memeriksa kode undangan.');
            return;
        }

        if (!guests) {
            Alert.alert('Peringatan', 'Kode undangan tidak terdaftar.');
            return;
        }

        console.log('Guests:', guests);
        // Kode undangan valid, lanjutkan ke FormCheckIn dengan event_id
        navigate('FormCheckIn', { eventId: guests.event_id, guestId: guests.id });
    };


    // Handle manual button press
    const handleManualTypingPress = () => {
        console.log('Manual typing pressed');
        navigate('FormKetikManual');
    }

    // Check permissions and return the screens
    if (!permission) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }
    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="m-2">No access to camera</Text>
                <Button title={'Allow Camera'} onPress={requestPermission} />
            </View>
        );
    }

    // Return the View
    return (
        <View className="flex-1">
            {/* Banner di atas page */}
            <View className="bg-primary-2 justify-center items-center py-5 rounded-b-3xl">
                <Image source={appIcon} className="w-40 h-24" />
                <Text className="text-white text-xl font-nun_semibold mt-[-10]">Silakan Scan QR Code Anda</Text>
                <Text className="mt-2 text-white text-xs font-nun_light">Pastikan QR Code berada di dalam frame</Text>
            </View>

            {/* Scanner Barcode */}
            <View className="flex-1 items-center justify-center" style={{ marginTop: -100 }}>
                <View className="overflow-hidden rounded-3xl mt-2" style={{ height: 400, width: 300 }}>
                    <CameraView
                        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ flex: 1 }}
                    ></CameraView>
                </View>

                {/* Text result */}
                {/* <Text className="text-lg mt-5">{text}</Text> */}

                {scanned && <View className='my-2'><Button title={'Scan Ulang?'} onPress={() => setScanned(false)} color='#601C0E' /></View>}

                {/* Button Manual */}
                <Text className="text-md font-nun_light my-3">Atau</Text>
                <View className="flex items-center justify-center">
                    <TouchableOpacity onPress={handleManualTypingPress}>
                        <View className="bg-secondary-2 py-3 px-16 rounded-full flex-row items-center">
                            <Text className="text-white font-nun_semibold mr-2">Ketik secara manual</Text>
                            <MaterialIcons name="edit" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default ScannerCamera;
