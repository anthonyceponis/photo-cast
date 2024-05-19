import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons/faMugSaucer";
import { StyledText } from "./styled-text";
import { FadeInView } from "./squareDemo";

export enum CardType {
    Location,
    Condition,
}

export interface IOpenedCard {
    type: CardType;
    name: string;
    filters: string;
}

export const TabIcon: React.FC<{
    tab: IOpenedCard;
    setter: React.Dispatch<IOpenedCard>;
}> = (props) => {
    return (
        <FadeInView style={{}}>
        <TouchableOpacity
            key={props.tab.name}
            onPress={() => updateCurrentCard(props.setter, props.tab)}
            style={{
                width: 80,
                height: 40,
                borderRadius: 20,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                margin: 2,
            }}
        >
            <StyledText
                style={{
                    color: "black",
                }}
            >
                {props.tab.name}
            </StyledText>
        </TouchableOpacity>
        </FadeInView>
    );
};

function updateCurrentCard(
    setCurrentCard: React.Dispatch<IOpenedCard>,
    cardData: IOpenedCard
) {
    console.log(cardData);
    setCurrentCard(cardData);
}

export const Footer: React.FC<{
    openTabs: Array<IOpenedCard>;
    setCurCard: React.Dispatch<IOpenedCard>;
}> = (props) => {
    //Map the openCards
    return (
        //<View className="absolute bottom-0 flex justify-center items-center bg-black w-screen py-3 h-[100] overflow-hidden">
        <View
            style={{
                position: "absolute",
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                width: "50%",
                paddingHorizontal: 400,
                paddingVertical: 10,
                height: 100,
                zIndex: 5,
            }}
        >
            <ScrollView
                horizontal={true}
                style={{
                    marginHorizontal: 100,
                    marginVertical: 0,
                    flex: 1,
                    width: 500,
                    height: 800,
                    paddingVertical: 20,
                    paddingLeft: 0,
                    paddingRight: 0,
                    transform: [{ translateX: 0 }, { translateY: -10 }],
                }}
            >
                <View className="flex-row gap-5 py-3 px-[100]">
                    {props.openTabs.map((curTab: IOpenedCard, index) => (
                        <TabIcon
                            tab={curTab}
                            setter={props.setCurCard}
                        ></TabIcon>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};
