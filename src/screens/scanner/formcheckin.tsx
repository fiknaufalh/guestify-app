import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { type ScannerNavigation } from '@/app/(tabs)/scanner';
import { NavigationContainer, useRoute, RouteProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { supabase } from '@/database/supabaseConfig';

const appIcon = require('@/assets/icon.png');

type RootStackParamList = {
    FormCheckIn: { eventId: number, guestId: number };
}

export default function FormCheckIn() {
    const route = useRoute<RouteProp<RootStackParamList, 'FormCheckIn'>>();
    const { eventId, guestId } = route.params;
    const [guestName, setGuestName] = useState('');

    useEffect(() => {
        async function fetchGuestName() {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('name')
                    .eq('id', guestId)
                    .single();

                if (error) {
                    throw error;
                }

                // Set nama tamu ke dalam state
                if (data) {
                    setGuestName(data.name);
                }
            } catch (error) {
                console.error('Error fetching guest name:', error.message);
            }
        }

        fetchGuestName();
    }, [guestId]);

    const randomMeja = () => {
        const meja = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'];
        return meja[Math.floor(Math.random() * meja.length)];
    }

    // State untuk menyimpan jumlah meja
    const [jumlahMeja, setJumlahMeja] = useState(randomMeja());

    // isi jumlah meja
    useEffect(() => {
        setJumlahMeja(randomMeja());
    }, []);

    // State untuk menyimpan jumlah tamu
    const [count, setCount] = useState(1);

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // State untuk menyimpan status switch souvenir dan gift
    const [souvenirIncluded, setSouvenirIncluded] = useState(false);
    const [giftIncluded, setGiftIncluded] = useState(false);

    // Fungsi untuk toggle status switch souvenir
    const toggleSouvenirIncluded = () => {
        setSouvenirIncluded(!souvenirIncluded);
        console.log(souvenirIncluded);
    };

    // Fungsi untuk toggle status switch gift
    const toggleGiftIncluded = () => {
        console.log(giftIncluded);
        setGiftIncluded(!giftIncluded);
        console.log(giftIncluded);
    };

    // Selesai navigation
    const { navigate } = useNavigation<ScannerNavigation>();
    const submitCheckInData = async () => {
        try {
            // Tambahkan data ke tabel checkins
            const { error: checkinError } = await supabase
                .from('checkins')
                .insert({
                    event_id: eventId,
                    guest_id: guestId,
                    scan_status: true, // Set scan_status menjadi true
                    gift_status: giftIncluded,
                    souvenir_status: souvenirIncluded
                });

            if (checkinError) {
                throw checkinError;
            }

            // Cari checkinId berdasarkan guestId dan eventId
            const { data: checkinData, error: selectError } = await supabase
                .from('checkins')
                .select('id')
                .eq('event_id', eventId)
                .eq('guest_id', guestId)
                .single();

            if (selectError) {
                throw selectError;
            }

            // Periksa apakah checkinData tidak null
            if (checkinData) {
                const checkinId = checkinData.id;

                // Tambahkan data ke tabel guestbook
                const { error: guestbookError } = await supabase
                    .from('guestbook')
                    .insert({
                        event_id: eventId,
                        guest_id: guestId,
                        checkin_id: checkinId,
                        total_guests: count
                    });

                if (guestbookError) {
                    throw guestbookError;
                }
            } else {
                throw new Error('Failed to find checkinId');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const selesaiPress = () => {
        // Panggil fungsi submitCheckInData saat tombol "Selesai" ditekan
        submitCheckInData();
        alert('Check-in berhasil');
        navigate('ScannerLast');
    };


    return (
        <View className='bg-white h-full'>
            <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                <Image source={appIcon} className="w-40 h-24" />
            </View>
            <View className='justify-center items-center'>
                <Text className='text-primary-2 font-jos_bold text-lg my-5'>Selamat Datang,</Text>
                <Text className='text-secondary-2 font-jos_bold text-3xl mb-5'>{guestName}</Text>
                <View className='bg-primary-2 rounded-xl w-11/12 justify-center items-center p-5'>
                    {/* Elemen Baru */}
                    <View className='flex-column w-full'>
                        <Text className='text-secondary-2 font-nun_regular text-sm mb-2'>INFORMASI UTAMA</Text>
                        {/* Area 1 */}
                        <View className='flex-row justify-between bg-lightblue mb-1'>
                            {/* Kolom 1 */}
                            <View className='w-1/2'>
                                <Text className='text-white my-4 font-nun_light' style={{ textAlign: 'left' }}>Meja</Text>
                                <Text className='text-white my-4 font-nun_light' style={{ textAlign: 'left' }}>Total Tamu</Text>
                            </View>
                            {/* Kolom 2 */}
                            <View className='w-1/2'>
                                <Text className='text-white my-4 font-nun_bold text-xl' style={{ textAlign: 'right' }}>{jumlahMeja}</Text>
                                <View className='my-2' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={decreaseCount} style={{ backgroundColor: 'lightgrey', padding: 5, borderRadius: 5, width: 30, height: 30 }}>
                                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', lineHeight: 22 }}>-</Text>
                                    </TouchableOpacity>
                                    <Text className='mx-2 text-xl font-nun_bold' style={{ color: 'white', textAlign: 'right' }}>{count}</Text>
                                    <TouchableOpacity onPress={increaseCount} style={{ backgroundColor: '#E9A400', padding: 5, borderRadius: 5, width: 30, height: 30 }}>
                                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', lineHeight: 22 }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* Garis pemisah */}
                        <View className='my-4' style={{ borderBottomWidth: 1, borderBottomColor: 'gray', marginVertical: 10 }} />
                        <Text className='text-secondary-2 font-nun_regular text-sm my-2'>PILIHAN</Text>
                        {/* Area 2 */}
                        <View className='flex-row justify-between bg-lightgreen mt-1'>
                            {/* Kolom 1 */}
                            <View className='w-1/2'>
                                <Text className='text-white my-4 font-nun_light' style={{ textAlign: 'left' }}>Souvenir</Text>
                                <Text className='text-white my-4 font-nun_light' style={{ textAlign: 'left' }}>Gift</Text>
                            </View>
                            {/* Kolom 2 */}
                            <View className='w-1/2'>
                                {/* Kolom 2 (Switch Souvenir) */}
                                <View className='my-4' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={toggleSouvenirIncluded} style={{ backgroundColor: souvenirIncluded ? '#E9A400' : 'lightgrey', borderRadius: 15, width: 50, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', width: 20, height: 20, borderRadius: 10, marginLeft: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: souvenirIncluded ? 0 : 30 }}></View>
                                    </TouchableOpacity>
                                </View>
                                {/* Kolom 2 (Switch Gift) */}
                                <View className='my-2' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={toggleGiftIncluded} style={{ backgroundColor: giftIncluded ? '#E9A400' : 'lightgrey', borderRadius: 15, width: 50, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <View style={{ backgroundColor: 'white', width: 20, height: 20, borderRadius: 10, marginLeft: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: giftIncluded ? 0 : 30 }}></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className='bg-secondary-2 rounded-full w-11/12 justify-center items-center mt-5' onPress={selesaiPress}>
                    <View className='py-4 flex-row'>
                        <Text className='text-white font-nun_bold mr-2'>Selesai</Text>
                        <MaterialIcons name='check' size={20} color='white' />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
