import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { WeatherLocationInformation } from "./weather-location-information";
import { CardType, IOpenedCard } from "../footer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontWeight, StyledText } from "../styled-text";
import { WeatherConditionInformation } from "./weather-condition-information";
const cityData = require("../../assets/cities.json");

export interface ICity {
    city: String;
    lat: String;
    lng: String;
    country: String;
    iso2: String;
    admin_name: String;
    capital: String;
    population: String;
    population_proper: String;
}

const allWeatherConditions = [
    "Morning blue hour",
    "Evening blue hour",
    "Sunrise",
    "Sunset",
    "Golden morning",
    "Golden evening",
    "Rainy",
    "Cloudy",
];

const ListItem = ({
    item,
    cardType,
    setOpenedCard,
}: {
    item: string;
    cardType: CardType;
    setOpenedCard: React.Dispatch<IOpenedCard>;
}) => {
    return (
        <TouchableOpacity
            className="bg-white text-black p-3 border-b border-gray-200"
            onPress={() => {
                setOpenedCard({ type: cardType, name: item, filters: "" });
            }}
        >
            <StyledText>{item}</StyledText>
        </TouchableOpacity>
    );
};

interface IProps {
    setIsOpen: React.Dispatch<boolean>;
    openedCard: IOpenedCard | null;
    setOpenedCard: React.Dispatch<IOpenedCard | null>;
    openCards: IOpenedCard[];
    setOpenCards: React.Dispatch<IOpenedCard[]>;
}

export const WeatherContainer: React.FC<IProps> = ({
    setIsOpen,
    openedCard,
    setOpenedCard,
    openCards,
    setOpenCards,
}) => {
    const windowWidth = Dimensions.get("window").width;
    const [searchMethod, setSearchMethod] = useState<CardType>(
        CardType.Location
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cityList, setCityList] = useState(
        cityData.map((city: ICity) => city.city.toLowerCase())
    );
    const [weatherConditionList, setWeatherConditionList] =
        useState(allWeatherConditions);

    useEffect(() => {
        if (openedCard !== null) setIsOpen(true);
    }, [openedCard]);

    useEffect(() => {
        if (searchMethod === CardType.Location) {
            setCityList(
                cityData
                    .map((city: ICity) => city.city)
                    .filter((city: string) =>
                        city.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .sort()
                // .slice(0, 10)
            );
        } else {
            setWeatherConditionList(
                allWeatherConditions.filter((condition) =>
                    condition.includes(searchQuery)
                )
            );
        }
    }, [searchQuery]);

    return (
        <View className="h-screen w-screen relative">
            <View
                onTouchEnd={() => {
                    setOpenedCard(null);
                    setIsOpen(false);
                }}
                className="bg-black opacity-75 w-screen h-screen absolute top-0 left-0"
            />
            <View
                style={{
                    width: windowWidth - 20,
                    transform: "translateX(10px)",
                }}
                className="bg-gray-50 rounded mt-24 absolute"
            >
                {!openedCard ? (
                    <View className="rounded p-3">
                        <TouchableOpacity
                            className="text-right flex-row justify-end"
                            onPress={() => setIsOpen(false)}
                        >
                            <FontAwesomeIcon size={25} icon={faXmark} />
                        </TouchableOpacity>
                        <StyledText className="font-semibold mb-2">
                            Search by...
                        </StyledText>
                        <View className="flex flex-row gap-3 mb-3">
                            <Pressable
                                className={`border rounded-full px-3 py-2 ${
                                    searchMethod === CardType.Location
                                        ? "bg-black"
                                        : "bg-white"
                                }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Location)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${
                                        searchMethod === CardType.Location
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    Location
                                </StyledText>
                            </Pressable>
                            <Pressable
                                className={`border rounded-full px-3 py-2 ${
                                    searchMethod === CardType.Condition
                                        ? "bg-black"
                                        : "bg-white"
                                }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Condition)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${
                                        searchMethod === CardType.Location
                                            ? "text-black"
                                            : "text-white"
                                    }`}
                                >
                                    Condition
                                </StyledText>
                            </Pressable>
                        </View>
                        <TextInput
                            style={{ fontFamily: "MontserratRegular" }}
                            className="border border-gray-400 rounded px-3 py-2 mb-5 bg-white"
                            placeholder="Enter location or weather condition"
                            onChangeText={(value: string) =>
                                setSearchQuery(value)
                            }
                        />
                        {searchMethod === CardType.Location ? (
                            <FlatList
                                data={cityList}
                                className="rounded max-h-96"
                                renderItem={({ item }) => (
                                    <ListItem
                                        item={item}
                                        cardType={CardType.Location}
                                        setOpenedCard={setOpenedCard}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
                            <FlatList
                                data={weatherConditionList}
                                className="rounded max-h-52"
                                renderItem={({ item }) => (
                                    <ListItem
                                        item={item}
                                        cardType={CardType.Condition}
                                        setOpenedCard={setOpenedCard}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        )}
                    </View>
                ) : openedCard.type === CardType.Location ? (
                    <WeatherLocationInformation
                        setOpenedCard={setOpenedCard}
                        city={openedCard.name}
                        openCards={openCards}
                        setOpenCards={setOpenCards}
                    />
                ) : (
                    <WeatherConditionInformation
                        setOpenedCard={setOpenedCard}
                        city={openedCard.name}
                        openCards={openCards}
                        setOpenCards={setOpenCards}
                    />
                )}
            </View>
        </View>
    );
};
