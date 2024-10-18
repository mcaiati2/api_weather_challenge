// import dotenv from 'dotenv';
import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// dotenv.config();
import routes from './routes/index.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// Import the routes


const app = express();

const PORT = process.env.PORT || 3001;


// COMPLETE Serve static files of entire client dist folder
app.use(express.static('../client/dist'));

// COMPLETE Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// COMPLETE Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
