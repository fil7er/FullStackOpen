import { Display } from "./Display"
import { Filter } from "./Filter"
import { useState } from 'react'

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

    return (
    <>
    <Filter handleFilter={handleFilter}/>
    <Display countries={countryFilter} handleButton={handleButton}/>
    </>
    )

}