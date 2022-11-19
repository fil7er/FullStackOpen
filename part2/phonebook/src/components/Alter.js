const Alter = ({handleInputUpd, handleUpd}) => {
    return (
        <>
            <p>Name: <input type="text" name="nameUpdate" onChange={handleInputUpd}/></p>
            <p>Number: <input type="text" name="numberUpdate" onChange={handleInputUpd}/></p>
            <p><input type="button" value="Update user" onClick={handleUpd}/></p>
        </>
    )
}

export {Alter}