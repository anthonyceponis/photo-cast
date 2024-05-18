import { Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
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

//export const ClosedTabButton: React.FC<{cardName: string}>

export const Footer: React.FC<{openTabs:Array<IOpenedCard>}> = props => {
    //Map the openCards
    return (
        <View className="absolute bottom-0 flex justify-center items-center bg-amber-50 w-screen p-3 border-offset-2 border-t-2 border-zinc-800">
            <View className="flex-row gap-5">
                {[1, 2, 3].map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#fff7ed",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 2,
                            borderColor:"#27272a", borderWidth:1, shadowColor:"#000"
                        }}
                        className={"shadow-sm"}
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
