import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Errors {
    eventType?: string;
    ownerName?: string;
    eventName?: string;
    eventLocation?: string;
    eventDate?: string;
    totalGuests?: string;
}

export default function CreateEvent() {
    const navigation = useNavigation();
    const [eventType, setEventType] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [totalGuests, setTotalGuests] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState<Errors>({});

    const handleLanjutkanPress = () => {
        let newErrors: Errors = {};
        if (!eventType) newErrors.eventType = 'Tipe Acara harus diisi';
        if (!ownerName) newErrors.ownerName = 'Nama Pemilik Acara harus diisi';
        if (!eventName) newErrors.eventName = 'Nama Acara harus diisi';
        if (!eventLocation) newErrors.eventLocation = 'Tempat Berlangsung Acara harus diisi';
        if (!eventDate) newErrors.eventDate = 'Tanggal Berlangsung Acara harus diisi';
        if (!totalGuests) newErrors.totalGuests = 'Total Tamu harus diisi';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            Alert.alert("Error", "Semua field wajib diisi");
            return;
        }

        // Add your form submission logic here
        navigation.navigate('Payment');
    };

    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>Buat Acara Baru</Text>
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
                    {errors.eventType && <Text style={{ color: 'red' }}>{errors.eventType}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Nama Pemilik Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan nama pemilik acara"
                        value={ownerName}
                        onChangeText={setOwnerName}
                    />
                    {errors.ownerName && <Text style={{ color: 'red' }}>{errors.ownerName}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Nama Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan nama acara"
                        value={eventName}
                        onChangeText={setEventName}
                    />
                    {errors.eventName && <Text style={{ color: 'red' }}>{errors.eventName}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-bold mb-2">Tempat Berlangsung Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 rounded-xl"
                        placeholder="Masukkan tempat berlangsung acara"
                        value={eventLocation}
                        onChangeText={setEventLocation}
                    />
                    {errors.eventLocation && <Text style={{ color: 'red' }}>{errors.eventLocation}</Text>}
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
                    {errors.eventDate && <Text style={{ color: 'red' }}>{errors.eventDate}</Text>}
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
                    {errors.totalGuests && <Text style={{ color: 'red' }}>{errors.totalGuests}</Text>}
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
