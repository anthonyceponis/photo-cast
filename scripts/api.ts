import axios from 'axios';

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