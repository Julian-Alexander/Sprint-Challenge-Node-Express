const express = require('express');
const projectModel = require('./data/helpers/projectModel.js');
const actionModel = require('./data/helpers/actionModel.js');
const mappers = require('./data/helpers/mappers.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API IS WORKING')
})

server.get('/projects', (req, res) => {
    projectModel
        .get()
        .then(response => res.status(200).send(response))
        .catch(() => res.status(500).send({ error: 'Error fetching projects'}))
})

server.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    projectModel
        .get(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).send({ error: "Error fetching project" }))
})

server.post('/projects', (req, res) => {
    const userInput = req.body;    
    projectModel
        .insert(userInput)
        .then(response => res.status(201).send(response))
        .catch((err) => res.status(500).send({ error: 'Error fetching projects', err}))
})

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    projectModel
        .update(id, update)
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).json(err))
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    let project;    
    projectModel
        .get(id)
        .then(foundProject => {
            project = { ...foundProject[0] };
            projectModel
            .remove(id)
            .then(response => res.status(200).json(response))
        })
        .catch((err) => res.status(500).send({ err: 'Error deleting proj', err }))
})

server.get(`/projects/:id/actions`, (req, res) => { 
    const { id } = req.params;
    projectModel
        .getProjectActions(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).send({ error: "Error fetching actions" }))
})

server.get('/actions', (req, res) => {
    actionModel
        .get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).send({ error: "Error fetching actions" }))
})

server.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    actionModel
        .get(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).send({ error: "Error fetching actions" }))
})

server.post('/actions', (req, res) => {
    const userInput = req.body;
    actionModel
        .insert(userInput)
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).send({ error: "Error posting actions" }))
})

server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    actionModel
        .update(id, update)
        .then(response => res.status(201).send(response))
        .catch(err => res.status(500).json(err))
})

server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    let action;    
    actionModel
        .get(id)
        .then(foundAction => {
            action = { ...foundAction[0] };
            actionModel
            .remove(id)
            .then(response => res.status(200).json(response))
        })
        .catch((err) => res.status(500).send({ err: 'Error deleting action', err }))
})

server.listen(7777, () => console.log (`\n Running on Port 7777 \n`));