import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

export const Footer = () => {
    return (
        <View className="absolute bottom-0 flex justify-center items-center bg-black w-screen p-3">
            <Text className="text-white">This is the footer</Text>
            <FontAwesomeIcon color="white" icon={faMugSaucer} />
        </View>
    );
};
