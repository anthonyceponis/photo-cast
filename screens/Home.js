import { ActivityIndicatorBase, Text, View} from "react-native";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { Map } from "../components/map";
import React, {useEffect, useState} from 'react';
import * as currentWeather from "../Api";

export function HomeScreen2() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Long, setLong] = useState(null);
    const [Lat, setLat] = useState(null);

    // Call API for weather data
    useEffect(() => {
        const fetchData = async () => {
            setName(await currentWeather.fetchName());
            setTemperature(await currentWeather.fetchTemperature());
            setDescription(await currentWeather.fetchDescription());
            setLong(await currentWeather.fetchLong());
            setLat(await currentWeather.fetchLat());
        };
        fetchData();
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Nav />
            <Map />
            <Footer />

            <Text>Location name: {Name} </Text>
            <Text>Temperature: {Temperature ? ((parseFloat(Temperature) - 273.15).toFixed(2)+"°C"):'N/A'}</Text>
            <Text>Location Description: {Description} </Text>
            <Text>Location Latitude: {Lat} </Text>
            <Text>Location Longitude: {Long} </Text>

        </View>
    );
};