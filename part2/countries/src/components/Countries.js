import { Display } from "./Display"
import { Filter } from "./Filter"
import { useState, useEffect } from 'react'
import { getWeather } from "../requests/Requests"

export const Countries = ({countries}) => {

    const [countryFilter, setCountryFilter] = useState([...countries])

    const handleFilter = (e) => {
        var countriesCopy = countries.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
        setCountryFilter(countriesCopy)
    }

    const handleButton = (e) => {
        var countriesCopy = countries.filter(country => country.name.common.toLowerCase().includes(e.target.getAttribute('name').toLowerCase()))
        setCountryFilter(countriesCopy)
    }

    const [weatherDetails, setWeatherDetails] = useState(undefined)

    const HandleWeatherDetails = (value) => {  
        useEffect(() => {
            getWeather(value).then((result) => {
                console.log(result)
                setWeatherDetails(result)
            })
        }, [])
    }

    return (
    <>
    <Filter handleFilter={handleFilter}/>
    <Display countries={countryFilter} handleButton={handleButton} weatherDetails={weatherDetails} handleWeatherDetails={HandleWeatherDetails}/>
    </>
    )

}