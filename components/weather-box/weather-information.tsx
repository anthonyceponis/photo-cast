import {
    faArrowLeft,
    faMinus,
    faPlus,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, ScrollView, Text, View } from "react-native";
import { StyledText } from "../styled-text";
import { CardType, IOpenedCard } from "../footer";

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
    setShowSearchScreen: React.Dispatch<boolean>;
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
const hourlyWeather = generateRandomIntegers(24, 0, 30);
const daysOfWeek = getNextSevenDaysThreeLetterCodes();

export const WeatherInformation: React.FC<IProps> = ({
    city,
    setShowSearchScreen,
    openCards,
    setOpenCards,
}) => {
    return (
        <View className="bg-white rounded p-3">
            <View className="flex-row justify-between">
                <Pressable
                    className="p-2 m-1"
                    onPress={() => setShowSearchScreen(true)}
                >
                    <FontAwesomeIcon size={20} icon={faArrowLeft} />
                </Pressable>
                <View className="flex-row">
                    <Pressable
                        className="p-2 m-1 bg-black"
                        disabled={openCards
                            .map((card: IOpenedCard) => card.name)
                            .includes(city)}
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
                    </Pressable>
                    <Pressable
                        className="p-2 m-1 bg-gray-200 rounded"
                        disabled={
                            !openCards
                                .map((card: IOpenedCard) => card.name)
                                .includes(city)
                        }
                        onPress={() => {
                            setOpenCards(
                                openCards.filter((card) => card.name !== city)
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
                    </Pressable>
                </View>
            </View>
            <StyledText className="text-black font-semibold mt-3 mb-5 text-center text-3xl">
                {city}
            </StyledText>
            <View className="w-32 bg-white aspect-square rounded-full flex justify-center items-center mb-5">
                <StyledText className="text-3xl font-medium"> 20°C</StyledText>
            </View>
            <ScrollView
                horizontal={true}
                className="mb-5 p-3 rounded bg-white shadow"
            >
                {dailyWeatherHighs.map((degrees, i) => {
                    return (
                        <View
                            className={`flex justify-center items-center gap-y-3 px-3 py-2 mx-2 rounded ${
                                i === 0 ? "bg-gray-200" : "bg-white"
                            }`}
                        >
                            <StyledText
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
                                    {Math.max(degrees, dailyWeatherLows[i])}°
                                </StyledText>
                                <StyledText className="font-medium text-xs text-gray-400 text-center">
                                    {Math.min(degrees, dailyWeatherLows[i])}°
                                </StyledText>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            <ScrollView
                horizontal={true}
                className="p-3 rounded bg-white shadow"
            >
                {hourlyWeather.map((degrees, i) => {
                    return (
                        <View
                            className={`flex justify-center items-center rounded gap-y-3 px-3 py-2 mx-2 ${
                                i === 0 ? "bg-gray-200" : "bg-white"
                            }`}
                        >
                            <StyledText
                                className={`font-semibold ${
                                    i === 0 ? "text-black" : "text-gray-400"
                                }`}
                            >
                                {(i + new Date().getHours()) % 24}
                            </StyledText>
                            <View className="flex-row gap-x-1">
                                <FontAwesomeIcon size={20} icon={faSun} />
                                <StyledText>{degrees}°</StyledText>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};
