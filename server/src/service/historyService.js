// Import fs promises version to read and write to our db.json file
import { promises as fs } from 'fs';
import { v4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
class City {
    constructor(name) {
        this.id = v4();
        this.name = name;
    }
}
// COMPLETED Complete the HistoryService class
class HistoryService {
    // COMPLETED Define a private read method that reads from the db.json file - this method will only be accessible within the HistoryService class
    constructor() {
        // Use import.meta.url to get the current file URL and convert it to a path
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.dbFilePath = path.join(__dirname, '../../db/searchHistory.json');
    }
    async read() {
        try {
            // Use fs to read the db.json file
            const rawArray = await fs.readFile(this.dbFilePath, 'utf-8');
            // Parse the raw JSON data array
            const cityArray = JSON.parse(rawArray);
            // Return the parsed array
            return cityArray;
        }
        catch (error) {
            console.error('Error reading the searchHisory.json file', error);
            return [];
        }
        // Using fs will give you unparsed JSON data array
        // return the parsed array - ie. JSON.parse(rawArray);
    }
    // COMPLETE Define a write method that writes the updated cities array to the db.json file
    async write(cities) {
        try {
            // Convert the cities array to a JSON string
            const data = JSON.stringify(cities, null, 2);
            // Use fs to overwrite the db.json file with the stringified array of city objects
            await fs.writeFile(this.dbFilePath, data, 'utf-8');
        }
        catch (error) {
            console.error('Error writing to the searchHistory.json file', error);
        }
    }
    // Define a get method that returns an array of city objects, using the read method to retrieve the array from db.json
    async getCities() {
        // Get the array of cites, using the read method
        const cityArray = await this.read();
        return cityArray;
    }
    // COMPLETED Define an addCity method that adds a city to the db.json file
    async addCity(city) {
        // Get the array of city objects from db.json, using this.read
        const citiesArray = await this.getCities();
        const existingCity = citiesArray.find((c) => c.name === city);
        if (existingCity) {
            return;
        }
        // First use citiesArray.find() to check if there is already a city object matching the city name
        // If there is, return without continuing the rest of the code below
        const newCity = new City(city);
        citiesArray.push(newCity);
        await this.write(citiesArray);
        // Create a city variable that stores a new City object - Pass in the city parameter as an argument
        // Push the new city object to the citiesArray above
        // Use this.write to overwrite the db.json file with our new array of city objects
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the db.json file
    async removeCity(id) {
        const citiesArray = await this.getCities();
        const filterCity = citiesArray.filter((city) => city.id !== id);
        await this.write(filterCity);
        console.log(`city with an id ${id} has been deleted`);
        //   // Get the cities array
        //   const citiesArray = await this.getCities();
        //   // Filter out the city object within citiesArray that has an id matching the id above - ie. citiesArray.filter(() => {})
        //   // Use the write method to overwrite the searchHistory.json file
        //   // console.log a confirmation that the city has been removed
        // }
    }
}
export default new HistoryService();
