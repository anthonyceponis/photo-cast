import axios from 'axios';
import { ICity } from '../components/weather-box/container';
import { sortBy } from 'sort-by-typescript';
import moment from 'moment';

// API key for fetching weather data 
const apiKey = '0267fb2bce1e8cc555d0e5621963f2a8'

// get location info by city name
export async function getWeatherInfoByName(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return getWeatherInfo(url);
}

interface IWeatherInfo {
    name: string,
    temperature: string,
    description: string,
    long: number,
    lat: number,
    mainDesc: string,
    pressure: number,
    cloudCoverage: number,
    sunriseTime: number,
    morningGHend: number,
    eveningGHstart: number,
    sunsetTime: number,
    morningBHstart: number,
    eveningBHend: number,
    timestamp: string
}

// get all weather info by URL
async function getWeatherInfo(url: string): Promise<IWeatherInfo[]> {
    let date = moment();
    const timezone = date.utcOffset() / 60;
    let data: any;

    try {
        const response = await axios.get(url);
        data = response.data;
    } catch (error) {
        console.error("Cannot get Weather Data: ", error);
        return [];
    }
    return data;
};

// Get Weather Description e.g. overcast clouds
const fetchMainDescription = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data.weather[0].main;
    } catch (error) {
        console.error("Cannot get Weather Description: ", error);
        return null;
    }
};


const cityData = require("../assets/cities.json");

export function getNearbyLocations(ourLat: number, ourLng: number) {
    try {
        const locations =
            cityData.sort(
                (a: ICity, b: ICity) => {
                    const distA = Math.pow(ourLat - parseFloat(String(a.lat)), 2) + Math.pow(ourLng - parseFloat(String(a.lng)), 2)
                    const distB = Math.pow(ourLat - parseFloat(String(b.lat)), 2) + Math.pow(ourLng - parseFloat(String(b.lng)), 2)
                    if (a.city == "Cambridge") {
                        console.log(Math.pow(ourLat - parseFloat(String(a.lat)), 2) + Math.pow(ourLng - parseFloat(String(a.lat)), 2))
                    }
                    if (distA > distB) {
                        return 1;
                    } else {
                        return -1;
                    }

                }
            )
        return locations;
    } catch (error) {
        console.error("Cannot get nearby locations: ", error);
        return null;
    }
}

export function getFirstN_NearbyLocations(lat: number, lng: number, num: number) {
    try {
        const locations = getNearbyLocations(lat, lng).slice(0, num + 1);
        console.log(locations)
        return locations;
    } catch (error) {
        console.error("Cannot get nearby locations: ", error);
        return null;
    }
}

export const getNearbyLocationsWithCondition = async (lat: number, lng: number, condition: String) => {
    const nearLocations = getFirstN_NearbyLocations(lat, lng, 5);
    console.log(nearLocations[0].city)
    const meetingConditions = [];
    for (let i = 0; i < 5; i++) {
        const curCondition = await fetchMainDescription(`https://api.openweathermap.org/data/2.5/weather?q=${nearLocations[i].city}&appid=${apiKey}`);
        console.log(curCondition);
        if (curCondition == condition) {
            meetingConditions.push(nearLocations[i])
            console.log(nearLocations[i].city)
        }
    }
    console.log("Here");
    return meetingConditions;
}