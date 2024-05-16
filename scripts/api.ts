import axios from 'axios';
import moment from 'moment';
import { getZenithTime, getSunriseTime, getSunsetTime, goldenHourZenithAngle, blueHourZenithAngle } from "./calculations";

// API key, city name and url for fetching weather data based
const apiKey = '0267fb2bce1e8cc555d0e5621963f2a8'

export async function getWeatherInfoByName(city:string)
{
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  return getWeatherInfo(url);
}
interface WeatherInfo {
  name:string,
  temperature:string,
  description:string,
  long:number,
  lat:number,
  mainDesc:string,
  pressure:number,
  cloudCoverage:number,
  sunriseTime:number,
  morningGHend:number,
  eveningGHstart:number,
  sunsetTime:number,
  morningBHstart:number,
  eveningBHend:number
}
async function getWeatherInfo(url:string):Promise<WeatherInfo[]>
{
  const date = moment();
  const timezone = date.utcOffset()/60;
  let data:any;

  try
  {
    const response = await axios.get(url);
    data = response.data;
  } catch(error)
  {
    console.error("Cannot get Weather Data: ", error);
    return [];
  }

  const long = data.city.coord.lon;
  const lat = data.city.coord.lon;

  let returnData = [];
  for (let i = 0; i < data.list.length; i++)
  {
    returnData.push(
      {
        name:data.city.name,
        temperature:data.list[i].main.temp,
        description:data.list[i].weather[0].description,
        long:long,
        lat:lat,
        mainDesc:data.list[i].weather[0].main,
        pressure:data.list[i].main.pressure,
        cloudCoverage:data.list[i].clouds.all,
        sunriseTime:timezone+getSunriseTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat),
        morningGHend:timezone+getZenithTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat, goldenHourZenithAngle, true),
        eveningGHstart:timezone+getZenithTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat, goldenHourZenithAngle, false),
        sunsetTime:timezone+getSunsetTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat),
        morningBHstart:timezone+getZenithTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat, blueHourZenithAngle, true),
        eveningBHend:timezone+getZenithTime(date.year(), date.dayOfYear(), date.hour()-timezone, long, lat, blueHourZenithAngle, false),
  })};
  return returnData;
}