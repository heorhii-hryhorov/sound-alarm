# Node/Express/Mongoose Sound Alarm

# Getting started

To get the Node server running locally:

- Clone this repository
- `npm install` to install all required dependencies
- `node index.js` to start the local server

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [ejs](https://github.com/tj/ejs) - Embedded JavaScript templates

## Application Structure

- `index.js` - The entry point to the application. This file defines our express server. It also requires the routes and models we'll be using in the application.
- `models/` - This folder contains file that performs connection to a database of the application.
- `views/` - This folder contains html template for UI of the application.
