import {
    faArrowLeft,
    faMinus,
    faPlus,
    faSun,
    faStar,
    faStarHalfAlt,
    faCloudSun,
    faCloud,
    faCloudMeatball,
    faCloudShowersHeavy,
    faCloudRain,
    faCloudBolt,
    faSnowflake,
    faSmog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, ScrollView, Text, View } from "react-native";
import { FontWeight, StyledText } from "../styled-text";
import { CardType, IOpenedCard } from "../footer";
import { Pressable } from "react-native";

import { getWeatherInfoByName, IWeatherInfo } from "../../scripts/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { icon, Icon, IconDefinition } from "@fortawesome/fontawesome-svg-core";

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
    const dayCodes = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return [...Array(6).keys()].map((i) => dayCodes[(i + todayIndex) % 7]);
};

const getNextSevenDays = () => {
    return [...Array(7).keys()].map((i) => moment().startOf('day').add(12,'hours').add(i, 'days').format('YYYY-MM-DD hh:mm:ss'));   
}

const dailyWeatherHighs = generateRandomIntegers(6, 0, 30);
const dailyWeatherLows = generateRandomIntegers(6, 0, 30);
const hourlyWeather = generateRandomIntegers(24, 0, 30);
const daysOfWeekCodes = getNextSevenDaysThreeLetterCodes();
const daysOfWeekTimestamps = getNextSevenDays();

const iconMap = new Map<string, IconDefinition>();
iconMap.set("01d", faSun);
iconMap.set("02d", faCloudSun);
iconMap.set("03d", faCloud);
iconMap.set("04d", faCloudMeatball);
iconMap.set("09d", faCloudShowersHeavy);
iconMap.set("10d", faCloudRain);
iconMap.set("11d", faCloudBolt);
iconMap.set("13d", faSnowflake);
iconMap.set("50d", faSmog);
iconMap.set("01n", faSun);
iconMap.set("02n", faCloudSun);
iconMap.set("03n", faCloud);
iconMap.set("04n", faCloudMeatball);
iconMap.set("09n", faCloudShowersHeavy);
iconMap.set("10n", faCloudRain);
iconMap.set("11n", faCloudBolt);
iconMap.set("13n", faSnowflake);
iconMap.set("50n", faSmog);

export const WeatherInformation: React.FC<IProps> = ({
    city,
    setOpenedCard,
    openCards,
    setOpenCards,
    toggleFavourites,
    favourites,
    currentOpenedCard
}) => {
    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        toggleFavourites(city);
        setIsFavourite(!isFavourite);
    };


    const [weatherData, setWeatherData] = useState<Map<string,IWeatherInfo>>(new Map<string,IWeatherInfo>());
    const [weatherTimestamps, setWeatherTimestamps] = useState<string[]>([]);

    useEffect(() => {
        getWeatherInfoByName(city).then((data) => {
            setWeatherData(data);
            let timestamps = Array.from(data.keys());
            setWeatherTimestamps(timestamps.sort((a,b) => moment(a).valueOf()-moment(b).valueOf()));
        });
        
    },[]);

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
                <StyledText className="text-xl font-medium text-center mb-5"> 20°C</StyledText>
            <View className="mb-5 py-3 rounded bg-white">
                <ScrollView className="mx-3" horizontal={true}>
                    <View className="flex-row">
                        {[...Array(6).keys()].map((degrees, i) => {
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
                                                ? "text-black"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {daysOfWeekCodes[i]}
                                    </StyledText>
                                    <FontAwesomeIcon size={20} icon={iconMap.get(weatherData.get(daysOfWeekTimestamps[i])?.icon || "01d") || faSun} />
                                    <View>
                                        <StyledText
                                            className="font-light text-center"
                                            style={{ fontSize: 17 }}
                                        >
                                            {weatherData.get(daysOfWeekTimestamps[i]) != undefined ?
                                            ((weatherData.get(daysOfWeekTimestamps[i])?.temperature || 293.15)-273.15).toFixed(1):
                                            i==0 ? ((weatherData.get(weatherTimestamps[0])?.temperature || 293.15)-273.15).toFixed(1):"N/A"}°
                                        </StyledText>
                                        <StyledText className="font-medium text-xs text-gray-400 text-center">
                                            {weatherData.get(daysOfWeekTimestamps[i]) != undefined ?
                                            (weatherData.get(daysOfWeekTimestamps[i])?.mainDesc):
                                            i==0 ? (weatherData.get(weatherTimestamps[0])?.mainDesc):"N/A"}
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
