import { ActivityIndicatorBase, Text, View} from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import React, {useEffect, useState} from 'react';
import * as currentWeather from "./scripts/api";
import { getZenithTime, getSunriseTime, getSunsetTime, pptime, goldenHourZenithAngle } from "./scripts/calculations";
import { NavigationContainer } from "@react-navigation/native";
import { SideNav } from "./components/sidenav";

export function HomeScreen() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Long, setLong] = useState(0);
    const [Lat, setLat] = useState(0);

    // Call API for weather data
    useEffect(() => {
        const fetchData = async () => {
            setName(await currentWeather.getWeatherInfoByName('london').name);
            setTemperature(await currentWeather.getWeatherInfoByName('london').temperature);
            setDescription(await currentWeather.getWeatherInfoByName('london').description);
            setLong(await currentWeather.getWeatherInfoByName('london').long);
            setLat(await currentWeather.getWeatherInfoByName('london').lat);
        };
        fetchData();
    }, []);

    const timezone = +1;

    const sunriseTime = timezone+getSunriseTime(2024, 135, 14, Long, Lat);
    const morningGHend = timezone+getZenithTime(2024, 135, 14, Long, Lat, goldenHourZenithAngle, true);
    const eveningGHstart = timezone+getZenithTime(2024, 135, 14, Long, Lat, goldenHourZenithAngle, false);
    const sunsetTime = timezone+getSunsetTime(2024, 135, 14, Long, Lat);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Nav />
            <Map />
            <Footer />

            <Text>Location: {Name} </Text>
            <Text>Temperature: {Temperature ? ((parseFloat(Temperature) - 273.15).toFixed(2)+"°C"):'N/A'}</Text>
            <Text>Location Description: {Description} </Text>
            <Text>Location Latitude: {Lat} </Text>
            <Text>Location Longitude: {Long} </Text>
            <Text>Sunrise time: {pptime(sunriseTime, false)}</Text>
            <Text>Morning golden hour end time: {pptime(morningGHend, false)}</Text>
            <Text>Evening golden hour start time: {pptime(eveningGHstart, false)}</Text>
            <Text>Sunset time: {pptime(sunsetTime, false)}</Text>

        </View>
        
    );
};


export default function App() {
    return (
        <SideNav />
    );
}
