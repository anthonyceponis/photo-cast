import { Text, View } from "react-native";

export const Footer = () => {
    return (
        <View className="absolute bottom-0 flex justify-center items-center bg-black w-screen p-3">
            <Text className="text-white">This is the footer</Text>
        </View>
    );
};
