import axios from "axios"

export const Weather = ({countryCapitalName, weatherArray}) => {

    return (
        <>
        <h2>Weather in {countryCapitalName}</h2>
        <p>Temperature: {}</p>
        <p><img src={} /></p>
        <p>Wind: {weatherArray.wind.speed}</p>
        </>
    )
}