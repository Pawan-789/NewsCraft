import React, { useEffect, useState } from 'react'
import "./Weather.css"
import axios from 'axios'
const Weather = () => {
  const apiKey1 =import.meta.env.VITE_API_KEY1
  const [data,setData] = useState({})
  const [location,setLocation] =useState('')

  useEffect(()=>{
    const fetchDefaultLocation = async()=>{
      const defaultLocation ='New Delhi'
      
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${apiKey1}`
      
      const response= await axios.get(url)
      setData(response.data)
      
    }
    fetchDefaultLocation()
  },[])

  const search =async()=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apiKey1}`

   //for ensuring response in both successful or unsuccessful output 
    try{
      const response= await axios.get(url)
      if(response.data.cod !==200){
        setData({notFound : true})
      } else{
        setData(response.data)
        setLocation('') //this line is made so that after every search the search area becomes vacant

      }
    }catch(error){
      if(error.response && error.response.status ===404){
        setData({notFound : true})
      }else{
        console.error("An unexpected error occured",error)
      }
    }
    
    console.log(data)
    
  }
  const handleInputChange = (e) =>{
    setLocation(e.target.value)
  }

  const handleKeyDown =(e)=>{
    if(e.key ==='Enter'){
      search()
    }
  }
  const getWeatherIcon=(weatherType)=>{
    switch(weatherType){
      case 'Clear':
        return <i className='bx bxs-sun'></i>
      case 'Cloud':
        return <i className='bx bxs-cloud'></i>
      case 'Rain':
        return <i className='bx bxs-cloud-rain'></i>
      case 'Thunderstorm':
        return <i className='bx bxs-cloud-lightning'></i>
      case 'Snow':
        return <i className='bx bxs-cloud-snow'></i>
      case 'Mist':
      case 'Haze':
        return <i className='bx bxs-cloud'></i>
      default:
        return <i className='bx bxs-cloud'></i>
    }
  }
  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location" >
          <input type="text" placeholder='location..' value={location} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>
      {data.notFound ? (<div className='not-found'>Not Found 😮</div>): (
        <div className="weather-data">
        {data.weather && data.weather[0] && getWeatherIcon(data.weather[0].main) }
        <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
        <div className="temp">{data.main ? `${Number(data.main.temp.toFixed(0))}°` : null}</div>
        </div>
      )}
      
    </div>
  )
}

export default Weather
