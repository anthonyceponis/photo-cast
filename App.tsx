import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { sunrise } from "./calculations";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-orange-500">
            <Text>{sunrise(130, 15, 52, 25, 0, 0.141600, 52.196280)}</Text>
            <StatusBar style="auto" />
        </View>
    );
}