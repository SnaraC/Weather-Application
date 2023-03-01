const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const weatherforecast = document.getElementById('weather-forecast');
const currentTemp = document.getElementById('current-temp');
const btn = document.getElementById("my-btnToday")
const btnWeekly = document.getElementById("my-btnWeekly")
const weatherToday = document.querySelector("#weather-items")
const weatherDaily = document.querySelector("#daily-weather")

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const days1 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hours12Hr = hour >= 13 ? hour %12: hour
    const amorpm = hour >= 12 ? 'PM' : 'AM';
    
    time1.innerHTML = (hours12Hr < 10? '0'+ hours12Hr : hours12Hr) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${amorpm}</span>`

    date1.innerHTML = days[day] + ', ' + date + ' ' + months[month]
},1000);

function fetchWeather(city1) 
{
    apiKey = "6809a7a28f24f5d8f40203659d540629";
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='
        + city1 +'&units=imperial&appid=' + this.apiKey)
        .then((response) => response.json())
        .then(data => displayData(data))
        .catch(err => alert("Please enter valid city name!"));    
}

function displayData(data)
{
    const {name, dt, timezone} = data;
    const {icon, description} = data.weather[0];
    const {sunrise, sunset} = data.sys;
    const {temp, humidity, temp_max, temp_min, pressure} = data.main;
    const {speed} = data.wind;
    
    console.log(dt, timezone, name, icon, description, sunrise, sunset, temp, humidity, speed)
    console.log(data)

    // const dateTime = moment.unix(dt).utc().add(timezone, 's');
    // console.log(dateTime);
    // var date = new Date(dateTime);
    // var hour = date.getHours();
    // var minutes = date.getMinutes();
    // var day = date.getDay();
    // var month = date.getMonth();

    // var hours12Hr = hour >= 13 ? hour %12: hour
    // var amorpm = hour >= 12 ? 'PM' : 'AM';

    // console.log(hour, minutes, day, month)

    // time1.innerHTML = (hours12Hr < 10? '0'+ hours12Hr : hours12Hr) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${amorpm}</span>`

    // date1.innerHTML = days[day] + ', ' + date + ' ' + months[month]

    document.querySelector(".city").innerHTML = name;
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?4K"+ description + "')";
    document.querySelector(".weather-items").innerHTML = 
    `
    <h2>Today's highlights</h2>  
            <div class="weather-today-highlights">
                <h4>Humidity</h4>
                <p>${humidity} % </p>
            </div>     
            <div class="weather-today-highlights">
                <h4>Wind speed</h4>
                <p>${speed} mph</p>
            </div>  
            <div class="weather-today-highlights">
                <h4>Temp Max</h4>
                <p style="margin-top: 10px;">${Math.ceil(temp_max)}&#176 F</p>
                <h4>Temp Min</h4>
                <p style="margin-top: 10px;">${Math.ceil(temp_min)}&#176 F</p>
            </div>  
            <div class="weather-today-highlights">
                <h4>Sunrise</h4>
                <p>${window.moment(sunrise * 1000).format('HH:mm a')}</p>
            </div>  
            <div class="weather-today-highlights">
                <h4>Sunset</h4>
                <p>${window.moment(sunset * 1000).format('HH:mm a')} </p>
            </div>  
            <div class="weather-today-highlights">
                <h4>Pressure</h4>
                <p>${(pressure * 0.02953).toFixed(2)} in </p>
            </div> 
    `

    document.getElementById("weather-current-icon").innerHTML = Math.ceil(temp) + "&#176 F";
    document.getElementById("weather-current-icon1").innerHTML = description;
    document.getElementById("w-icon-current").src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
}

document.querySelector(".search button").addEventListener("click", function(){
    fetchWeather(document.querySelector(".search-bar").value);
    fetchWeather5days(document.querySelector(".search-bar").value);
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key === "Enter")
    {
        fetchWeather(document.querySelector(".search-bar").value);
        fetchWeather5days(document.querySelector(".search-bar").value);
    }
});
        btn.addEventListener("click", function(){
            console.log("Hello1")
            weatherDaily.style.display = "none";
            weatherToday.style.display = "flex";
        })
        btnWeekly.addEventListener("click", function(){
            console.log("Hello")
            weatherToday.style.display = "none";
            weatherDaily.style.display = "flex";
        })
function fetchWeather5days(city1) 
{
    apiKey = "6809a7a28f24f5d8f40203659d540629";
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q='
        + city1 +'&exclude&units=imperial&appid=' + this.apiKey)
        .then((response) => response.json())
        .then(data => displayData1(data))
        .catch(err => alert("Please enter valid city name!"));
}

function displayData1(data)
{
    let futureForecast = ''
    let dateTemp = ''
    let dateTemp1 = ''
    console.log(data)
    for(let j = 1; j < 40; j++)
    {
        const {dt} = data.list[j]
        const {temp, temp_kf} = data.list[j].main;
        const {icon} = data.list[j].weather[0];
        dateTemp = new Date(dt * 1000).getDay()
        if(dateTemp != dateTemp1)
        {
            dateTemp1 = dateTemp;
            futureForecast += `<div class="weather-forecast-item">
            <div class="day">`+ days1[dateTemp].toLocaleString('en-US', {weekday: 'short'}) + `</div>
            <img src="http://openweathermap.org/img/wn/`+icon+`.png" alt="weather-icon" class="w-icon">
            <div class="temp">`+ Math.ceil(temp) +`&#176 F</div>
            </div>`
        }
    }
    weatherforecast.innerHTML = futureForecast;
}
