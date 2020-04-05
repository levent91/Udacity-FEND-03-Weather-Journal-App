const zip = document.getElementById("zip"); //defining vars
const feelings = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey; //my api key

let d = new Date(); // dnyamic date instance
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getWeather = async (baseURL, zip, apiKey) => {
  //async func to get weather data
  try {
    const request = await fetch(
      baseURL + "?zip=" + zip + ",us&units=metric&APPID=" + apiKey
    );
    const end = await request.json();
    const {
      main: { temp },
    } = end;
    return temp;
  } catch (error) {
    console.log(error);
  }
};
const getData = async (path, data) => {
  //get & stringify
  try {
    await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
const changeUI = async (celcius, newDate, feelings) => {
  //UI change
  date.innerText = "Today is " + newDate;
  temp.innerText = "Weather is " + celcius + " celcius degrees";
  content.innerText = "Feeling " + feelings;
};

document.getElementById("generate").addEventListener("click", () => {
  // event listener to get weather valv
  getWeather(url, zip.value, apiKey)
    .then((temp) => {
      return { date: newDate, temp, content: feelings.value };
    })
    .then((data) => {
      getData("/api/project", data);
      return data;
    })
    .then(({ temp, date, content }) => changeUI(temp, date, content))
    .catch((e) => {
      console.log("error");
    });
});
