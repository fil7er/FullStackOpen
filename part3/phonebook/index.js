const { response } = require('express');
const express = require('express');
const morgan = require('morgan')

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config({ path: "./.env.local" });
const {getAll, add, get, remove} = require('./mongo.js');

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })


app.use(morgan(':method :url :status - :response-time ms :body'));

var port = process.env.PORT || 3000;

app.get('/api/persons/', (req, res) => {
    getAll().then((result) => {
        res.json(result);
    })
});

app.get('/info', (req, res) => {
    var today = new Date(Date.now());
    var response = "Phonebook has info for " + persons.length + " people<br>" + today.toDateString()
    res.send(response);
});

app.post('/api/persons', async(req, res) => {
    try
    {
        var name = req.body.name;
        var number = req.body.number;

        var result = await add(name, number);
        res.json(result);
    }
        catch(e)
    {
     
        switch(e.name)
        {
            case "ValidationError": res.status(400).json({Error: e.message}); break;
            default: res.status(500).json(e.message); break;
    }
    }
});

app.get('/api/persons/:id', async(req, res) => {
    try
    {
        var id = req.params.id;
        var result = await get(id);
        res.json(result);
    }
    catch(e)
    {
        res.status(404).json({Error: e.message});
    }
});

app.delete('/api/persons/:id', (req, res) => {
    try{
        var id = req.params.id
        if(persons.filter(person => person.id == id).length=0) 
            throw new Error("Person not Found!");
        res.status(200).end();
    }
    catch(e)
    {
        res.status(404).end();
    }
});

app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});

