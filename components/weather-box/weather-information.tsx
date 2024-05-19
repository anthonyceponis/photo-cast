import {
    faArrowLeft,
    faMinus,
    faPlus,
    faSun,
    faStar,
    faStarHalfAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import { FontWeight, StyledText } from "../styled-text";
import { CardType, IOpenedCard } from "../footer";
import React, { useState } from "react";

function generateRandomIntegers(
    count: number,
    min: number,
    max: number
): number[] {
    const randomIntegers: number[] = [];
    for (let i = 0; i < count; i++) {
        const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
        randomIntegers.push(randomInteger);
    }
    return randomIntegers;
}

interface IProps {
    city: string;
    setOpenedCard: React.Dispatch<IOpenedCard | null>;
    openCards: IOpenedCard[];
    setOpenCards: React.Dispatch<IOpenedCard[]>;
    toggleFavourites: (name: string) => void; 
    favourites: string[];
}

const getNextSevenDaysThreeLetterCodes = () => {
    const todayIndex = new Date().getDay();
    const dayCodes = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return [...Array(7).keys()].map((i) => dayCodes[(i - 1 + todayIndex) % 7]);
};

const dailyWeatherHighs = generateRandomIntegers(7, 0, 30);
const dailyWeatherLows = generateRandomIntegers(7, 0, 30);
const hourlyWeather = generateRandomIntegers(24, 0, 30);
const daysOfWeek = getNextSevenDaysThreeLetterCodes();

export const WeatherInformation: React.FC<IProps> = ({
    city,
    setOpenedCard,
    openCards,
    setOpenCards,
    toggleFavourites,
    favourites,
}) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        toggleFavourites(city);
        setIsFavourite(!isFavourite);
    };

    return (
        <View className="rounded p-3">
            <View className="flex-row justify-between">
                <TouchableOpacity
                    className="p-2 m-1"
                    onPress={() => setOpenedCard(null)}
                >
                    <FontAwesomeIcon size={20} icon={faArrowLeft} />
                </TouchableOpacity>
                <View className="flex-row">
                    {!openCards
                        .map((card: IOpenedCard) => card.name)
                        .includes(city) ? (
                        <TouchableOpacity
                            className="p-2 m-1"
                            onPress={() => {
                                setOpenCards([
                                    ...openCards,
                                    {
                                        type: CardType.Location,
                                        name: city,
                                        filters: "",
                                    },
                                ]);
                            }}
                        >
                            <FontAwesomeIcon size={20} icon={faPlus} />
                        </TouchableOpacity>
                    ) : null}
                    {openCards
                        .map((card: IOpenedCard) => card.name)
                        .includes(city) ? (
                        <TouchableOpacity
                            className="p-2 m-1 rounded"
                            onPress={() => {
                                setOpenCards(
                                    openCards.filter(
                                        (card) => card.name !== city
                                    )
                                );
                            }}
                        >
                            <FontAwesomeIcon
                                size={20}
                                icon={faMinus}
                            />
                        </TouchableOpacity>
                    ) : null}
                    <Pressable
                        className="p-2 m-1"
                        onPress={toggleFavourite}
                    >
                        <FontAwesomeIcon size={20} icon={isFavourite ? faStar : faStarHalfAlt} />
                    </Pressable>
                </View>
            </View>
            <StyledText
                weight={FontWeight.SemiBold}
                className="text-black mt-3 mb-5 text-center text-3xl"
                style={{ fontFamily: "MontserratBold", fontWeight: 600 }}
            >
                {city}
            </StyledText>
            <View className="w-32 bg-white aspect-square rounded-full flex justify-center items-center mb-5">
                <StyledText className="text-3xl font-medium">20°C</StyledText>
            </View>
            <View className="mb-5 py-3 rounded bg-white">
                <ScrollView className="mx-3" horizontal={true}>
                    <View className="flex-row">
                        {dailyWeatherHighs.map((degrees, i) => {
                            return (
                                <View
                                key={i}

                                    className={`flex justify-center items-center gap-y-3 px-3 py-2 mx-2 rounded ${
                                        i === 0 ? "bg-gray-100" : "bg-white"
                                    }`}
                                >
                                    <StyledText
                                        weight={
                                            i === 0
                                                ? FontWeight.SemiBold
                                                : FontWeight.Regular
                                        }
                                        className={`font-medium ${
                                            i === 0
                                                ? "text-black font-semibold"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {daysOfWeek[i]}
                                    </StyledText>
                                    <FontAwesomeIcon size={20} icon={faSun} />
                                    <View>
                                        <StyledText
                                            className="font-light text-center"
                                            style={{ fontSize: 17 }}
                                        >
                                            {Math.max(
                                                degrees,
                                                dailyWeatherLows[i]
                                            )}
                                            °
                                        </StyledText>
                                        <StyledText className="font-medium text-xs text-gray-400 text-center">
                                            {Math.min(
                                                degrees,
                                                dailyWeatherLows[i]
                                            )}
                                            °
                                        </StyledText>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
            <View className="mb-5 py-3 rounded bg-white">
                <ScrollView horizontal={true} className="mx-3">
                    <View className="flex-row">
                        {hourlyWeather.map((degrees, i) => {
                            return (
                                <View
                                key={i}

                                    className={`flex justify-center items-center rounded gap-y-3 px-3 py-2 mx-2 ${
                                        i === 0 ? "bg-gray-100" : "bg-white"
                                    }`}
                                >
                                    <StyledText
                                        weight={
                                            i === 0
                                                ? FontWeight.SemiBold
                                                : FontWeight.Regular
                                        }
                                        className={`font-semibold ${
                                            i === 0
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {(i + new Date().getHours()) % 24}
                                    </StyledText>
                                    <View className="flex-row gap-x-1">
                                        <FontAwesomeIcon
                                            size={20}
                                            icon={faSun}
                                        />
                                        <StyledText>{degrees}°</StyledText>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};
