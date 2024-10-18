import { Router, Request, Response } from 'express';
const router = Router();

import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// COMPLETED POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Log the request body

    // Use the weatherService object to retrieve both current weather and forecast weather for the city the user searched for
    const currentData = await weatherService.getCurrentWeatherForCity(req.body.cityName);
    console.log('Current weather data:', currentData); // Log the current weather data

    // Create a variable forecastData that stores the forecast data, using the weatherService.getForecastWeatherForCity()
    const forecastData = await weatherService.getForecastWeatherForCity(req.body.cityName);
    console.log('Forecast weather data:', forecastData); // Log the forecast weather data
    console.log('forecast data', forecastData);

    // Create a variable weatherData that stores an array of the currentData as the first item and forecastData as the second item
    const weatherData = [currentData, forecastData];

    // COMPLETED save city to search history
    await historyService.addCity(req.body.cityName);

    // Send back a json response of the weatherData
    res.json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error); // Log the error
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// COMPLETED GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    // Use the historyService.getCities() to retrieve the cities array of objects
    const cities = await historyService.getCities();
    console.log('Search history:', cities); // Log the search history

    // Send back a json response of the city object array
    res.json(cities);
  } catch (error) {
    console.error('Error retrieving search history:', error); // Log the error
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {
//   // Use the historyService.removeCity() to remove a city by id 
//   // You can use req.params.id to get the id of the city the user wants to remove
// });

export default router;