// https://www.weatherapi.com/
// todo: tahmin -> ileri yönelik
// todo: favori şehir eklemek (ar-ge).
// todo: api.weatherapi.com buradaki başka bir endpoint'i eklemek.
// todo: ilk yüklendiği zaman favori şehri gösterme
// todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
// todo: css ekleyelim... güzelleştirelim.

//http://api.weatherapi.com/v1/forecast.json?key=c1fa599bff55488eb02211050242501&q=istanbul&days=5&aqi=yes&alerts=yes
// globals
let api_key= "c1fa599bff55488eb02211050242501"
let forecastLength = -1;

//let days=5;
// ...
//currentWeather: http://api.weatherapi.com/v1/current.json?key=c1fa599bff55488eb02211050242501&q=istanbul&aqi=no

let weather_api={
  getCurrentWeather: async function (city) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        let result = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no\n`, requestOptions)
            .then(response => response.text());
        result = JSON.parse(result);
        return result;
    } catch (error) {
        console.log("error", error);
        return error;
    }
},
//http://api.weatherapi.com/v1/forecast.json?key=c1fa599bff55488eb02211050242501&q=istanbul&days=1&aqi=yes&alerts=yes

getForecastWeather: async function (city,days) {
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  try {
      let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&${days}=1&aqi=yes&alerts=yes`, requestOptions)
          .then(response => response.text());
      result = JSON.parse(result);
      return result;
  } catch (error) {
      console.log("error", error);
      return error;
  }
},

  getFutureWeather: async function (city,days){
    days = (days <= 0) ? 14 : days; 
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    try {
      let result= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=${days}&aqi=yes&alerts=yes`, requestOptions)
      .then(response => response.text());
      result = JSON.parse(result);
      return result;
    } catch (error) {
      console.log("error", error);
      return error;
    }
    
  },

 dtoFunction: {
  getCurrentWeather: async function(city){
    let return_value = await weather_api.getCurrentWeather(city);
    let result={
      temp: return_value.current.temp_c,
      img: return_value.current.condition.icon,
      img_text: return_value.current.condition.text,
      last_update:return_value.current.last_updated
    }
return result;

  },
  getFutureWeather: async function(city, days) {
    let return_value = await weather_api.getFutureWeather(city, days);
    let forecastDataArr = return_value.forecast.forecastday;
    let resultArr = [];
    for (let i = 0; i < forecastDataArr.length; i++) {
      let tmp_data = {
        next_date : forecastDataArr[i].date,
        next_date_max_Temp : forecastDataArr[i].day.maxtemp_c
      }
      resultArr.push(tmp_data);
    }
    return resultArr;


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

    let result = await weather_api.dtoFunction.getFutureWeather(city, forecastLength);
    generateCityFutureWeatherDom(result);
    console.log(result);
    let result_current = await weather_api.dtoFunction.getCurrentWeather(city);
    generateCityDom(result_current);
    console.log(result_current);


    //Giriş alanını temizle
    result.value = " ";
    result_current=" ";

 // Çerez ayarı
 util.cookie.deleteCookie('result');
 util.cookie.deleteCookie('result_current');

    //console.log(result);
    /*let json_weather_data = response_data;
    console.log(json_weather_data);
    let data1 = json_weather_data.forecast;
    console.log(data1);
  } catch (error) {
    console.error('Error fetching future weather:', error);
  }*/
}
function generateCityDom(dtoCurrentWeatherObject){
  let appDiv = document.getElementById('generateData');
  appDiv.innerHTML = ''; // Mevcut içeriği temizle

  let dataTempDiv = document.createElement("div");
      dataTempDiv.innerText= dtoCurrentWeatherObject.temp+ " derece";
  appDiv.appendChild(dataTempDiv);
  let datalast_updateDiv = document.createElement("div");
      datalast_updateDiv.innerText= dtoCurrentWeatherObject.last_update;
  appDiv.appendChild(datalast_updateDiv);
  
  let dataImg = document.createElement("img");
      dataImg.src= dtoCurrentWeatherObject.img;
  appDiv.appendChild(dataImg);

  let dataImg_TextDiv = document.createElement("div");
  dataImg_TextDiv.innerText= dtoCurrentWeatherObject.img_text;
appDiv.appendChild(dataImg_TextDiv);




}

async function btnClickFavoryCity(event) {
  let domFavoriteCity = document.getElementById("txtCity");
  let cityName = domFavoriteCity.value;
  let favoriteCitiesList = document.getElementById('favoriteCitiesList');

  console.log("Adding city to favorites:", cityName);

  if (cityName !== "") {
    util.cookie.deleteCookie('favoriteCity', cityName);

    // Yeni bir div öğesi oluşturun
    let newCityElement = document.createElement("div");
    newCityElement.textContent = cityName;

    // Oluşturulan div'i favori şehirler listesine ekleyin
    favoriteCitiesList.appendChild(newCityElement);

    // Çerez ayarı
    util.cookie.setCookie('favoriteCity', cityName);
    
    

    // Giriş alanını temizle
    domFavoriteCity.value = "";
  } else {
    alert("Please enter a valid city name.");
  }
}


function generateCityFutureWeatherDom(dtoFutureWeatherObject) {
  
  if (dtoFutureWeatherObject) {
    let app_div = document.getElementById("FutureData");
    app_div.innerHTML = ''; 

    let tmp_Header_div = document.createElement("h3");
      tmp_Header_div.innerText="Gelecek Hava Tahmini";
      app_div.appendChild(tmp_Header_div);
    

    for (let i = 0; i < dtoFutureWeatherObject.length; i++) {
      const item = dtoFutureWeatherObject[i];

      

      let tmp_div = document.createElement("div");
      tmp_div.innerText = `${item.next_date} tarihinde maksimum hava sıcaklığı: ${item.next_date_max_Temp} derece`;
      app_div.appendChild(tmp_div);
      
    }
    
  }

}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dom loaded');
  
    // let json_weather_data = await weather_api.getFutureWeather("istanbul", 5);
    // let data1 = json_weather_data.forecast;
    // console.log(data1);
    // Pass the result to generateCityFutureWeatherDom


    myfavoriteCity = util.cookie.deleteCookie('favoriteCity');
    //let json_weather_data = await weather_api.getFutureWeather(myfavoriteCity, 5);
    // let json_weather_data = await weather_api.dtoFunction.getFutureWeather(myfavoriteCity, forecastLength);
    // generateCityFutureWeatherDom(json_weather_data)
    // console.log(json_weather_data);
    let response_data = await weather_api.dtoFunction.getCurrentWeather("istanbul");

    console.log(response_data);

    //let paramCity = util.queryString.getParam('city');
    //console.log(paramCity);

    //let json_weather_data = await weather_api.getFutureWeather(paramCity, forecastLength);
    //generateCityFutureWeatherDom(json_weather_data)


});
