export const  Display = ({countries}) => {
  
    try{
        if(countries.length > 10) throw new Error('Too many matches, specify another filter')

       return(
        <ul>
            {countries.map(country => {
            return (
                <li>
                {country.name.common}
                </li>
            )
          })}
        </ul>
       )
    }
    catch(e){
        return (<p>{e.message}</p>)
    }
    
}