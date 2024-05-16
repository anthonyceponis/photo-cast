import { Text, View } from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import { SideNav } from "./components/sidenav";
import React, {useEffect, useState} from 'react';
import * as currentWeather from "./scripts/api";
import moment from 'moment';

import { pptime } from "./scripts/calculations";

export default function App() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [Description, setDescription] = useState(null);
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
            setName(data.name);
            setTemperature(data.temperature);
            setDescription(data.description);
            setLong(data.long);
            setLat(data.lat);
            setSunriseTime(data.sunriseTime);
            setMorningGHend(data.morningGHend);
            setEveningGHstart(data.eveningGHstart);
            setSunsetTime(data.sunsetTime);
        };
        fetchData();
    }, []);




    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Nav />
            
            <SideNav />
            <Map />
            <Footer />

            <Text>Location name: {Name} </Text>
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
}
/* searching via city name 
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
API key: 0267fb2bce1e8cc555d0e5621963f2a8
*/