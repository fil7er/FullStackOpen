import axios from 'axios'

async function Fetch()
{
    try
    {
        return axios.get("http://localhost:3001/persons");
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

async function Create(postParams) 
{
    try
    {
        return axios.post("http://localhost:3001/persons", {name: postParams.name, number: postParams.number});
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

async function Update(id, putParams) 
{
    try
    {
        return axios.put("http://localhost:3001/persons/"+id, {name: putParams.name, number: putParams.number});
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

async function Remove(id) 
{
    try
    {
        return axios.delete("http://localhost:3001/persons/"+id);
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export {Fetch, Create, Update, Remove}

