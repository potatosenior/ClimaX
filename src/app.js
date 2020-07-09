const express = require('express');
const path = require('path');
const hbs = require('hbs');
const get_geo = require("../utils/geocode");
const get_weather = require("../utils/weather");
require('../helpers/handlebars');

const app = express();
const port = process.env.PORT || 3000;
const public_dir = path.join(__dirname, '../public');

// set views path (default = views)
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// handlebars engine e local das views, partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Diretorio static
app.use(express.static(public_dir));

app.get('', (req, res) => {
  res.render('index', {
    active: 'index'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    active: 'help'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    active: 'about'
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query) {
    return res.send({
      error: "Parâmetro não pode ser vazio!"
    });
  }

  let params = req.query;
  let coords = await get_geo(params.adress);
  if (coords.error) {
    res.send(coords);
  } else {
    let data = await get_weather(coords.lat, coords.long);
    
    if (data.error) {
      res.send(data);
    } else {
      let forecast = `Temperatura de ${data.current.temperature}° Celsius e sensação térmica de ${data.current.feelslike}° Celsius!`
      res.send({
        // temperature: data.current.temperature,
        // feelslike: data.current.feelslike,
        // description: data.current.weather_descriptions,
        location: coords.location,
        forecast
      });
    }
  }
});

app.get('help/*', (req, res) => {
  res.render('error', {
    code: 404,
    title: 'Página de ajuda não encontrada!'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    code: 404,
    title: 'Página não encontrada!'
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}!`);
});