import axios from 'axios'

async function fetch() 
{
    axios({method: "get", url: "http://localhost:3001/persons"}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

async function create(postParams) 
{
    axios({method: "post", url: "http://localhost:3001/persons", params: {name: postParams.name, number: postParams.number}}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

async function update(id, putParams) 
{
    axios({method: "put", url: "http://localhost:3001/persons/"+id, params: {name: putParams.name, number: putParams.number}}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}

async function remove(id) 
{
    axios({method: "delete", url: "http://localhost:3001/persons/"+id}).then((result) => {return result.data}).catch((err) => {throw new Error(err.message)})
}