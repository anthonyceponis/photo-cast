import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

export const Footer = () => {
    const tabs = ["condition 1", "condition 2", "location 3"];  
    return (
        <View className={`absolute bottom-0 flex justify-center items-center bg-amber-50 w-screen p-3 border-offset-2 border-t-2 border-zinc-800`}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity key={index} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#fff7ed", 
                                                        justifyContent: 'center', alignItems: 'center', margin: 2,
                                                         borderColor:"#27272a", borderWidth:1, shadowColor:"#000"}}
                                        className={"shadow-sm"}>
                        <Text style={{ color: '#020617', fontSize: 80/tab.length}}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
