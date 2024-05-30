import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { type EventNavigation } from '@/app/(tabs)/event';
import { formatTimestampToDate } from '@/utils/dateConverter';
import { supabase } from '@/database/supabaseConfig';
import { useAuth } from '@/contexts/authContext';

interface Errors {
    fullName?: string;
    phone?: string;
    attendance?: string;
    guestCount?: string;
    message?: string;
    details?: string;
}

interface EventData {
    type: string;
    name: string;
    place: string;
    event_date: string;
    status: string;
    event_code: string;
}

interface RouteParams {
    event: EventData;
}

export default function RSVPScreen() {
    const { navigate } = useNavigation<EventNavigation>();
    const route = useRoute();
    const { event }: any = route.params;
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [attendance, setAttendance] = useState(null);
    const [guestCount, setGuestCount] = useState('');
    const [message, setMessage] = useState('');
    const [details, setDetails] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [totalGuests, setTotalGuests] = useState<number>(0);
    const { user } = useAuth();

    const handleAttendancePress = (status) => {
        setAttendance(status);
    };

    useEffect(() => {
        fetchTotalGuests(); // Memanggil fungsi untuk mengambil total tamu yang sudah terdaftar
    }, []);

    // Fungsi untuk mengambil total tamu yang sudah terdaftar
    const fetchTotalGuests = async () => {
        try {
            const { data, error } = await supabase
                .from('guests')
                .select('id')
                .eq('event_id', event.id);

            if (error) {
                console.error('Error fetching total guests:', error);
                return;
            }

            if (data) {
                setTotalGuests(data.length); // Mengatur total tamu yang sudah terdaftar
            }
        } catch (error) {
            console.error('Error fetching total guests:', error);
        }
    };

    // Fungsi untuk membuat kode QR berformat AXXXX
    const generateQRCode = (): string => {
        const formattedIndex = String(totalGuests + 1).padStart(4, '0'); // Mendapatkan urutan ke berapa tamu ini dan memformatnya menjadi 4 digit dengan '0' di depan jika kurang dari 4 digit
        return `A${formattedIndex}`; // Mengembalikan kode QR berformat AXXXX
    };

    const validateFields = () => {
        let newErrors: Errors = {};
        if (!fullName) newErrors.fullName = 'Nama Lengkap harus diisi';
        if (!phone) newErrors.phone = 'Nomor Telepon harus diisi';
        if (!attendance) newErrors.attendance = 'Konfirmasi Kehadiran harus diisi';
        if (!guestCount) newErrors.guestCount = 'Total Tamu harus diisi';
        if (!message) newErrors.message = 'Harapan Kamu harus diisi';
        if (!message) newErrors.message = 'Harapan Kamu harus diisi';
        if (!details) newErrors.details = 'Detail Tamu harus diisi';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleKirimPress = async () => {
        if (!validateFields()) {
            Alert.alert("Peringatan", "Semua field wajib diisi");
            return;
        }
        
        const qrCode = generateQRCode();
        console.log(user);

        // insert into guests table
        try {
            const { data, error } = await supabase
                .from('guests')
                .insert([{
                    id: user.userId,
                    event_id: event.id,
                    details: details,
                    qr_code: qrCode,
                    presence: "Hadir" ? true : false,
                    wish: message,
                    total_guests: guestCount,
                }]);

            if (error) {
                Alert.alert("Error", "Tidak dapat mengisi RSVP saat ini");
                console.error("Error inserting RSVP:", error);
            } 
            
        } catch (error) {
            console.error("Error:", error);
        }

        // insert into rsvp table
        try {
            const { data, error } = await supabase
                .from('rsvp')
                .insert([{
                    event_id: event.id,
                    guest_id: user.userId,
                    status: attendance ? 'Confirmed' : 'Declined',
                }]);

            if (error) {
                Alert.alert("Error", "Tidak dapat mengisi RSVP saat ini");
                console.error("Error inserting RSVP:", error);
            } 
            
        } catch (error) {
            console.error("Error:", error);
        }

        if (attendance === "Hadir") {
            navigate('RSVPHadir');
        } else if (attendance === "Tidak Hadir") {
            navigate('RSVPTidakHadir');
        }

    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            <View className="bg-white h-full">
                <View className="pt-8 bg-primary-2 items-center p-3" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <Text className="text-white text-3xl font-jos_bold mx-4" style={{ marginTop: 50 }}>
                        {event.type}
                    </Text>
                    <Text className="text-secondary-2 text-lg font-nun_semibold mx-4 mt-5">
                        {event.name}
                    </Text>
                    <Text className="text-secondary-2 text-lg font-nun_semibold mx-4">
                        {event.place}, {formatTimestampToDate(event.event_date)}
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
                                className={`w-40 p-4 rounded-full ${attendance === "Hadir" ? 'bg-secondary-2' : 'bg-gray-400'}`}
                                onPress={() => handleAttendancePress("Hadir")}
                            >
                                <Text className="text-white font-nun_semibold text-center">Sampai Ketemu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className={`w-40 p-4 rounded-full ${attendance == "Tidak Hadir" ? 'bg-secondary-2' : 'bg-gray-400'}`}
                                onPress={() => handleAttendancePress("Tidak Hadir")}
                            >
                                <Text className="text-white font-nun_semibold text-center">Tidak Hadir</Text>
                            </TouchableOpacity>
                        </View>
                        {errors.attendance && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.attendance}</Text>}

                        <Text className="text-primary-2 text-lg font-nun_semibold mb-2">Detail:</Text>
                        <TextInput
                            className="bg-gray-200 px-4 py-3 rounded-xl text-lg mb-4 font-nun_light"
                            placeholder="Kamu sebagai apa di acara ini?"
                            value={details}
                            onChangeText={setDetails}
                        />
                        {errors.details && <Text style={{ color: 'red' }} className='font-nun_light'>{errors.details}</Text>}

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
