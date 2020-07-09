const fetch = require("node-fetch");

const geo_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const geo_key = "pk.eyJ1Ijoiam9hb2xpbmRvIiwiYSI6ImNrY2NxZ2UwMDA1MjUyd3AzNjcycm9yZWkifQ.fEZ0YdveV7Elez1UDvxCgQ";

const get_geo = async (query) => {
  return await fetch(geo_url + `${encodeURIComponent(query)}.json?&access_token=` + geo_key + "&size=1")
    .then(async response => {
      return await response.json()
        .then(data => {
          if (data.features.length === 0) {
            // console.log('Cannot get geo location!');
            return {error: true, code: 2, message: 'Localização desconhecida!', query: query};
          } else {
            // console.log('sucess! ', data.features[0].center);
            return {
              lat: data.features[0].center[0],
              long: data.features[0].center[1],
              location: data.features[0].place_name
            };
          }
        })
        .catch(err => {
          // console.log('Cannot jsonify! Error: ', err.message);
          return {error: true, code: 1, message: 'Localização desconhecida!', query: query};
        })
    })  
    .catch( err => {
      // console.log('Cannot connect to the geo API: ', err);
      return {error: true, code: 0, message: 'Não foi possivel conectar com o serviço de geolocalização!', query: query};
    })
}

module.exports = get_geo;