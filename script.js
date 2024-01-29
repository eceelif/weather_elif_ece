//https://www.weatherapi.com/
//todo: tahmin -> ileri yönelik
//todo: favori şehir eklemek (arge).
//todo: api.weatherapi.com burdaki başka bir endpoint i eklemek.
//todo: ilk yüklendiği zaman favori şehri gösterme
//todo: ilk yüklendiği zaman querystringden ilgili şehri gösterme -> http://localhost:5500/?city=istanbul
//todo: css ekleyelim... güzelleştirelim.
//todo: open-meteo apisinden veri çekip başka bir div de gösterelim.

//globals
let derece_dom;
let lastUpdate_dom;
let img_dom;
let imgText_dom;

async function btnClick(event) {
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;

  if (city === "") {
    alert("Boş şehir ismi girilemez");
    return;
  }

  try {
    let currentWeather = await weather_api.dtoFunctions.getCurrentWeather(city);
    let futureWeather = await weather_api.dtoFunctions.getFutureWeather(city, 5);

    let result = {
      currentWeather: currentWeather,
      futureWeather: futureWeather
    };

    generateCityFutureWeatherDom(result);
    console.log(result);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


async function btnClickFavoryCity(event) {
  let domTxtCity = document.getElementById("txtCity");
  let city = domTxtCity.value;
  if (city === '') {
    alert(`Şehir ismi yazınız`);
  }

  
    
}

/*function third_way(dtoCurrentWeatherObject) {
  //put data in dom
  derece_dom.innerText = dtoCurrentWeatherObject.temp + " derece";
  lastUpdate_dom.innerText =
    "Son Güncelleme : " + dtoCurrentWeatherObject.last_update;
  img_dom.src = dtoCurrentWeatherObject.img;
  imgText_dom.innerText = dtoCurrentWeatherObject.img_text;
} */

function generateHtml(dtoCurrentWeatherObject) {
  let generatedDataDiv = document.getElementById("generatedData");
  generatedDataDiv.innerHTML = "";

  let derece_text = dtoCurrentWeatherObject.temp + " derece";
  let last_update = "Son Güncelleme : " + dtoCurrentWeatherObject.last_update;
  let temp = `
    <div>${derece_text}</div>
    <div>${last_update}</div>
    <img src="${dtoCurrentWeatherObject.img}"/>
    <div>${dtoCurrentWeatherObject.img_text}</div>`;

  generatedDataDiv.innerHTML = temp;
}

function generateCityDom(dtoCurrentWeatherObject) {
  //clear dom....
  let generatedDataDiv = document.getElementById("generatedData");
  generatedDataDiv.innerHTML = "";

  //put data in dom
  let dataTempDiv = document.createElement("div");
  dataTempDiv.innerText = dtoCurrentWeatherObject.temp + " derece";
  generatedDataDiv.appendChild(dataTempDiv);

  let dataLastUpdateDiv = document.createElement("div");
  dataLastUpdateDiv.innerText =
    "Son Güncelleme : " + dtoCurrentWeatherObject.last_update;
  generatedDataDiv.appendChild(dataLastUpdateDiv);

  let dataImg = document.createElement("img");
  dataImg.src = dtoCurrentWeatherObject.img;
  dataImg.addEventListener("click", () => {
    console.log("img clicked");
  });
  generatedDataDiv.appendChild(dataImg);

  let dataImgTextDiv = document.createElement("div");
  dataImgTextDiv.innerText = dtoCurrentWeatherObject.img_text;
  generatedDataDiv.appendChild(dataImgTextDiv);
}
function generateCityFutureWeatherDom(dtoFutureWeatherObject) {
  if (dtoFutureWeatherObject) {
    let app_div = document.getElementById("app");
    app_div.innerHTML = ""; // Clear previous content

    for (let i = 1; i <= 5; i++) {
      let dateKey = `next_date${i}`;
      let maxTempKey = `next_date${i}_max_temp`;

      let dataFutureTemDiv = document.createElement("div");
      dataFutureTemDiv.innerText = `${dtoFutureWeatherObject[dateKey]} tarihinde maksimum hava sıcaklığı: ${dtoFutureWeatherObject[maxTempKey]} derece`;
      app_div.appendChild(dataFutureTemDiv);
    }
  }
}


// function loadDataHelper(){
//   if(typeof weather_api === 'undefined'){
//     loadJS('dataHelper.js');
//   }
// }

document.addEventListener("DOMContentLoaded", async function () {
  console.log("Dom loaded");

  derece_dom = document.getElementById("derece");
  lastUpdate_dom = document.getElementById("lastUpdate");
  img_dom = document.getElementById("img");
  imgText_dom = document.getElementById("imgText");

  let json_weather_data = await weather_api.dtoFunctions.getFutureWeather("istanbul", 5);
  let data1 = json_weather_data.forecast;
  console.log(data1);
  // let responseData = await openMeteo.getCurrrentIstanbulWeather();
  // console.log(responseData);

  // weather_api.uzunluk => 10
  //  let response_data = await weather_api.getForcastDataWeather("maltepe",3);
  //  let json_weather_data = JSON.parse(response_data);
  //  console.log(json_weather_data);
});
