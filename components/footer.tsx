import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

export const Footer = () => {
    const tabs = ["condition 1", "condition 2", "location 3"];  
    return (
        <View className="absolute bottom-0 flex justify-center items-center bg-black w-screen p-3">
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity key={index} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                        <Text style={{ color: 'black', fontSize: 80/tab.length}}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
