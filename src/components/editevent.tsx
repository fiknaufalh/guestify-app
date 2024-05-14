import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditEvent() {
    const navigation = useNavigation();
    const [eventType, setEventType] = useState(''); // Nilai awal diambil dari database
    const [ownerName, setOwnerName] = useState(''); // Nilai awal diambil dari database
    const [eventName, setEventName] = useState(''); // Nilai awal diambil dari database
    const [eventLocation, setEventLocation] = useState(''); // Nilai awal diambil dari database
    const [eventDate, setEventDate] = useState<Date | null>(); // Nilai awal diambil dari database
    const [totalGuests, setTotalGuests] = useState(''); // Nilai awal diambil dari database
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleLanjutkanPress = () => {
        Alert.alert('Edit Acara Berhasil', '', [
            { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
        ]);
    };

    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>Edit Acara</Text>
            </View>
            <View className="px-5">
                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Tipe Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan tipe acara"
                        value={eventType}
                        onChangeText={setEventType}
                    />
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Nama Pemilik Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan nama pemilik acara"
                        value={ownerName}
                        onChangeText={setOwnerName}
                    />
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Nama Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan nama acara"
                        value={eventName}
                        onChangeText={setEventName}
                    />
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Tempat Berlangsung Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan tempat berlangsung acara"
                        value={eventLocation}
                        onChangeText={setEventLocation}
                    />
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Tanggal Berlangsung Acara:</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl"
                            placeholder="Masukkan tanggal acara"
                            value={eventDate ? eventDate.toDateString() : ''}
                            editable={false}
                            style={{ color: eventDate ? 'black' : 'gray' }}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={eventDate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                setEventDate(selectedDate || eventDate);
                            }}
                        />
                    )}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Total Tamu:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Contoh: 200"
                        value={totalGuests}
                        onChangeText={setTotalGuests}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity onPress={handleLanjutkanPress}>
                    <View className="bg-secondary-2 my-5 px-4 py-3 rounded-full flex-row justify-center items-center">
                        <Text className="text-white font-semibold mr-2">Lanjutkan</Text>
                        <MaterialIcons name="arrow-right" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
