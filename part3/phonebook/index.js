const { response } = require('express');
const express = require('express');
const app = express();

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    var today = new Date(Date.now());
    var response = "Phonebook has info for " + persons.length + " people<br>" + today.toDateString()
    res.send(response);
});

app.post('/api/persons', (req, res) => {
    var name = req.body.name;
    var number = req.body.number;
    if(name === undefined || number === undefined){throw new Error("Parameter missing!"); }
    persons.filter(person => {
        if(person.name === name){throw new Error("Name must Unique!"); }
    });

    res.send(persons[id]);
});

app.get('/api/persons/:id', (req, res) => {
    try{
        var id = req.params.id
        if(!persons.filter(person => person.id === id).length>0) { console.log("ss"); throw new Error("Person not Found!");}
        res.json(persons[id]);
    }
    catch(e)
    {
        res.status(404).end()
    }
});

app.delete('/api/persons/:id', (req, res) => {
    var id = req.params.id
    if(!persons.filter(person => person.id === id).length>0) { console.log("ss"); throw new Error("Person not Found!");}

    res.send(persons[id]);
});

app.listen(3000, () => {
    console.log('Example app listening on port port!');
});

