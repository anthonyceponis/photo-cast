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
import moment from 'moment';
import { NavigationContainer } from "@react-navigation/native";
import { SideNav } from "./components/sidenav";
import {
    FadeInView,
    SlideInView,
    ISlidePositions,
} from "./components/squareDemo";

import { IOpenedCard } from "./components/footer";

export function HomeScreen() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [weatherBoxOpen, setWeatherBoxOpen] = useState<boolean>(false);

    const [openTabs, setOpenTabs] = useState<Array<IOpenedCard>>([]); //List of all tabs
    const [openedCard, setOpenedCard] = useState<IOpenedCard>(); //Currently opened card

    // Call API for weather data
    useEffect(() => {
        const fetchData = async () => {
            console.log(currentWeather.getNearbyLocationsWithCondition(52.2053, 0.1192, "Clouds"))
        };
        fetchData();
    }, []);



    return (
        <View className="flex-1 items-center justify-center bg-orange-50">
            <View className="absolute top-0 left-0 w-screen p-3">
            </View>
            <Map />

            <SlideInView
                style={{ zIndex: 2 }}
                positions={{ startX: 175, startY: -800, endX: 300, endY: -800}}
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

                <WeatherContainer setIsOpen={setIsSideNavOpen} />
            </SlideInView>

            <Footer openTabs={openTabs}/>
        </View>
    );
}

export default function App() {
    return <SideNav />;
}