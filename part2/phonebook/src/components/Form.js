import {Input} from './Input'

const Form = ({handleSubmit, inputList}) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputList.map(input => {
                <Input labelName={input.labelName} handleFunctionName={input.handleFunctionName}/>
            })}
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    )
}

export default Form