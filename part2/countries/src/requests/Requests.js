import axios from "axios"

    async function getWeater(countryCapitalName)
    {
        return axios({method:"get", url: "https://api.openweathermap.org/data/2.5/weather?q="+countryCapitalName+"&appid=someValue"}).then((response) => {return response.data}).catch((err) => {return err})
    }

     async function getCountries()
    {
        return axios({method: "get", url: "https://restcountries.com/v3.1/all"}).then((response) => {return response.data}).catch((err) => {return err})
    }

    export {getWeater, getCountries}