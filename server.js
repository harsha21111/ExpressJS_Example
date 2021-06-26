const express = require('express');
const bodyParser = require('body-parser');
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Node-Express",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "ISC",
          url: "",
        },
        contact: {
          name: "harsha",
          url: "https://google.com",
          email: "google123@email.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ['./app/routes/note.routes.js'],
  };
  

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the application..."});
});

require('./app/routes/note.routes.js')(app);

const specs = swaggerJsdoc(options);
  app.use(
    "/notes1",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});