import axios from "axios"

    function getWeater(countryCapitalName)
    {
        return axios({method:"get", url: "https://api.openweathermap.org/data/2.5/weather?q="+countryCapitalName+"&appid=88f0c0e511ebaf0ad4ddcf0a7e9b73e6"}).then((response) => {return response.data}).catch((err) => {return err})
    }

     async function getCountries()
    {
        return axios({method: "get", url: "https://restcountries.com/v3.1/all"}).then((response) => {return response.data}).catch((err) => {return err})
    }

    export {getWeater, getCountries}