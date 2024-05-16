import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type HomeNavigation } from '@/app/(tabs)/home';
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
    const { navigate } = useNavigation<HomeNavigation>();
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
            Alert.alert("Peringatan", "Semua field wajib diisi");
            return;
        }

        // Add your form submission logic here
        navigate('Payment');
    };

    return (
        <ScrollView className='bg-white h-full' contentContainerStyle={{ paddingBottom: 200 }}>
            <View className='justify-center items-center my-10'>
                <Text className='text-primary-2 font-jos_bold text-3xl' style={{ textAlign: 'center', marginTop: 60 }}>Buat Acara Baru</Text>
            </View>
            <View className="px-5">
                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Tipe Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                        placeholder="Masukkan tipe acara"
                        value={eventType}
                        onChangeText={setEventType}
                        placeholderTextColor="gray"
                    />
                    {errors.eventType && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.eventType}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Nama Pemilik Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                        placeholder="Masukkan nama pemilik acara"
                        value={ownerName}
                        onChangeText={setOwnerName}
                        placeholderTextColor="gray"
                    />
                    {errors.ownerName && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.ownerName}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Nama Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                        placeholder="Masukkan nama acara"
                        value={eventName}
                        onChangeText={setEventName}
                        placeholderTextColor="gray"

                    />
                    {errors.eventName && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.eventName}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Tempat Berlangsung Acara:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                        placeholder="Masukkan tempat berlangsung acara"
                        value={eventLocation}
                        onChangeText={setEventLocation}
                        placeholderTextColor="gray"
                    />
                    {errors.eventLocation && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.eventLocation}</Text>}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Tanggal Berlangsung Acara:</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                            placeholder="Masukkan tanggal acara"
                            value={eventDate ? eventDate.toDateString() : ''}
                            editable={false}
                            style={{ color: eventDate ? 'black' : 'gray' }}
                        />
                    </TouchableOpacity>
                    {errors.eventDate && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.eventDate}</Text>}
                    {showDatePicker && (
                        <View>
                            <DateTimePicker
                                value={eventDate || new Date()}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    setEventDate(selectedDate || eventDate);
                                }}
                            />
                        </View>
                    )}
                </View>

                <View className="mb-5">
                    <Text className="text-primary-1 text-lg font-nun_bold mb-2">Total Tamu:</Text>
                    <TextInput
                        className="bg-gray-200 px-4 py-3 font-nun_light rounded-xl"
                        placeholder="Contoh: 200"
                        value={totalGuests}
                        onChangeText={setTotalGuests}
                        keyboardType="numeric"
                        placeholderTextColor="gray"
                    />
                    {errors.totalGuests && <Text className='font-nun_light' style={{ color: 'red' }}>{errors.totalGuests}</Text>}
                </View>

                <TouchableOpacity onPress={handleLanjutkanPress}>
                    <View className="bg-secondary-2 my-5 px-4 py-3 rounded-full flex-row justify-center items-center">
                        <Text className="text-white text-lg font-nun_semibold mr-2">Lanjutkan</Text>
                        <MaterialIcons name="arrow-right" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
