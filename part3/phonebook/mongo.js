const mongoose = require('mongoose')

const password = process.env.MONGO_PASSWORD
const username = process.env.MONGO_USERNAME
const mongourl = process.env.MONGO_URL
const url = `mongodb+srv://${username}:${password}@${mongourl}/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Contact name is required"], unique: true},
    number: {type: String, required: [true, "Contact number is required"], minlength: 8, format: /[0-9]/}
})

const Persons = mongoose.model('Persons', personSchema)

const connect = async() => {return mongoose.connect(url, { useUnifiedTopology: true })}
    


const getAll = async() => {
    try
    {
        var db = await connect();
        var result = await Persons.find({});
        return result;
        
    }
    catch(e)
    {
        throw e;
    }
    finally
    {
        mongoose.connection.close();
    }
}

const get = async(id) => {
    try
    {
        var db = await connect();
        var result = await Persons.findOne({_id: id});
        return result;
    }
    catch(e)
    {
        throw e;
    }
    finally
    {
        mongoose.connection.close();
    }
}

const remove = async(name) => {
    try
    {
        var db = await connect();
        var result = await Persons.deleteOne({
            name: name
        });
        return result;
    }
    catch(e)
    {
        throw e;
    }
    finally
    {
        mongoose.connection.close();
    }
}

const add = async(name, number) => {
    try
    {
        var db = await connect();
        var person = new Persons({name: name, number: number});
        var result = await person.save();
        return result;
    }
    catch(e)
    {
        throw e;
    }
    finally
    {
        mongoose.connection.close();
    }
}

module.exports = { getAll, add, get, remove }
