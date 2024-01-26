// https://www.weatherapi.com/
// todo: tahmin -> ileri yönelik
// todo: favori şehir eklemek (arge).
// todo: api.weatherapi.com buradaki başka bir endpoint'i eklemek.
// todo: ilk yüklendiği zaman favori şehri gösterme
// todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
// todo: css ekleyelim... güzelleştirelim.

//http://api.weatherapi.com/v1/forecast.json?key=c1fa599bff55488eb02211050242501&q=istanbul&days=5&aqi=yes&alerts=yes
// globals
let api_key= "c1fa599bff55488eb02211050242501"
//let days=5;
// ...
let weather_api={
  getFutureWeather: async function (city,days){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      let result= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=${days}&aqi=yes&alerts=yes`, requestOptions)
      .then(response => response.text());
      result=JSON.parse(result);
      return result;
    } catch (error) {
      console.log("error", error);
      return error;
    }
    
  },

 dtoFunction: {
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

}
async function btnClick(event) {
  console.log("click");
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === '') {
    alert(`Şehir ismi yazınız`);
  }

  
    let result = await weather_api.dtoFunction.getFutureWeather(city, 5);
    generateCityFutureWeatherDom(result);
    console.log(result);
    /*let json_weather_data = response_data;
    console.log(json_weather_data);
    let data1 = json_weather_data.forecast;
    console.log(data1);
  } catch (error) {
    console.error('Error fetching future weather:', error);
  }*/
}
async function btnClickFavoryCity(event) {
  console.log("click");
  let domfavoryCity = document.getElementById("txtCity");
  let favoryCity = domfavoryCity.value;
  var cityName = document.getElementById("txtCity").value;
  console.log("Adding city to favorites:", cityName);
  if (favoryCity === '') {
    alert(`Şehir ismi yazınız`);
  }
}



function generateCityFutureWeatherDom(dtoFutureWeatherObject) {
  if (dtoFutureWeatherObject) {
    let app_div = document.getElementById("app");

    let dataFutureTemDiv1 = document.createElement("div");
    dataFutureTemDiv1.innerText = dtoFutureWeatherObject.next_date1 +" tarihinde maksimum hava sıcaklığı: "+ dtoFutureWeatherObject.next_date1_max_Temp + " derece";
    app_div.appendChild(dataFutureTemDiv1);

    let dataFutureTemDiv2 = document.createElement("div");
    dataFutureTemDiv2.innerText = dtoFutureWeatherObject.next_date2 +"tarihinde maksimum hava sıcaklığı: "+ dtoFutureWeatherObject.next_date2_max_Temp  + " derece";
    app_div.appendChild(dataFutureTemDiv2);

    let dataFutureTemDiv3 = document.createElement("div");
    dataFutureTemDiv3.innerText = dtoFutureWeatherObject.next_date3 +"tarihinde maksimum hava sıcaklığı: "+ dtoFutureWeatherObject.next_date3_max_Temp + " derece";
    app_div.appendChild(dataFutureTemDiv3);

    let dataFutureTemDiv4 = document.createElement("div");
    dataFutureTemDiv4.innerText = dtoFutureWeatherObject.next_date4 +"tarihinde maksimum hava sıcaklığı: "+ dtoFutureWeatherObject.next_date4_max_Temp + " derece";
    app_div.appendChild(dataFutureTemDiv4);

    let dataFutureTemDiv5 = document.createElement("div");
    dataFutureTemDiv5.innerText = dtoFutureWeatherObject.next_date5 +"tarihinde maksimum hava sıcaklığı: "+ dtoFutureWeatherObject.next_date5_max_Temp + " derece";
    app_div.appendChild(dataFutureTemDiv5);
  }
}

async function addFavoriteCity() {
  var cityInput = document.getElementById("cityInput");
  var cityName = cityInput.value();

  if (cityName !== "") {
    var favoriteCitiesList = document.getElementById("favoriteCitiesList");
    var listItem = document.createElement("li");
    listItem.textContent = cityName;
    favoriteCitiesList.appendChild(listItem);

    // Clear the input field
    cityInput.value = "";
  } else {
    alert("Please enter a valid city name.");
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dom loaded');
  
    let json_weather_data = await weather_api.getFutureWeather("istanbul", 5);
    let data1 = json_weather_data.forecast;
    console.log(data1);
    // Pass the result to generateCityFutureWeatherDom
});
