const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");

const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");

const datahide = document.querySelector(".middle_layer");
let curday = document.getElementById("day");
// console.log(curday);

const today_data = document.getElementById("today_data");

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let currentTime = new Date();
let din = weekday[currentTime.getDay()];
// console.log(weekday[currentTime.getDay()]);
curday.innerHTML = din;

const getCurrentTime = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  var now = new Date();
  var month = months[now.getMonth()];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
    periods = "PM";
    if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};

today_data.innerHTML = getCurrentTime();

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  let n = 0;

  if (cityVal === "") {
    city_name.innerText = `Plz write the name before search`;
    datahide.classList.remove("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal},IN&units=metric&appid=8519292be6b8834b75032ce921738088`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      console.log(arrData);

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real_val.innerText = arrData[0].main.temp;
      // temp_status.innerText = arrData[0].weather[0].main;

      const tempMood = arrData[0].weather[0].main;
      n = 1;

      datahide.classList.remove("data_hide");
      // condition to check sunny or cloudy
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      }
    } catch (error) {
      if (!n) {
        city_name.innerText = `Plz enter the city name properly`;
        datahide.classList.add("data_hide");
      }
    }
  }
};

submitBtn.addEventListener("click", getInfo);
