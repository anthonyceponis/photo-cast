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
    "Rain",
    "Clouds",
    "Mist",
    "Snow",
    "Drizzle",
    "Thunderstorm",
    "Clear"
];

const ListItemCity = ({
    itemIn,
    cardType,
    setOpenedCard,
}: {
    itemIn: String;
    cardType: CardType;
    setOpenedCard: React.Dispatch<IOpenedCard>;
}) => {
    //console.log(typeof(itemIn))
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

let favouriteLocations = [
    "Cambridge",
    "London",
];


function toggleFavouriteLocation(location: string): string[] {
    const locationIndex = favouriteLocations.indexOf(location);
    if (locationIndex === -1) { favouriteLocations = [...favouriteLocations, location];
    } else { favouriteLocations = favouriteLocations.filter(loc => loc !== location);
    } return favouriteLocations;
}

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
    const windowHeight = Dimensions.get("window").height;
    const [searchMethod, setSearchMethod] = useState<CardType>(
        CardType.Location
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [cityList, setCityList] = useState(
        cityData.map((city: ICity) => city.city.toLowerCase())
    );
    //console.log("Cities:" + String(cityData[0].city));
    const [weatherConditionList, setWeatherConditionList] =
        useState(allWeatherConditions);
    const [filteredFavourites, setFilteredFavourites] =
        useState<string[]>(favouriteLocations);

    useEffect(() => {
        console.log("openedCard "+openedCard)
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
            );
        } else if (searchMethod === CardType.Condition) {
            setWeatherConditionList(
                allWeatherConditions.filter((condition) =>
                    condition.includes(searchQuery)
                )
            );
        } else if (searchMethod === CardType.Favourite) {
            setFilteredFavourites(
                filteredFavourites.filter((location) =>
                    location.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, searchMethod]);

    return (
        <View className="h-screen w-screen relative">
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
                    <View className="rounded p-3">
                        <TouchableOpacity
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
                                        searchMethod === CardType.Condition
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    Condition
                                </StyledText>
                            </Pressable>
                            <Pressable
                                className={`border rounded-full px-3 py-2 ${
                                    searchMethod === CardType.Favourite
                                        ? "bg-black"
                                        : "bg-white"
                                }`}
                                onPress={() =>
                                    setSearchMethod(CardType.Favourite)
                                }
                            >
                                <StyledText
                                    className={`font-semibold ${
                                        searchMethod === CardType.Favourite
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    Favourites
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
                                    <ListItemCity
                                        itemIn={item}
                                        cardType={CardType.Location}
                                        setOpenedCard={setOpenedCard}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : searchMethod === CardType.Condition ? (
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
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : (
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
                        )}
                    </View>
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
