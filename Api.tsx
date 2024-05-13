import axios from 'axios';

// API key, city name and url for fetching weather data based
const apiKey = '0267fb2bce1e8cc555d0e5621963f2a8'
const city = 'london'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

// Current Functionality:
// Name, Temperature, Main Description, Description, Long., Lat., Pressure


// Get Location City Name
export const fetchName = async() => {
  try {
    const response = await axios.get(url);
    return response.data.name;
  } catch (error) {
    console.error("Cannot get Location Name: ", error);
    return null;
  }
};

// Get Location Temperature
export const fetchTemperature = async () => {
  try {
    const response = await axios.get(url);
    return response.data.main.temp;
  } catch (error) {
    console.error("Cannot get Temperature: ", error);
    return null;
  }
};

// Get Weather Description e.g. overcast clouds
export const fetchDescription = async () => {
  try {
    const response = await axios.get(url);
    return response.data.weather[0].description;
  } catch (error) {
    console.error("Cannot get Weather Description: ", error);
    return null;
  }
};

// Get Location Longitude
export const fetchLong = async () => {
  try {
    const response = await axios.get(url);
    return response.data.coord.lon;
  } catch (error) {
    console.error("Cannot get Location Longitude: ", error);
    return null;
  }
};

// Get Location Latitude 
export const fetchLat = async () => {
  try {
    const response = await axios.get(url);
    return response.data.coord.lat;
  } catch (error) {
    console.error("Cannot get Location Latitude: ", error);
    return null;
  }
};

// Get Location Main Description
export const fetchMainDescription = async () => {
  try {
    const response = await axios.get(url);
    return response.data.weather[0].main;
  } catch (error) {
    console.error("Cannot get Main Description: ", error);
    return null;
  }
};


// Get Location Pressure
export const fetchPressure = async () => {
  try {
    const response = await axios.get(url);
    return response.data.main.pressure;
  } catch (error) {
    console.error("Cannot get Main Description: ", error);
    return null;
  }
};