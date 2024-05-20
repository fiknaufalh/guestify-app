import { View, Text } from "react-native";
import React from "react";

const getColorClasses = (value) => {
    switch (value) {
        case false:
            return {
                border: "border-[#ED4C4D]",
                background: "bg-[#ED4C4D]",
                text: "text-[#ED4C4D]",
            };
        case true:
            return {
                border: "border-[#4CAF50]",
                background: "bg-[#4CAF50]",
                text: "text-[#4CAF50]",
            };
        default:
            return {
                border: "border-[#4BBFF0]",
                background: "bg-[#4BBFF0]",
                text: "text-[#4BBFF0]",
            };
    }
};

const GuestTableChip = ({ value }) => {
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
                {value ? "Yes" : "No"}
            </Text>
        </View>
    );
};

export default GuestTableChip;
