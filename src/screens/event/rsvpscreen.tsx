import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type EventNavigation } from '@/app/(tabs)/event';

interface Errors {
    fullName?: string;
    phone?: string;
    attendance?: string;
    guestCount?: string;
    message?: string;
}

export default function RSVPScreen() {
    const { navigate } = useNavigation<EventNavigation>();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [attendance, setAttendance] = useState(null);
    const [guestCount, setGuestCount] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    const handleAttendancePress = (status) => {
        setAttendance(status);
    };

    const validateFields = () => {
        let newErrors: Errors = {};
        if (!fullName) newErrors.fullName = 'Nama Lengkap harus diisi';
        if (!phone) newErrors.phone = 'Nomor Telepon harus diisi';
        if (!attendance) newErrors.attendance = 'Konfirmasi Kehadiran harus diisi';
        if (!guestCount) newErrors.guestCount = 'Total Tamu harus diisi';
        if (!message) newErrors.message = 'Harapan Kamu harus diisi';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleKirimPress = () => {
        if (!validateFields()) {
            Alert.alert("Peringatan", "Semua field wajib diisi");
            return;
        }

        if (attendance === 'Hadir') {
            navigate('RSVPHadir');
        } else if (attendance === 'Tidak Hadir') {
            navigate('RSVPTidakHadir');
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white h-full">
                <View className="pt-8 bg-primary-2 items-center p-3" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text className="text-white text-3xl font-jos_bold mx-4" style={{ marginTop: 50 }}>
                        Pernikahan
                    </Text>
                    <Text className="text-secondary-2 text-lg font-nun_semibold mx-4 mt-5">
                        Michael & Putri
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
                <View className="items-center bg-white h-full">
                    <Text className="text-primary-2 text-3xl font-jos_bold mx-4" style={{ marginTop: 50 }}>
                        Daftar Acara
                    </Text>
                    <View className="flex-row justify-around mt-10 w-full px-4">
                        <View className="bg-primary-2 rounded-3xl flex-1 justify-center items-center mx-2 p-3">
                            <Image
                                source={require("@/assets/pemberkatan.png")}
                            />
                            <Text className="text-white text-md font-nun_light mt-4" style={{ textAlign: 'center' }}>
                                Pemberkatan Nikah
                            </Text>
                        </View>
                        <View className="bg-primary-2 rounded-3xl flex-1 justify-center items-center mx-2 p-3">
                            <Image
                                source={require("@/assets/resepsi.png")}
                            />
                            <Text className="text-white text-md font-nun_light mt-4" style={{ textAlign: 'center' }}>
                                Resepsi Pernikahan
                            </Text>
                        </View>
                    </View>
                    <Text className="text-primary-2 text-3xl font-jos_bold mx-4" style={{ marginTop: 40 }}>
                        Sampai Ketemu!
                    </Text>
                    <Text className="text-secondary-2 text-lg font-nun_bold mx-4 mt-5" style={{ textAlign: 'center' }}>
                        Mohon Isi RSVP Kedatangan Kamu
                    </Text>

                    <View className="w-full px-4 mt-5">
                        <Text className="text-primary-2 text-lg font-nun_semibold mb-2">Nama Lengkap:</Text>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl text-lg mb-4 font-nun_light"
                            placeholder="Masukkan Nama Lengkap Kamu"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                        {errors.fullName && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.fullName}</Text>}

                        <Text className="text-primary-2 text-lg font-nun_semibold mt-4 mb-2">Nomor Telepon:</Text>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl text-lg mb-4 font-nun_light"
                            placeholder="Masukkan Nomor Telepon Kamu"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                        {errors.phone && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.phone}</Text>}

                        <Text className="text-primary-2 text-lg font-nun_semibold mt-4 mb-2">Konfirmasi Kehadiran:</Text>
                        <View className="flex-row justify-around mb-4 font-nun_light">
                            <TouchableOpacity
                                className={`w-40 p-4 rounded-full ${attendance === 'Hadir' ? 'bg-secondary-2' : 'bg-gray-400'}`}
                                onPress={() => handleAttendancePress('Hadir')}
                            >
                                <Text className="text-white font-nun_semibold text-center">Sampai Ketemu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`w-40 p-4 rounded-full ${attendance === 'Tidak Hadir' ? 'bg-secondary-2' : 'bg-gray-400'}`}
                                onPress={() => handleAttendancePress('Tidak Hadir')}
                            >
                                <Text className="text-white font-nun_semibold text-center">Tidak Hadir</Text>
                            </TouchableOpacity>
                        </View>
                        {errors.attendance && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.attendance}</Text>}

                        <Text className="text-primary-2 text-lg font-nun_semibold mb-2">Total Tamu:</Text>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl text-lg mb-4 font-nun_light"
                            placeholder="Total Tamu yang Akan Hadir"
                            value={guestCount}
                            onChangeText={setGuestCount}
                            keyboardType="numeric"
                        />
                        {errors.guestCount && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.guestCount}</Text>}

                        <Text className="text-primary-2 text-lg font-nun_semibold mt-4 mb-2">Harapan Kamu:</Text>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl text-lg mb-4 h-32 text-top"
                            placeholder="Tuliskan Harapan Kamu Disini"
                            value={message}
                            onChangeText={setMessage}
                            multiline={true}
                            numberOfLines={4}
                        />
                        {errors.message && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.message}</Text>}

                        <TouchableOpacity onPress={handleKirimPress} className="bg-secondary-2 px-4 py-3 rounded-full mt-4">
                            <Text className="text-white font-nun_semibold text-center">Kirim</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
