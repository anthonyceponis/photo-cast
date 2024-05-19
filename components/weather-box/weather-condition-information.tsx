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
import { useEffect, useState } from "react";

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
    currentOpenedCard:IOpenedCard;
}

const getNextSevenDaysThreeLetterCodes = () => {
    const todayIndex = new Date().getDay();
    const dayCodes = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return [...Array(7).keys()].map((i) => dayCodes[(i + todayIndex) % 7]);
};

const dailyWeatherHighs = generateRandomIntegers(7, 0, 30);
const dailyWeatherLows = generateRandomIntegers(7, 0, 30);
const daysOfWeek = getNextSevenDaysThreeLetterCodes();

interface ILocations {
    name: string;
    distance: number;
    time: Date;
}

const locationsDefault: ILocations[] = [
    { name: "Cambridge", distance: 1, time: new Date() },
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

enum SortMethod {
    Distance,
    Soonest,
    Latest,
}

export const WeatherConditionInformation: React.FC<IProps> = ({
    city,
    setOpenedCard,
    openCards,
    setOpenCards,
    toggleFavourites,
    favourites,
    currentOpenedCard
}) => {
    const [locations, setLocations] = useState<ILocations[]>(locationsDefault);
    const [sortMethod, setSortMethod] = useState<SortMethod>(
        SortMethod.Distance
    );

    useEffect(() => {
        switch (sortMethod) {
            case SortMethod.Distance: {
                setLocations(
                    locations.sort(
                        (loc1, loc2) => loc1.distance - loc2.distance
                    )
                );
            }
            case SortMethod.Soonest: {
                setLocations(
                    locations.sort(
                        (loc1, loc2) =>
                            loc1.time.getTime() - loc2.time.getTime()
                    )
                );
            }
            case SortMethod.Latest: {
                setLocations(
                    locations.sort(
                        (loc1, loc2) =>
                            loc2.time.getTime() - loc1.time.getTime()
                    )
                );
            }
            case SortMethod.Soonest: {
                setLocations(
                    locations.sort(
                        (loc1, loc2) =>
                            loc1.time.getTime() - loc2.time.getTime()
                    )
                );
            }
        }
    }, [sortMethod]);

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
                                        lat:currentOpenedCard.lat,
                                        lng:currentOpenedCard.lng
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
            <StyledText className="mb-3" weight={FontWeight.SemiBold}>
                Filter by...
            </StyledText>
            <View className="flex flex-row gap-3 mb-3 flex-wrap">
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        sortMethod === SortMethod.Distance
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setSortMethod(SortMethod.Distance)}
                >
                    <StyledText
                        className={`font-semibold ${
                            sortMethod === SortMethod.Distance
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Distance
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        sortMethod === SortMethod.Soonest
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setSortMethod(SortMethod.Soonest)}
                >
                    <StyledText
                        className={`font-semibold ${
                            sortMethod === SortMethod.Soonest
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Soonest
                    </StyledText>
                </Pressable>
                <Pressable
                    className={`border rounded-full px-3 py-2 ${
                        sortMethod === SortMethod.Latest
                            ? "bg-black"
                            : "bg-white"
                    }`}
                    onPress={() => setSortMethod(SortMethod.Latest)}
                >
                    <StyledText
                        className={`font-semibold ${
                            sortMethod === SortMethod.Latest
                                ? "text-white"
                                : "text-black"
                        }`}
                    >
                        Latest
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
                    data={locations}
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
                                {item.time.getHours()}:{item.time.getMinutes()}
                            </StyledText>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
