import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export default function EventScreen() {
    const [textInputValue, setTextInputValue] = useState('');
    const navigation = useNavigation();

    const handleLanjutkanPress = () => {
        if (textInputValue.trim() === '') {
            // Alert jika teks kosong
            Alert.alert('Peringatan', 'Mohon masukkan kode undangan terlebih dahulu.');
        } else {
            // // Alert menampilkan teks yang dimasukkan
            // Alert.alert('Teks yang Dimasukkan', textInputValue);             //logic cek kode manual nanti disini
            navigation.navigate('RSVPScreen');
        }
    }

    const handleTextInputChange = (text) => {
        setTextInputValue(text);
    }

    return (
        <View className="bg-white h-full">
            <View className="pt-8 bg-primary-2 items-center p-3" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Text className="text-white text-xl font-semibold self-start mx-4 mt-10">
                    👋 Halo, Bob!
                </Text>
                <Text className="text-white text-md self-start mx-4 mt-5">
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
                <Text className="text-primary-2 text-md font-semibold my-5 mb-2">Kode Undangan:</Text>
                <TextInput
                    placeholder="Masukkan Kode Undangan..."
                    textAlign="left"
                    style={styles.input}
                    placeholderTextColor="gray"
                    onChangeText={handleTextInputChange} // Handle text input change
                    value={textInputValue}
                />
            </View>
            <View className="mt-5 justify-center items-center">
                <TouchableOpacity onPress={handleLanjutkanPress}>
                    <View className="bg-secondary-2 py-4 px-20 rounded-full w-11/12 flex-row items-center">
                        <Text className="text-white font-semibold mr-2">Lanjutkan</Text>
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
