import { View, Text } from "react-native";
import React from "react";

const getColorClasses = (value) => {
    switch (value) {
        case "Cancelled":
            return {
                border: "border-[#ED4C4D]",
                background: "bg-[#ED4C4D]",
                text: "text-[#ED4C4D]",
            };
        case "Pending":
            return {
                border: "border-[#E9A400]",
                background: "bg-[#E9A400]",
                text: "text-[#E9A400]",
            };
        case "Confirmed":
            return {
                border: "border-[#4CAF50]",  // Hijau
                background: "bg-[#4CAF50]",  // Hijau
                text: "text-[#4CAF50]",      // Hijau
            };
        default:
            return {
                border: "border-[#4BBFF0]",
                background: "bg-[#4BBFF0]",
                text: "text-[#4BBFF0]",
            };
    }
};

const RSVPTableChip = ({ value }) => {
    const classes = getColorClasses(value);

    return (
        <View
            className={`${classes.border} w-24 h-6 rounded-full border-[1px] px-2 flex-row items-center justify-center`}
        >
            <View
                className={`${classes.background} rounded-full w-[6px] h-[6px]`}
            ></View>
            <Text
                className={`${classes.text} ml-2 font-semibold`}
                style={{ fontSize: 12 }}
            >
                {value[0].toUpperCase() + value.slice(1)}
            </Text>
        </View>
    );
};

export default RSVPTableChip;
