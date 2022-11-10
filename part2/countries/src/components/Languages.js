export const Languages = ({languages}) => {

    var rows = [];

    for (const [key, value] of Object.entries(languages)) 
    {
        rows.push(value)
    }

    return (
        <ul>
            {rows.map(row => {
                return(
                    <li>{row}</li>
                )
            })}
        </ul>
    )
}