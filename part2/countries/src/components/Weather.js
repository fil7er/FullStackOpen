import axios from "axios"

export const Weather = ({countryCapitalName, weatherArray}) => {
    console.log(weatherArray)
    return (
        <>
        <h2>Weather in {countryCapitalName}</h2>
        <p>Temperature: {weatherArray.main.temp} Celcius</p>
        <p><img  src={"http://openweathermap.org/img/wn/"+weatherArray.weather[0].icon+"@2x.png"}/></p>
        <p>Wind: {weatherArray.wind.speed} m/s</p>
        </>
    )
}