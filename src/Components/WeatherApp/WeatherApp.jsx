import React, { useState } from 'react';
import "./WeatherApp.css";

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';



const WeatherApp =  () => {

    let api_key ="8c544c39e0a8b65ee0c812c274bea91a";

    const [wicon,setWicon] = useState(cloud_icon);

    const search = async () => {
        const element =document.getElementsByClassName("cityInput")
        // element is area of search function. If it's empty function will return 0 //

        if(element[0].value==="")
        {
            return 0;
        }

        // first $ is city name and second $ is api key shown above

        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${api_key}`;

        // await needed for async function above
        // fetching data from url
        // converting it to json to use 

        let response = await fetch(url);
        let data = await response.json();

        // creating variables from my element class names in html


        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        // using new vaiables created here
        // pulling data from API document under response section example: data.title.numberimlookingfor

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temperature[0].innerHTML = data.main.temp+ " °F";
        location[0].innerHTML = data.name;

        // weather key has brackets around data meaning [0] must be used to get icon data

        // NOTE: STOPPED AT 35.50 IN VIDEO https://www.youtube.com/watch?v=7JqdjWB88Kk&t=645s

        // ICONS LIST: https://openweathermap.org/weather-conditions

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon)
        }

    }


    return(
        <div className="container">

            <div className="top-bar">

                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() =>{search()}}>

                <img src={search_icon} alt="" /></div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp