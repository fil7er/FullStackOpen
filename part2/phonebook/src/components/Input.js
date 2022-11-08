const Input = ({labelName, handleFunctionName}) => {
    return (
        <>
        {labelName}: <input onChange={handleFunctionName} />
        </>
    )
}

export default Input