import React from 'react';
import { View, Text, Image } from 'react-native';

const profilePic = require('../../assets/profpic.jpeg');
const appIcon = require('../../assets/icon.png');

const Profile = () => {
  return (
    <View className='bg-white h-full'>
      <View className="pt-8 bg-primary-2 justify-center items-center" style={{ borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
        <Image source={appIcon} className="w-40 h-24" />
      </View>
      <View className="p-5 items-center">
        <Text className="text-primary-2 text-2xl font-bold">Profil Kamu</Text>
      </View>
      <View className="items-center mt-5">
        <Image source={profilePic} className="w-40 h-40 rounded-full" />
      </View>
      <View className="px-5 mt-5">
        <View className="mb-5">
          <Text className="text-primary-1 text-lg font-bold mb-2">Nama:</Text>
          <Text className="bg-gray-200 px-4 py-3 rounded-lg">{`Michael Sihotang`}</Text>
        </View>

        <View className="mb-5">
          <Text className="text-primary-1 text-lg font-bold mb-2">Email:</Text>
          <Text className="bg-gray-200 px-4 py-3 rounded-lg">{`michaelganteng@gmail.com`}</Text>
        </View>

        <View>
          <Text className="text-primary-1 text-lg font-bold mb-2">Password:</Text>
          <Text className="bg-gray-200 px-4 py-3 rounded-lg">{`********`}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
