import dotenv from 'dotenv';
// Import axios to make our http requests to the OpenWeatherMap API
import axios from 'axios';
// Allow us to pull variables from .env file with process.env
dotenv.config();
import dayjs from 'dayjs';
// COMPLETED Complete the WeatherService class
class WeatherService {
    constructor() {
        // COMPLETED Assign the properties baseURL and apiKey using process.env
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
    }
    // COMPLETED Create fetchLocationData method
    async fetchLocationData(city) {
        const url = this.baseURL + `/weather?units=imperial&q=${city}&appid=${this.apiKey}`;
        const res = await axios.get(url);
        return res.data;
    }
    async getForecastWeatherForCity(city) {
        // COMPLETED Create the url variable using this.baseURL + '/forecast', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
        const url = this.baseURL + `/forecast?units=imperial&q=${city}&appid=${this.apiKey}`;
        // Make a fetch request to OpenWeatherMap using the url above constructed above
        // This was changed in the latest push
        const res = await axios.get(url);
        // Please console.log res.data so you can see how the returned data is structured - The 5 day forecast will be provided to you in an array of 40 objects. Each object represents a 3-hour segment of time. 
        console.log(res.data);
        // return the array of of 40 weather objects
        const filtered = res.data.list.filter((weatherObj) => {
            if (weatherObj.dt_txt.includes('12:00')) {
                return weatherObj;
            }
            return false;
        });
        // BONUS: filter the array of 40 objects down to just objects that have a dt_txt that includes '12:00'
        // callback function will get called 40 times for every weatherObject in the array
        const weatherData = filtered.map((weatherObj) => {
            return {
                city: city, // this is completed for you as an example
                date: dayjs(weatherObj.dt * 1000).format('MM/DD/YYYY'), // Use the already installed dayjs package to convert res.data.dt * 1000 into a formatted date like '10/17/2024'
                icon: weatherObj.weather[0].icon,
                iconDescription: weatherObj.weather[0].description,
                tempF: weatherObj.main.temp,
                windSpeed: weatherObj.wind.speed,
                humidity: weatherObj.main.humidity,
            };
        });
        return weatherData;
    }
    // COMPLETED Complete getCurrentWeatherForCity method
    async getCurrentWeatherForCity(city) {
        console.log(process.env.API_BASE_URL);
        console.log('this.baseURL', this.baseURL);
        // COMPLETED Create the url variable using this.baseURL + '/weather', a query parameter of 'units' set to imperial, a query parameter of 'q' set to the city parameter above and a query parameter of appid set to this.apiKey
        const url = this.baseURL + `/weather?units=imperial&q=${city}&appid=${this.apiKey}`;
        // Make a fetch request to OpenWeatherMap using the url above constructed above
        const res = await axios.get(url);
        // Create a data object from the weather data you receive
        // Should be complete:
        const data = {
            city: res.data.name, // this is completed for you as an example
            date: dayjs(res.data.dt * 1000).format('MM/DD/YYYY'), // Use the already installed dayjs package to convert res.data.dt * 1000 into a formatted date like '10/17/2024'
            icon: res.data.weather[0].icon,
            iconDescription: res.data.weather[0].description,
            tempF: res.data.main.temp,
            windSpeed: res.data.wind.speed,
            humidity: res.data.main.humidity,
        };
        // Return the custom data object of weather information
        return data;
    }
}
// Export a constructed/instatiated object, using our WeatherService class above
export default new WeatherService();
