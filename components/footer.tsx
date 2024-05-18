import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";

export enum CardType {
    Location,
    Condition,
}

export interface IOpenedCard {
    type: CardType;
    name: string;
    filters: string;
}

export const Footer = () => {
    return (
        <View className="absolute bottom-0 flex justify-center items-center bg-black w-screen p-3">
            <View className="flex-row gap-5">
                {[1, 2, 3].map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 2,
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                            }}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
