const fetch = require("node-fetch");

const weather_key = "513bb2e3509ce566c60f7524723634be";
const weather_url = "http://api.weatherstack.com/current?access_key=" + weather_key;

const get_weather = async (lat, long) => {
  return await fetch(weather_url + `&query=${encodeURIComponent(long + ',' + lat)}&units=m`)
    .then(async response => {
      return await response.json()
        .then(data => {
          if (data.error) {
            // console.log('Cannot get weather stats!')
            return {
              error: true, code: 2, 
              message: 'Localização desconhecida!',
              query: long + ',' + lat
            };
          } else {
            return data;
          }
        })
        .catch(err => {
          // console.log('Cannot jsonify! Error: ', err.message);
          return {error: true, code: 1, message: 'Localização desconhecida!', query: long + ',' + lat};
        })
    })  
    .catch( err => {
      // console.log('Cannot connect to the weather API: ', err);
      return {error: true, code: 0, message: 'Não foi possivel conectar com o serviço de meteorologia!', query: long + ',' + lat};
    })
}

module.exports = get_weather;