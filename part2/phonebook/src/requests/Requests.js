import axios from 'axios'

async function Fetch() 
{
    axios({method: "get", url: "http://localhost:3001/persons"}).then(result => {return result.data}).catch((err) => {throw new Error(err.message)}) 
}

async function Create(postParams) 
{
    axios({method: "post", url: "http://localhost:3001/persons", params: {name: postParams.name, number: postParams.number}, headers: { 'Content-Type': 'application/json; charset=UTF-8' }}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

async function Update(id, putParams) 
{
    axios({method: "put", url: "http://localhost:3001/persons/"+id, params: {name: putParams.name, number: putParams.number}}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

async function Remove(id) 
{
    axios({method: "delete", url: "http://localhost:3001/persons/"+id}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

export {Fetch, Create, Update, Remove}

