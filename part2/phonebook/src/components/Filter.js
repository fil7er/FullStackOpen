export const Filter = ({handleFilter}) => {
    return (
        <p>
        Filter shown with <input name="filter" onChange={handleFilter}/>
        </p>
    )
}