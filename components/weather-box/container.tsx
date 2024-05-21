// All imports here

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Keyboard,
    Pressable,
    TextInput,
    View,
} from "react-native";
import { WeatherLocationInformation } from "./weather-location-information";
import { CardType, IOpenedCard } from "../footer";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontWeight, StyledText } from "../styled-text";
import { WeatherConditionInformation } from "./weather-condition-information";
import { getListedLocationCoords } from "../../scripts/api";
const cityData = require("../../assets/cities.json");

// City interface

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

// Weather conditions for search purposes

const allWeatherConditions = [
    "Morning blue hour",
    "Evening blue hour",
    "Sunrise",
    "Sunset",
    "Golden morning",
    "Golden evening",
    "Rain",
    "Clouds",
    "Mist",
    "Snow",
    "Drizzle",
    "Thunderstorm",
    "Clear",
];


// render each city in the list
const ListItemCity = ({
    itemIn,
    cardType,
    setOpenedCard,
}: {
    itemIn: String;
    cardType: CardType;
    setOpenedCard: React.Dispatch<IOpenedCard>;
}) => {

    var latlng = getListedLocationCoords(String(itemIn));
    var lat = 0;
    var lng = 0;
    if (latlng != null) {
        lat = parseFloat(latlng[0]);
        lng = parseFloat(latlng[1]);
    } else {
        lat = 0;
        lng = 0;
    }
    return (
        <TouchableOpacity
            className="bg-white text-black p-3 border-b border-gray-200"
            onPress={() => {
                setOpenedCard({
                    type: cardType,
                    name: String(itemIn),
                    filters: "",
                    lat: lat,
                    lng: lng,
                });
            }}
        >
            <StyledText>{itemIn}</StyledText>
        </TouchableOpacity>
    );
};

// render each weather condition in the list
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
                setOpenedCard({
                    type: cardType,
                    name: item,
                    filters: "",
                    lat: 0,
                    lng: 0,
                });
            }}
        >
            <StyledText>{item}</StyledText>
        </TouchableOpacity>
    );
};

// Default favourite locations
let favouriteLocations = [
    "Cambridge",
    "London",
];

// Toggle a location as a favourite and return the new list of favourites
function toggleFavouriteLocation(location: string): string[] {
    const locationIndex = favouriteLocations.indexOf(location);
    if (locationIndex === -1) { favouriteLocations = [...favouriteLocations, location];
    } else { favouriteLocations = favouriteLocations.filter(loc => loc !== location);
    } return favouriteLocations;
}

// Weather container props interface
interface IProps {
    setIsOpen: React.Dispatch<boolean>;
    openedCard: IOpenedCard | null;
    setOpenedCard: React.Dispatch<IOpenedCard | null>;
    openCards: IOpenedCard[];
    setOpenCards: React.Dispatch<IOpenedCard[]>;
}

