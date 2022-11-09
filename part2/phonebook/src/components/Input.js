export const Input = ({labelName, handleInputs, idData}) => {
    return (
        <>
        {labelName}: <input name={labelName} data-id={idData} onChange={handleInputs} />
        </>
    )
}

export default Input