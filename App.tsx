import { ActivityIndicatorBase, Text, View} from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import React, {useEffect, useState} from 'react';
import * as currentWeather from "./scripts/api";
import moment from 'moment';

import { pptime } from "./scripts/calculations";
import { NavigationContainer } from "@react-navigation/native";
import { SideNav } from "./components/sidenav";

export function HomeScreen() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState<null | string>();
    const [Temperature, setTemperature] = useState<null | string>(null);
    const [Description, setDescription] = useState<null | string>(null);
    const [Long, setLong] = useState(0);
    const [Lat, setLat] = useState(0);
    const [sunriseTime, setSunriseTime] = useState(0);
    const [morningGHend, setMorningGHend] = useState(0);
    const [eveningGHstart, setEveningGHstart] = useState(0);
    const [sunsetTime, setSunsetTime] = useState(0);
    const [date, setDate] = useState(moment());

    // Call API for weather data
    useEffect(() => {
        const fetchData = async () => {
            const data = await currentWeather.getWeatherInfoByName('london');
            setName(data[0].name);
            setTemperature(data[0].temperature);
            setDescription(data[0].description);
            setLong(data[0].long);
            setLat(data[0].lat);
            setSunriseTime(data[0].sunriseTime);
            setMorningGHend(data[0].morningGHend);
            setEveningGHstart(data[0].eveningGHstart);
            setSunsetTime(data[0].sunsetTime);
        };
        fetchData();
    }, []);




    return (
        <View className="flex-1 items-center justify-center bg-orange-50">
            <Nav />
            <Map />
            <Footer />

            <Text>Location: {Name} </Text>
            <Text>Temperature: {Temperature ? ((parseFloat(Temperature) - 273.15).toFixed(2)+"°C"):'N/A'}</Text>
            <Text>Location Description: {Description} </Text>
            <Text>Location Latitude: {Lat} </Text>
            <Text>Location Longitude: {Long} </Text>
            <Text>Sunrise time: {pptime(sunriseTime, true)}</Text>
            <Text>Morning golden hour end time: {pptime(morningGHend, true)}</Text>
            <Text>Evening golden hour start time: {pptime(eveningGHstart, true)}</Text>
            <Text>Sunset time: {pptime(sunsetTime, true)}</Text>
            <Text>Current time: {date.format("HH:mm:ss")}</Text>

        </View>
        
    );
};


export default function App() {
    return (
        <SideNav />
    );
}
