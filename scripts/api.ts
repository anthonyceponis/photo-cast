import axios from 'axios';
import { ICity } from '../components/weather-box/container';
import moment from 'moment';
import { blueHourZenithAngle, getSunriseTime, getSunsetTime, getZenithTime, goldenHourZenithAngle } from './calculations';

export function getWeatherInfoByLoc(long: number, lat: number) : Promise<Map<string,IWeatherInfo>> 
{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
    return getWeatherInfo(url);
}

// API key for fetching weather data 
const apiKey = '0267fb2bce1e8cc555d0e5621963f2a8'

// get location info by city name
export async function getWeatherInfoByName(city: string): Promise<Map<string,IWeatherInfo>> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return await getWeatherInfo(url);
}

export interface IWeatherInfo {
    name: string,
    temperature: number,
    feels_like:number,
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
    timestamp: string,
    icon:string
}

// get all weather info by URL
async function getWeatherInfo(url: string): Promise<Map<string,IWeatherInfo>> {
    let date = moment();
    const timezone = date.utcOffset() / 60;
    let data: any;

    try {
        const response = await axios.get(url);
        data = response.data;
    } catch (error) {
        console.error("Cannot get Weather Data: ", error);
        return new Map<string, IWeatherInfo>();
    }

    const long = data.city.coord.lon;
    const lat = data.city.coord.lon;

    let returnData: Map<string,IWeatherInfo> = new Map<string,IWeatherInfo>();
    for (let i = 0; i < data.list.length; i++) {
        date = moment(data.list[i].dt_txt);
        returnData.set(data.list[i].dt_txt,
            {
                name: data.city.name,
                temperature: data.list[i].main.temp,
                feels_like:data.list[i].main.feels_like,
                description: data.list[i].weather[0].description,
                long: long,
                lat: lat,
                mainDesc: data.list[i].weather[0].main,
                pressure: data.list[i].main.pressure,
                cloudCoverage: data.list[i].clouds.all,
                sunriseTime: timezone + getSunriseTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat),
                morningGHend: timezone + getZenithTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat, goldenHourZenithAngle, true),
                eveningGHstart: timezone + getZenithTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat, goldenHourZenithAngle, false),
                sunsetTime: timezone + getSunsetTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat),
                morningBHstart: timezone + getZenithTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat, blueHourZenithAngle, true),
                eveningBHend: timezone + getZenithTime(date.year(), date.dayOfYear(), date.hour() - timezone, long, lat, blueHourZenithAngle, false),
                timestamp:data.list[i].dt_txt,
                icon:data.list[i].weather[0].icon
            })
    };
    return returnData;
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


interface IReverseResponse {
    name: string,
    local_names: Array<string>,
    lat: string,
    lon: string,
    country: string
}
export const getLocationByCoords = async (lat: number, lng: number) => {
    //console.log("Getting location by coords");
    const urlReverse = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${1}&appid=${apiKey}`;
    const response = await axios.get(urlReverse);
    const locations = response.data;
    //console.log(locations[0]);
    return (locations[0].name);
}

export function getListedLocationCoords(locationName:string)
{
  const locs = cityData;
  for(let i = 0; i < Object.keys(locs).length; i++)
    {
      if(locs[i].city == locationName)
        {
          return [locs[i].lat, locs[i].lng]
        }
    }
    return null;
}

const cityData = require("../assets/cities.json");

export function getNearbyLocations(ourLat: number, ourLng: number) {
    try {
        const locations =
            cityData.sort(
                (a: ICity, b: ICity) => {
                    const distA = Math.pow(ourLat - parseFloat(String(a.lat)), 2) + Math.pow(ourLng - parseFloat(String(a.lng)), 2)
                    const distB = Math.pow(ourLat - parseFloat(String(b.lat)), 2) + Math.pow(ourLng - parseFloat(String(b.lng)), 2)
                    if (a.city == "Cambridge") {
                        // console.log(Math.pow(ourLat - parseFloat(String(a.lat)), 2) + Math.pow(ourLng - parseFloat(String(a.lat)), 2))
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
        // console.log(locations)
        return locations;
    } catch (error) {
        console.error("Cannot get nearby locations: ", error);
        return null;
    }
}

export const getNearbyLocationsWithCondition = async (lat: number, lng: number, condition: String) => {
    const nearLocations = getFirstN_NearbyLocations(lat, lng, 5);
    // console.log(nearLocations[0].city)
    const meetingConditions = [];
    for (let i = 0; i < 5; i++) {
        const curCondition = await fetchMainDescription(`https://api.openweathermap.org/data/2.5/weather?q=${nearLocations[i].city}&appid=${apiKey}`);
        // console.log(curCondition);
        if (curCondition == condition) {
            meetingConditions.push(nearLocations[i])
            // console.log(nearLocations[i].city)
        }
    }
    // console.log("Here");
    return meetingConditions;
}