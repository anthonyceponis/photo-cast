import { Button, Text, View } from "react-native";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { Map } from "./components/map";
import { SideNav } from "./components/sidenav";
import { WeatherContainer } from "./components/weather-box/container";
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

            <SlideInView
                    style={{zIndex: 2}}
                    positions={{startX: 175, startY: -350, endX: -175, endY: -350}} 
                    prompt={isSideNavOpen}
                >
                <Button title="Search" onPress={() => {setIsSideNavOpen(!isSideNavOpen); console.log(isSideNavOpen)} } />
            </SlideInView>

            <SlideInView 
                style = {{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    transform: [{translateX: 800}, {translateY: 0}],
                    zIndex: 1,
                    flexGrow: 0,
                    position: "absolute"
                }} 
                positions={{startX: 800, startY: 0, endX: 0, endY: 0}} 
                prompt={isSideNavOpen}
            >
                <WeatherContainer/>
            </SlideInView>
            
            <Footer />
            
            
            

            <Text>Location name: {Name} </Text>
            <Text>Temperature: {Temperature ? ((parseFloat(Temperature) - 273.15).toFixed(2)+"°C"):'N/A'}</Text>
            <Text>Location Description: {Description} </Text>
            <Text>Location Latitude: {Lat} </Text>
            <Text>Location Longitude: {Long} </Text>

        </View>
    );
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