// The actual weather container
export const WeatherContainer: React.FC<IProps> = ({
    setIsOpen,
    openedCard,
    setOpenedCard,
    openCards,
    setOpenCards,
}) => {

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    // Search state
    const [searchMethod, setSearchMethod] = useState<CardType>(CardType.Location);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cityList, setCityList] = useState(cityData.map((city: ICity) => city.city.toLowerCase()));

    const [weatherConditionList, setWeatherConditionList] = useState(allWeatherConditions);
    const [filteredFavourites, setFilteredFavourites] = useState<string[]>(favouriteLocations);

    useEffect(() => {
        console.log("openedCard "+openedCard)
        if (openedCard !== null) setIsOpen(true);

    }, [openedCard]);

    useEffect(() => {
        // Searching for location
        if (searchMethod === CardType.Location) {
            setCityList(cityData
                .map((city: ICity) => city.city)
                .filter((city: string) =>
                    city.toLowerCase().includes(searchQuery.toLowerCase()))
                .sort());
        }
        // Searching for weather condition
        else if (searchMethod === CardType.Condition) {
            setWeatherConditionList(allWeatherConditions
                .filter((condition) => condition.includes(searchQuery)));
        }
        // Searching for favourite locations
        else if (searchMethod === CardType.Favourite) {
            setFilteredFavourites(
                filteredFavourites.filter((location) =>
                    location.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, searchMethod]);

    return (
        <View className="h-screen w-screen relative">
            {/* Background overlay */}
            <View
                onTouchEnd={() => {
                    setOpenedCard(null);
                    setIsOpen(false);
                }}
                className="bg-black opacity-75 w-screen h-screen absolute top-0 left-0"
            />
            <ScrollView
                style={{
                    marginTop: 50,
                    width: windowWidth - 20,
                    height: windowHeight - 50 - 150,
                    transform: "translateX(10px)",
                }}
                className="bg-gray-50 rounded absolute"
            >
                {!openedCard ? (
                    // Display search menu when we do not have an opened card
                    <View className="rounded p-3">

                        <TouchableOpacity
                            // Close button
                            className="text-right flex-row justify-end"
                            onPress={() => {
                                setIsOpen(false);
                                Keyboard.dismiss();
                            }}
                        >
                            <FontAwesomeIcon size={25} icon={faXmark} />
                        </TouchableOpacity>

                        <StyledText className="font-semibold mb-2">
                            Search by...
                        </StyledText>

                        <View className="flex flex-row gap-3 mb-3">
                            {/* Buttons to choose search method */}
                            <Pressable
                                className={`border rounded-full px-3 py-2 ${searchMethod === CardType.Location
                                        ? "bg-black"
                                        : "bg-white"
                                    }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Location)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${searchMethod === CardType.Location
                                            ? "text-white"
                                            : "text-black"
                                        }`}
                                >
                                    Location
                                </StyledText>
                            </Pressable>

                            <Pressable
                                className={`border rounded-full px-3 py-2 ${searchMethod === CardType.Condition
                                        ? "bg-black"
                                        : "bg-white"
                                    }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Condition)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${searchMethod === CardType.Condition
                                            ? "text-white"
                                            : "text-black"
                                        }`}
                                >
                                    Condition
                                </StyledText>
                            </Pressable>

                            <Pressable
                                className={`border rounded-full px-3 py-2 ${searchMethod === CardType.Favourite
                                        ? "bg-black"
                                        : "bg-white"
                                    }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Favourite)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${searchMethod === CardType.Favourite
                                            ? "text-white"
                                            : "text-black"
                                        }`}
                                >
                                    Favourites
                                </StyledText>
                            </Pressable>

                        </View>

                        {/* Search bar */}
                        <TextInput
                            style={{ fontFamily: "MontserratRegular" }}
                            className="border border-gray-400 rounded px-3 py-2 mb-5 bg-white"
                            placeholder="Enter location or weather condition"
                            onChangeText={(value: string) =>
                                setSearchQuery(value)
                            }
                        />
                        {/* Display the list of locations, weather conditions or favourite locations */}
                        {searchMethod === CardType.Location ? (
                            cityList.length > 0 ? (
                                <FlatList
                                    data={cityList}
                                    className="rounded max-h-96"
                                    renderItem={({ item }) => (
                                        <ListItemCity
                                            itemIn={item}
                                            cardType={CardType.Location}
                                            setOpenedCard={setOpenedCard}
                                        />
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            ) : (
                                <StyledText className="text-red-400">
                                    No city found...
                                </StyledText>
                            )
                        ) : searchMethod === CardType.Condition ? (
                            weatherConditionList.length > 0 ? (
                                <FlatList
                                    data={weatherConditionList}
                                    className="rounded max-h-96"
                                    renderItem={({ item }) => (
                                        <ListItem
                                            item={item}
                                            cardType={CardType.Condition}
                                            setOpenedCard={setOpenedCard}
                                        />
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            ) : (
                                <StyledText className="text-red-600">
                                    No condition found
                                </StyledText>
                            )
                        ) : favouriteLocations.length > 0 ? (
                            <FlatList
                                data={favouriteLocations}
                                className="rounded max-h-52"
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
                            <StyledText className="text-red-600">
                                No location found
                            </StyledText>
                        )}
                    </View>
                // if we have an opened card, display the location based info
                ) : openedCard.type === CardType.Location ? (
                    <WeatherLocationInformation
                        setOpenedCard={setOpenedCard}
                        city={openedCard.name}
                        openCards={openCards}
                        setOpenCards={setOpenCards}
                        toggleFavourites={toggleFavouriteLocation}
                        favourites={favouriteLocations}
                        currentOpenedCard={openedCard}
                    />
                // if we have an opened card, display the weather condition based info
                ) : (
                    <WeatherConditionInformation
                        setOpenedCard={setOpenedCard}
                        city={openedCard.name}
                        openCards={openCards}
                        setOpenCards={setOpenCards}
                        toggleFavourites={toggleFavouriteLocation}
                        favourites={favouriteLocations}
                        currentOpenedCard={openedCard}
                    />
                )}
            </ScrollView>
        </View>
    );
};
