import { Flag } from "./Flag"
import { Languages } from "./Languages"

export const  Display = ({countries, handleButton}) => {

    const findOne = () => {
        return(
            <>
                {countries.map(country => {
                return (
                    <div key={country.id}>
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area}</p>
                    <p>Languages:</p>
                    <Languages languages={country.languages}/>
                    <Flag flagObj={country.flags}/>
                    </div>
                )
              })}
            </>
           )
    }

    const findDefault = () => {
        return (
            <>
        {countries.map(country => {
        return (
            <p>
            {country.name.common} <input type="button" name={country.name.common} value="show" onClick={handleButton}/>
            </p>
        )
        })}
        </>
        )
    }
  
    try{
       
        switch (true)
        {
            case (countries.length > 10) : throw new Error('Too many matches, specify another filter');
            case (countries.length === 1) : return findOne();
            default : return findDefault();
        }
       
    }
    catch(e){
        return (<p>{e.message}</p>)
    }
    
}