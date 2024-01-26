getFutureDateWeather: async function (city,date){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      let result = await fetch(
        `http://api.weatherapi.com/v1/future.json?key=${api_key_weatherapi}&q=${city}&dt=${date}`, 
        requestOptions)
      .then(response => response.text())
      result = JSON.parse(result);
      return result;
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
},
  futureDtoFunction: {
    getFutureDateWeather: async function(city){
      let return_value = await weather_api.getCurrentWeather(city);
      let result = {
          date :      return_value.current.date,

          maxTemp :      return_value.forecastday.maxtemp_c,
          minTemp :      return_value.forecastday.mintemp_c,
          img :       return_value.forecastday.condition.icon,
          img_text:   return_value.forecastday.condition.text,
          last_update:return_value.current.last_updated
      }
  },
  