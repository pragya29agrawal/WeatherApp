import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';
import Forecast from './components/forecast';
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [dataForecast, setDataForecast] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
     

      // await fetch(`${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      // .then(res => res.json())
      // .then(resultforecast => {
      //   setDataForecast(resultforecast)
      //   console.log(resultforecast);
      // });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <div>
        <Weather weatherData={data}/>
        {/* <Forecast forecast = {dataForecast}/> */}
        </div>
      ): (
        <div></div>
      )}
      
    </div>
  );
}