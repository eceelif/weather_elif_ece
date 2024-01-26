// https://www.weatherapi.com/
// todo: tahmin -> ileri yönelik
// todo: favori şehir eklemek (arge).
// todo: api.weatherapi.com buradaki başka bir endpoint'i eklemek.
// todo: ilk yüklendiği zaman favori şehri gösterme
// todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
// todo: css ekleyelim... güzelleştirelim.



// globals
let api_key= "c1fa599bff55488eb02211050242501"
let days=5;
// ...

let weather_api = {

  getFutureWeather: async function (city) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    try {
      let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c1fa599bff55488eb02211050242501&q=${city}&${days}=5&aqi=yes&alerts=yes`, requestOptions)
        .then(response => response.text());

      result = JSON.parse(result);
      
      let weatherDataArray = result.forecast.forecastday.map(day => {
        return {
          date: day.date,
          max_temp: day.day.maxtemp_c,
          min_temp: day.day.mintemp_c,
        };
      });

      return weatherDataArray;
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
  },
  dtoFutureFunctions: {
    getFutureWeather: async function(city){
      try {
        let return_Value = await weather_api.getFutureWeather(city);
        console.log(return_Value);  // Log the returned data to inspect its structure
  
        return return_Value;
      } catch (error) {
        console.log("error: ", error);
        return error;
      }
    }
  } 
}
  
async function btnClick(event) {
  console.log("click");
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === '') {
    alert(`Şehir ismi yazınız`);
    return; 
  }
}


// ...

function generateCityDOM(dtoFutureWeatherObject) {
  let appDiv = document.getElementById('app');
  // Clear existing content in the appDiv
  appDiv.innerHTML = '';

  let data_date = document.createElement("div");
  data_date.innerText = dtoFutureWeatherObject.date;

  let data_futureMaxTemp = document.createElement("div");
  data_futureMaxTemp.innerText = dtoFutureWeatherObject.max_temp + " derece";

  let data_futureMinTemp = document.createElement("div");
  data_futureMinTemp.innerText = dtoFutureWeatherObject.min_temp + " derece";

  appDiv.appendChild(data_date);
  appDiv.appendChild(data_futureMaxTemp);
  appDiv.appendChild(data_futureMinTemp);
}

async function btnClick(event) {
  console.log("click");
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === '') {
    alert(`Şehir ismi yazınız`);
    return; 
  }
  let resultObject = await weather_api.dtoFutureFunctions.getFutureWeather(city);
  generateCityDOM(resultObject);
}


async function btnClick(event) {
  console.log("click");
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === '') {
    alert(`Şehir ismi yazınız`);
    return; 
  }
  let resultArray = await weather_api.dtoFutureFunctions.getFutureWeather(city);
  generateCityDOM(resultArray);
}


document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dom loaded');
  try {
    let future_response_data = await weather_api.getFutureWeather('istanbul');
    console.log(future_response_data);
  } catch (error) {
    console.error('Error fetching future weather:', error);
  }
});

