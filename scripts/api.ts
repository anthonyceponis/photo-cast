import axios from 'axios';
import { ICity } from '../components/weather-box/container';
import { sortBy } from 'sort-by-typescript';

// API key, city name and url for fetching weather data based
const apiKey = '0267fb2bce1e8cc555d0e5621963f2a8'

export function getWeatherInfoByName(city:string)
{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  return {
    name:fetchName(url),
    temperature:fetchTemperature(url),
    description:fetchDescription(url),
    long:fetchLong(url),
    lat:fetchLat(url),
    mainDesc:fetchMainDescription(url),
    pressure:fetchPressure(url),
    cloudCoverage:fetchCloudCoverage(url)
  };
}

export function getWeatherInfoByLoc(long:number, lat:number)
{
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
  return {
    name:fetchName(url),
    temperature:fetchTemperature(url),
    description:fetchDescription(url),
    long:fetchLong(url),
    lat:fetchLat(url),
    mainDesc:fetchMainDescription(url),
    pressure:fetchPressure(url),
    cloudCoverage:fetchCloudCoverage(url)
  };
}

// Current Functionality:
// Name, Temperature, Main Description, Description, Long., Lat., Pressure

// Get Location City Name
const fetchName = async(url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.name;
  } catch (error) {
    console.error("Cannot get Location Name: ", error);
    return null;
  }
};

// Get Location Temperature
const fetchTemperature = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.main.temp;
  } catch (error) {
    console.error("Cannot get Temperature: ", error);
    return null;
  }
};

// Get Weather Description e.g. overcast clouds
const fetchDescription = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.weather[0].description;
  } catch (error) {
    console.error("Cannot get Weather Description: ", error);
    return null;
  }
};

// Get Location Longitude
const fetchLong = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.coord.lon;
  } catch (error) {
    console.error("Cannot get Location Longitude: ", error);
    return null;
  }
};

// Get Location Latitude 
const fetchLat = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.coord.lat;
  } catch (error) {
    console.error("Cannot get Location Latitude: ", error);
    return null;
  }
};

// Get Location Main Description
const fetchMainDescription = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.weather[0].main;
  } catch (error) {
    console.error("Cannot get Main Description: ", error);
    return null;
  }
};


// Get Location Pressure
const fetchPressure = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.main.pressure;
  } catch (error) {
    console.error("Cannot get pressure: ", error);
    return null;
  }
};

const fetchCloudCoverage = async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data.clouds.all;
  } catch (error)
  {
    console.error("Cannot get cloud coverage: ", error);
    return null
  }
}

interface IReverseResponse{
  name:string,
  local_names:Array<string>,
  lat:string,
  lon:string,
  country:string
}
export const getLocationByCoords = async(lat:number, lng:number) =>
{
  console.log("Getting location by coords");
  const urlReverse = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=${1}&appid=${apiKey}`;
  const response = await axios.get(urlReverse);
  const locations = response.data;
  console.log(locations[0]);
  return(locations[0].name);
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

export function getNearbyLocations(ourLat:number, ourLng:number)
{
  try{
  //const allLocations = cityData.map((city: ICity) => [city.lat, city.lng])
  //console.log(allLocations)
  //const firstLocation = allLocations[0];
  //console.log(firstLocation);
  //console.log(parseFloat(firstLocation[0]));
  //console.log(Math.pow(ourLat-parseFloat(firstLocation[0]), 2) + Math.pow(ourLng-parseFloat(firstLocation[1]), 2))

  const locations =
  cityData.sort(
    (a:ICity,b:ICity) => 
      {
        const distA = Math.pow(ourLat-parseFloat(String(a.lat)), 2) + Math.pow(ourLng-parseFloat(String(a.lng)), 2)
        const distB = Math.pow(ourLat-parseFloat(String(b.lat)), 2) + Math.pow(ourLng-parseFloat(String(b.lng)), 2)
        if(a.city == "Cambridge")
          {
            console.log(Math.pow(ourLat-parseFloat(String(a.lat)), 2) + Math.pow(ourLng-parseFloat(String(a.lat)), 2))
          }
        if(distA > distB)
          {
            return 1;
          }else{
            return -1;
          }
          
      }
  )
  return locations;
  }catch(error)
  {
    console.error("Cannot get nearby locations: ", error);
    return null;
  }
}

export function getFirstN_NearbyLocations(lat: number, lng:number, num:number)
{
  try{
    const locations = getNearbyLocations(lat, lng).slice(0, num+1);
    console.log(locations)
    return locations;
    }catch(error)
    {
      console.error("Cannot get nearby locations: ", error);
      return null;
    }
}

export const getNearbyLocationsWithCondition = async (lat: number, lng:number, condition:String) =>
{
  const nearLocations = getFirstN_NearbyLocations(lat, lng, 5);
  console.log(nearLocations[0].city)
  const meetingConditions = [];
  for(let i = 0; i < 5; i++)
    {
      const curCondition = await fetchMainDescription(`https://api.openweathermap.org/data/2.5/weather?q=${nearLocations[i].city}&appid=${apiKey}`); 
      console.log(curCondition);
      if(curCondition == condition)
        {
          meetingConditions.push(nearLocations[i])
          console.log(nearLocations[i].city)
        }
    }
    console.log("Here");
    return meetingConditions;
}