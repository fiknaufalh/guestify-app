import React, { useState, useCallback } from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TableRSVP = ({ data }) => {
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

    console.log(displayedData)

    const startNumber = filteredData.length > 0 ? (currentPage - 1) * recordsPerPage + 1 : 0;
    const endNumber = currentPage * recordsPerPage <= filteredData.length ? currentPage * recordsPerPage : filteredData.length;


    return (
        <ScrollView horizontal>
            <View className="p-4">
                <View className="w-full mb-4" style={{ width: 300 }}>
                    <TextInput
                        className="p-2 border border-gray-300 rounded-lg font-nun_regular"
                        placeholder="Search guests, phone number, etc."
                        value={searchTerm}
                        onChangeText={text => setSearchTerm(text)}
                    />
                </View>
                <View className="rounded-lg overflow-hidden">
                    <View className="flex flex-row bg-primary-2">
                        <Text className="w-20 p-2 text-white font-bold font-nun_regular">No</Text>
                        <Text className="w-40 p-2 text-white font-bold flex flex-row items-center font-nun_regular">
                            Guest Name
                            <TouchableOpacity onPress={() => changeSort('guestName')}>
                                <Icon name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </Text>
                        <Text className="w-40 p-2 text-white font-bold flex flex-row items-center font-nun_regular">
                            Phone Number
                            <TouchableOpacity onPress={() => changeSort('phoneNumber')}>
                                <Icon name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </Text>
                        <Text className="w-40 p-2 text-white font-bold font-nun_regular">Detail</Text>
                        <Text className="w-40 p-2 text-white font-bold flex flex-row items-center font-nun_regular">
                            RSVP Status
                            <TouchableOpacity onPress={() => changeSort('rsvpStatus')}>
                                <Icon name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </Text>
                        <Text className="w-40 p-2 text-white font-bold flex flex-row items-center font-nun_regular">
                            QR Code Link
                            <TouchableOpacity onPress={() => changeSort('qrCodeLink')}>
                                <Icon name="sort" size={20} color="white" />
                            </TouchableOpacity>
                        </Text>
                    </View>
                    <View>
                        {displayedData.map((guest, index) => (
                            <View
                                key={guest.id}
                                className={`flex flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                            >
                                <Text className="w-20 p-2 font-nun_regular">{startNumber + index}</Text>
                                <Text className="w-40 p-2 font-nun_regular">{guest.guestName}</Text>
                                <Text className="w-40 p-2 font-nun_regular">{guest.phoneNumber}</Text>
                                <Text className="w-40 p-2 text-blue-500 underline font-nun_regular">Details</Text>
                                <Text className="w-40 p-2 font-nun_regular">{guest.rsvpStatus}</Text>
                                <Text className="w-40 p-2 text-blue-500 underline font-nun_regular">{guest.qrCodeLink}</Text>
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

export default TableRSVP;
