import {
    Pressable,
    SafeAreaView,
    ActivityIndicatorBase,
    Button,
    Text,
    View,
} from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";

import { WeatherContainer } from "./components/weather-box/container";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import * as currentWeather from "./scripts/api";
import {
    getZenithTime,
    getSunriseTime,
    getSunsetTime,
    pptime,
    goldenHourZenithAngle,
} from "./scripts/calculations";
import { NavigationContainer } from "@react-navigation/native";
import { SideNav } from "./components/sidenav";
import {
    FadeInView,
    SlideInView,
    ISlidePositions,
} from "./components/squareDemo";

import { IOpenedCard, CardType } from "./components/footer";

export function HomeScreen() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Long, setLong] = useState(0);
    const [Lat, setLat] = useState(0);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [weatherBoxOpen, setWeatherBoxOpen] = useState<boolean>(false);

    const [openTabs, setOpenTabs] = useState<Array<IOpenedCard>>([]); //List of all tabs
    const [openedCard, setOpenedCard] = useState<IOpenedCard | null>(null); //Currently opened card

    // Call API for weather data
    useEffect(() => {
        const fetchData = async () => {
            setName(await currentWeather.getWeatherInfoByName("london").name);
            setTemperature(
                await currentWeather.getWeatherInfoByName("london").temperature
            );
            setDescription(
                await currentWeather.getWeatherInfoByName("london").description
            );
            setLong(await currentWeather.getWeatherInfoByName("london").long);
            setLat(await currentWeather.getWeatherInfoByName("london").lat);

            //console.log(currentWeather.getNearbyLocationsWithCondition(52.2053, 0.1192, "Clouds"))

            //Adding some test tabs
            let conditionTab1 = {
                type: CardType.Condition,
                name: "Golden Hour",
                filters: "Favourites",
            };
            let locationTab1 = {
                type: CardType.Location,
                name: "Barnsley",
                filters: "",
            };
            let locationTab2 = {
                type: CardType.Location,
                name: "Sheffield",
                filters: "",
            };
            let locationTab3 = {
                type: CardType.Location,
                name: "Doncaster",
                filters: "",
            };
            let locationTab4 = {
                type: CardType.Location,
                name: "Rotherham",
                filters: "",
            };
            let locationTab5 = {
                type: CardType.Location,
                name: "Leeds",
                filters: "",
            };
            setOpenTabs([
                conditionTab1,
                locationTab1,
                locationTab2,
                locationTab3,
                locationTab4,
                locationTab5,
                locationTab1,
                locationTab2,
                locationTab3,
                locationTab4,
                locationTab5,
                locationTab1,
                locationTab2,
                locationTab3,
                locationTab4,
                locationTab5,
            ]);
        };
        fetchData();
    }, []);

    const timezone = +1;

    const sunriseTime = timezone + getSunriseTime(2024, 135, 14, Long, Lat);
    const morningGHend =
        timezone +
        getZenithTime(2024, 135, 14, Long, Lat, goldenHourZenithAngle, true);
    const eveningGHstart =
        timezone +
        getZenithTime(2024, 135, 14, Long, Lat, goldenHourZenithAngle, false);
    const sunsetTime = timezone + getSunsetTime(2024, 135, 14, Long, Lat);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="absolute top-0 left-0 w-screen bg-black p-3"></View>
            <Map />

            <SlideInView
                style={{ zIndex: 2 }}
                positions={{ startX: 175, startY: -800, endX: 300, endY: -800 }}
                prompt={isSideNavOpen}
            >
                <Button
                    title="search"
                    onPress={() => {
                        setIsSideNavOpen(!isSideNavOpen);
                        console.log(isSideNavOpen);
                    }}
                />
            </SlideInView>

            <SlideInView
                style={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    transform: [{ translateX: 800 }, { translateY: 0 }],
                    zIndex: 1,
                    flexGrow: 0,
                    position: "absolute",
                }}
                positions={{ startX: 800, startY: 0, endX: 0, endY: 0 }}
                prompt={isSideNavOpen}
            >
                <Pressable onPress={() => setWeatherBoxOpen(true)}>
                    <FontAwesomeIcon icon={faSearch} />
                </Pressable>

                <WeatherContainer
                    setIsOpen={setIsSideNavOpen}
                    openedCard={openedCard}
                    setOpenedCard={setOpenedCard}
                    openCards={openTabs}
                    setOpenCards={setOpenTabs}
                />
            </SlideInView>
            <Footer openTabs={openTabs} setCurCard={setOpenedCard} />
        </View>
    );
}

export default function App() {
    return <SideNav />;
}
/*
            <SlideInView
                style={{
                width: 250,
                height: 50,
                backgroundColor: 'powderblue',
                }} 
                positions={{startX: 250, startY: -250, endX: -250, endY: 250}}
                prompt={isSideNavOpen}
                >
                <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
                Fading in
                </Text>
            </SlideInView>

            <FadeInView
                style={{
                width: 250,
                height: 50,
                backgroundColor: 'powderblue',
                }}>
                <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
                Fading in
                </Text>
            </FadeInView>
            */
