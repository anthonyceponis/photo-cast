import { Button, Text, View } from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import { SideNav } from "./components/sidenav";
import React, {useEffect, useState} from 'react';
import * as currentWeather from "./Api";
import { FadeInView, SlideInView, ISlidePositions } from "./components/squareDemo";

export default function App() {
    // Create state variables for storing different weather information
    // Use const [Info, setInfo] = useState(null);  and setInfo(await CurrentWeather.fetchInfo());
    // to add more info from API

    const [Name, setName] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [Description, setDescription] = useState(null);
    const [Long, setLong] = useState(null);
    const [Lat, setLat] = useState(null);

    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

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
            <SideNav />
            <Map />
            <Footer />
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
            <Button title="SideNav" onPress={() => {setIsSideNavOpen(!isSideNavOpen); console.log(isSideNavOpen)} } />
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

            <Text>Location name: {Name} </Text>
            <Text>Temperature: {Temperature ? ((parseFloat(Temperature) - 273.15).toFixed(2)+"°C"):'N/A'}</Text>
            <Text>Location Description: {Description} </Text>
            <Text>Location Latitude: {Lat} </Text>
            <Text>Location Longitude: {Long} </Text>

        </View>
    );
}
/* searching via city name 
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
API key: 0267fb2bce1e8cc555d0e5621963f2a8
*/