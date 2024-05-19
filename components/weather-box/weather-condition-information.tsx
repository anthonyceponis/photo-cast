import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontWeight, StyledText } from "../styled-text";
import { CardType, IOpenedCard } from "../footer";
import {
    faArrowLeft,
    faMinus,
    faPlus,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";

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
}

const getNextSevenDaysThreeLetterCodes = () => {
    const todayIndex = new Date().getDay();
    const dayCodes = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return [...Array(7).keys()].map((i) => dayCodes[(i - 1 + todayIndex) % 7]);
};

const dailyWeatherHighs = generateRandomIntegers(7, 0, 30);
const dailyWeatherLows = generateRandomIntegers(7, 0, 30);
const daysOfWeek = getNextSevenDaysThreeLetterCodes();

interface INearbyByLocation {
    name: string;
    distance: number;
    time: string;
}

const nearbyLocationsDefault: INearbyByLocation[] = [
    { name: "Cambridge", distance: 1, time: "17:00" },
    { name: "London", distance: 2.3, time: "19:00" },
    { name: "Luton", distance: 5, time: "06:00" },
    { name: "Sheffield", distance: 3.1, time: "11:00" },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 8,
    },
    headerCell: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});

enum FilterMethod {
    Location,
    Favourites,
    Soonest,
    Latest,
    Temperature,
}

export const WeatherConditionInformation: React.FC<IProps> = ({
    city,
    setOpenedCard,
    openCards,
    setOpenCards,
}) => {
    const [nearbyLocations, setNearbyLocation] = useState<INearbyByLocation[]>(
        nearbyLocationsDefault
    );
    const [filterMethod, setFilterMethod] = useState<FilterMethod>(
        FilterMethod.Location
    );

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
                            disabled={
                                !openCards
                                    .map((card: IOpenedCard) => card.name)
                                    .includes(city)
                            }
                            onPress={() => {
                                setOpenCards(
                                    openCards.filter(
                                        (card) => card.name !== city
                                    )
                                );
                            }}
                        >
                            <FontAwesomeIcon
                                color={
                                    !openCards
                                        .map((card: IOpenedCard) => card.name)
                                        .includes(city)
                                        ? "red"
                                        : "black"
                                }
                                size={20}
                                icon={faMinus}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
            <StyledText
                weight={FontWeight.SemiBold}
                className="text-black mt-3 mb-5 text-center text-3xl"
                style={{ fontFamily: "MontserratBold", fontWeight: 600 }}
            >
                {city}
            </StyledText>
            <View className="mb-5 py-3 rounded bg-white">
                <ScrollView className="mx-3" horizontal={true}>
                    <View className="flex-row">
                        {dailyWeatherHighs.map((degrees, i) => {
                            return (
                                <View
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
            <StyledText className="mb-3">Filter by...</StyledText>
            <View className="flex flex-row gap-3 mb-3 flex-wrap">
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        filterMethod === FilterMethod.Location
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setFilterMethod(FilterMethod.Location)}
                >
                    <StyledText
                        className={`font-semibold ${
                            filterMethod === FilterMethod.Location
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Location
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        filterMethod === FilterMethod.Soonest
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setFilterMethod(FilterMethod.Soonest)}
                >
                    <StyledText
                        className={`font-semibold ${
                            filterMethod === FilterMethod.Soonest
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Soonest
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        filterMethod === FilterMethod.Latest
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setFilterMethod(FilterMethod.Latest)}
                >
                    <StyledText
                        className={`font-semibold ${
                            filterMethod === FilterMethod.Latest
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Soonest
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        filterMethod === FilterMethod.Favourites
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setFilterMethod(FilterMethod.Favourites)}
                >
                    <StyledText
                        className={`font-semibold ${
                            filterMethod === FilterMethod.Favourites
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Soonest
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        filterMethod === FilterMethod.Temperature
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setFilterMethod(FilterMethod.Temperature)}
                >
                    <StyledText
                        className={`font-semibold ${
                            filterMethod === FilterMethod.Temperature
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Soonest
                    </StyledText>
                </Pressable>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <StyledText style={styles.headerCell}>Name</StyledText>
                    <StyledText style={styles.headerCell}>Distance</StyledText>
                    <StyledText style={styles.headerCell}>Time</StyledText>
                </View>
                <FlatList
                    data={nearbyLocations}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <StyledText style={styles.cell}>
                                {item.name}
                            </StyledText>
                            <StyledText style={styles.cell}>
                                {item.distance}
                            </StyledText>
                            <StyledText style={styles.cell}>
                                {item.time}
                            </StyledText>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
