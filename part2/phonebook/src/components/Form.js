import { Input } from './Input'

export const Form = ({handleSubmit, inputList, handleInputs}) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputList.map(input => {
                return(
                  <p key={inputList.id}>
                  <Input labelName={input.labelName} handleInputs={handleInputs}/>
                  </p>
                )
            })}
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    )
}

export default Form