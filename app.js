const express = require("express");
const app = express();
const expressJSDocSwagger = require('express-jsdoc-swagger');

const { Model } = require('objection');
const Knex = require('knex');
const config = require('./.config.js');

const options = {
  info: {
    version: '1.0.0',
    title: 'HOSCalc API Documentation',
    description: 'API Documentation'
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/docs',
  exposeSwaggerUI: true,
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestHeaders: true
  },
   security: {
    Bearer: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  apis: ['./routes/*.js', './models/*.js'],
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Localhost'
    }, 
    {
      url: `https://hoscalc.info`,
      description: 'Production'
    }
  ]
};

expressJSDocSwagger(app)(options);

const knex = Knex(config.db);
Model.knex(knex);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/index'));

app.use('/', express.static('public', {
    maxAge: '1d',  // Cache static files for 1 day
    etag: true,    // Enable ETags
    lastModified: true
  }));

  app.get('/privacy-policy', (req, res) => {
    res.sendFile(__dirname + '/public/privacy.html');
  });

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/public/images/icon.ico');
  });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});