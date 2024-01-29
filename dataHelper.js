let weather_api = {
    apikey : "0f9bce7e09204105842165055242401",
    api_key :"c1fa599bff55488eb02211050242501",
    getCurrentWeather: async function (city) {
      //http://api.weatherapi.com/v1/current.json?key=0f9bce7e09204105842165055242401&q=istanbul&aqi=yes
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.apikey}&q=${city}&aqi=yes`,requestOptions)
        .then((response) => response.text());
        result = JSON.parse(result);
        return result;
      } catch (error) {
        console.log("error: ", error);
        return error;
      }
    },
    getForcastDataWeather: async function (city, days, aqi = "yes", alerts = "yes") {
      //http://api.weatherapi.com/v1/forecast.json?key=0f9bce7e09204105842165055242401&q=istanbul&days=1&aqi=yes&alerts=yes
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      try {
        let result = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${this.apikey}&q=${city}&days=${days}&aqi=${aqi}&alerts=${alerts}`,
          requestOptions
        ).then((response) => response.text());
        result = JSON.parse(result);
        return result;
      } catch (error) {
        console.log("error: ", error);
        return error;
      }
    },
    getFutureWeather: async function (city,days){
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      try {
        let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.api_key}&q=${city}&days=${days}&aqi=yes&alerts=yes`, requestOptions)

       
        .then(response => response.text());
        result=JSON.parse(result);
        return result;
      } catch (error) {
        console.log("error", error);
        return error;
      }
      
    },
    dtoFunctions: {
      getCurrentWeather: async function(city){
          let return_value = await weather_api.getCurrentWeather(city);
          let result = {
              temp :      return_value.current.temp_c,
              img :       return_value.current.condition.icon,
              img_text:   return_value.current.condition.text,
              last_update:return_value.current.last_updated
          }
          return result;
    },
    getFutureWeather: async function(city, days) {
      let return_value = await weather_api.getFutureWeather(city, days);
      let result = {
        next_date1: return_value.forecast.forecastday[0].date,
        next_date1_max_Temp: return_value.forecast.forecastday[0].day.maxtemp_c,
        next_date2: return_value.forecast.forecastday[1].date,
        next_date2_max_Temp: return_value.forecast.forecastday[1].day.maxtemp_c,
        next_date3: return_value.forecast.forecastday[2].date,
        next_date3_max_Temp: return_value.forecast.forecastday[2].day.maxtemp_c,
        next_date4: return_value.forecast.forecastday[3].date,
        next_date4_max_Temp: return_value.forecast.forecastday[3].day.maxtemp_c,
        next_date5: return_value.forecast.forecastday[4].date,
        next_date5_max_Temp: return_value.forecast.forecastday[4].day.maxtemp_c,
      }
      return result;
    }
    }
  };
  
  let openMeteo = {
    apikey: "abcskusugauydtaw7d6ta7wd57a6wd57a6w5da76wd",
    getCurrrentIstanbulWeather: async function() {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      try {
        let result = await fetch(`https://api.open-meteo.com/v1/forecast?apikey=${this.apikey}&latitude=41.0138&longitude=28.9497&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`, requestOptions)
        .then(response => response.text());
        result = JSON.parse(result);
        return result;
      } catch (error) {
        console.log("error: ", error);
        return error;
      }
    }
  };