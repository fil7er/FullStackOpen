import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;

async function Fetch()
{
    try
    {
        return axios.get(apiUrl+"/persons");
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
        return axios.post(apiUrl+"/persons", {name: postParams.name, number: postParams.number});
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
        return axios.put(apiUrl+"/persons/"+id, {name: putParams.name, number: putParams.number});
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
        return axios.delete(apiUrl+"/persons/"+id);
    }
    catch(err)
    {
        throw new Error(err.message);
    }
}

export {Fetch, Create, Update, Remove}

