import React, { useState, useCallback } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import GuestTableChip from './guesttablechip';

const GuestTable = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const recordsPerPage = 10;

    const sortData = ({ tableData, sortKey, reverse }) => {
        if (!sortKey) return tableData;

        const sortedData = [...tableData].sort((a, b) => {
            return a[sortKey] > b[sortKey] ? 1 : -1;
        });

        if (reverse) {
            return sortedData.reverse();
        }

        return sortedData;
    };

    const sortedData = useCallback(() => sortData({
        tableData: data,
        sortKey,
        reverse: sortOrder === 'desc',
    }), [data, sortKey, sortOrder]);

    const changeSort = key => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setSortKey(key);
    };

    const filteredData = sortedData().filter(guest =>
        Object.values(guest).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    const displayedData = filteredData.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const startNumber = filteredData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0;
    const endNumber = currentPage * recordsPerPage <= filteredData.length ? currentPage * recordsPerPage : filteredData.length;

    const handleExport = () => {
        // Implement your export logic here
        console.log("Exporting table list...");
    };

    return (
        <ScrollView horizontal>
            <View className="p-4">
                <View className="w-full mb-4 flex-row justify-between items-center">
                    <TextInput
                        className="p-2 border border-gray-300 rounded-lg font-nun_regular"
                        style={{ flex: 1, marginRight: 16 }}
                        placeholder="Search guests, phone number, etc."
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                    />
                    <TouchableOpacity
                        className="p-2 rounded-lg bg-primary-2 flex flex-row items-center justify-center"
                        onPress={handleExport}
                    >
                        <MaterialIcons name="file-download" size={24} color="white" />
                        <Text className="ml-2 text-white font-nun_bold">Export Table List</Text>
                    </TouchableOpacity>
                </View>
                <View className="rounded-lg overflow-hidden">
                    <View className="flex flex-row bg-primary-2 h-12 justify-center items-center">
                        <Text className="w-20 p-2 text-white font-nun_bold">No</Text>
                        <View className='flex-row w-40 items-center'>
                            <Text className="p-2 text-white flex flex-row items-center font-nun_bold">
                                Guest Name
                            </Text>
                            <TouchableOpacity onPress={() => changeSort('guestName')}>
                                <MaterialIcons name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row w-40 items-center'>
                            <Text className="p-2 text-white flex flex-row items-center font-nun_bold">
                                Phone Number
                            </Text>
                            <TouchableOpacity onPress={() => changeSort('phoneNumber')}>
                                <MaterialIcons name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row w-40 items-center'>
                            <Text className="p-2 text-white font-nun_bold">Check-In</Text>
                            <TouchableOpacity onPress={() => changeSort('checkIn')}>
                                <MaterialIcons name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row w-40 items-center'>
                            <Text className="p-2 text-white flex flex-row items-center font-nun_bold">
                                Gift
                            </Text>
                            <TouchableOpacity onPress={() => changeSort('gift')}>
                                <MaterialIcons name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex-row w-40 items-center'>
                            <Text className="p-2 text-white flex flex-row items-center font-nun_bold">
                                Souvenir
                            </Text>
                            <TouchableOpacity onPress={() => changeSort('souvenir')}>
                                <MaterialIcons name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text className="w-40 p-2 text-white flex flex-row items-center font-nun_bold">
                            Total Guest
                        </Text>
                    </View>
                    <View>
                        {displayedData.map((guest, index) => (
                            <View
                                key={guest.id}
                                className={`flex flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <Text className="w-20 p-4 font-nun_regular items-center">{startNumber + index}</Text>
                                <Text className="w-40 p-4 font-nun_regular items-center">{guest.guestName}</Text>
                                <Text className="w-40 p-4 font-nun_regular items-center">{guest.phoneNumber}</Text>
                                <View className='w-40 justify-center items-center'>
                                    <GuestTableChip value={guest.checkIn} />
                                </View>
                                <View className='w-40 justify-center items-center'>
                                    <GuestTableChip value={guest.gift} />
                                </View>
                                <View className='w-40 justify-center items-center'>
                                    <GuestTableChip value={guest.souvenir} />
                                </View>
                                <Text className="w-40 p-4 font-nun_regular items-center">{guest.totalGuests}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text className="text-sm text-gray-700 font-nun_regular">
                        Showing <Text className="font-semibold text-black">{startNumber}</Text> to <Text className="font-semibold text-black">{endNumber}</Text> of <Text className="font-semibold text-black">{filteredData.length}</Text> entries
                    </Text>
                    <View className="flex flex-row">
                        <TouchableOpacity
                            className="p-2 border border-gray-300 rounded mr-2"
                            disabled={currentPage === 1}
                            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            <Text className="text-gray-500 font-nun_regular">Previous</Text>
                        </TouchableOpacity>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`p-2 border border-gray-300 rounded mx-1 ${currentPage === index + 1 ? 'bg-primary-2' : 'bg-white'}`}
                                onPress={() => setCurrentPage(index + 1)}
                            >
                                <Text className={`${currentPage === index + 1 ? 'text-white' : 'text-gray-500'} font-nun_regular`}>
                                    {index + 1}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            className="p-2 border border-gray-300 rounded ml-2"
                            disabled={currentPage === totalPages}
                            onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            <Text className="text-gray-500 font-nun_regular">Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default GuestTable;
