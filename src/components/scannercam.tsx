import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const appIcon = require('../assets/icon.png');

const ScannerCamera = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const navigation = useNavigation();

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Handle manual button press
    const handleManualTypingPress = () => {
        console.log('Manual typing pressed');
        navigation.navigate('FormKetikManual', { screen: 'FormKetikManual' });
    }

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="m-2">No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    // Return the View
    return (
        <View className="flex-1">
            {/* Banner di atas page */}
            <View className="bg-primary-2 justify-center items-center py-8 rounded-b-3xl">
                <Image source={appIcon} className="w-40 h-24" />
                <Text className="text-white text-xl font-semibold">Silakan Scan QR Code Anda</Text>
                <Text className="mt-5 text-white text-sm">Pastikan QR Code berada di dalam frame</Text>
            </View>

            {/* Scanner Barcode */}
            <View className="flex-1 items-center justify-center" style={{ marginTop: -100 }}>
                <View className="overflow-hidden rounded-3xl" style={{ height: 400, width: 200 }}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ flex: 1 }} />
                </View>


                {/* Text result */}
                <Text className="text-lg mt-5">{text}</Text>

                {scanned && <Button title={'Scan Ulang?'} onPress={() => setScanned(false)} color='#601C0E' />}

                {/* Button Manual */}
                <Text className="text-lg mt-2">Atau</Text>
                <View className="flex items-center justify-center mt-2">
                    <TouchableOpacity onPress={handleManualTypingPress}>
                        <View className="bg-secondary-2 py-4 px-24 rounded-full flex-row items-center">
                            <Text className="text-white font-semibold mr-2">Ketik secara manual</Text>
                            <MaterialIcons name="edit" size={20} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

export default ScannerCamera;