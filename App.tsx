import React, { useState } from "react";
import { View, Text, Image, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from './src/constants/theme';
import Router from './src/router/router';

const slides = [
  {
    id: 1,
    title: 'Solusi Manajemen Acaramu!',
    description: 'Jelajahi kecanggihan teknologi manajemen tamu yang inovatif dan nikmati pengalaman acara yang mulus bersama Guestify',
    image: require('./assets/onboard-1.png')
  },
  {
    id: 2,
    title: 'Solusi Praktis!',
    description: 'Dengan Guestify, nikmati kemudahan mengelola RSVP dan Digital Guest Book. Jadikan setiap acara penuh kenangan!',
    image: require('./assets/onboard-2.png')
  },
  {
    id: 3,
    title: 'Solusi Ekonomis!',
    description: 'Berkumpul, merayakan, dan mengelola acara dengan mudah. Guestify hadir untuk memastikan setiap detik acaramu berjalan dengan sempurna',
    image: require('./assets/onboard-3.png')
  }
]

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  StatusBar.setBarStyle('light-content', true);
  StatusBar.setBackgroundColor(COLORS.purple);

  const buttonLabel = (label: any) => {
    return(
      <View style={{
        padding: 12
      }}>
        <Text style={{
          color: COLORS.purple_dark,
          fontWeight: '600',
          fontSize: SIZES.h4,
        }}>
          {label}
        </Text>
      </View>
    )
  }

  if(!showHomePage) {
    return(
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return(
            <View 
            className="flex-1 items-center p-15 pt-100" 
            style={{
              flex: 1,
              alignItems: 'center',
              padding: 15,
              paddingTop: 100,
            }}
            >
              <Image
                source={item.image}
                className={`w-[${SIZES.width - 80}] h-[400]`}
                resizeMode="contain"
              />
              <Text style={{
                fontWeight: 'bold',
                color: COLORS.purple_dark,
                fontSize: SIZES.h1,
              }}>
                {item.title}
              </Text>
              <Text style={{
                textAlign: 'center',
                paddingTop: 5,
                color: COLORS.purple_dark
              }}>
                {item.description}
              </Text>
            </View>
          )
        }}
        activeDotStyle={{
          backgroundColor: COLORS.purple,
          width: 30,
        }}
        showSkipButton
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Done")}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    )
  }

  return(
    <View className="flex-1 items-center justify-center">
      <Text>Home Screen</Text>
    </View>
  )
}