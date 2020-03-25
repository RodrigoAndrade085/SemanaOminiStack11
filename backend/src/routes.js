const crypto = require('crypto');
const express = require('express');

const OngsControllers = require('./controllers/OngsControllers');
const IncidentsControllers = require('./controllers/IncidentControlers');
const ProfileControllers = require('./controllers/ProfileControlers');
const SessionControlers = require('./controllers/SessionControlers');

const conection = require('./database/connection');

const routes = express.Router();
//listar ONGS
routes.get('/ongs', OngsControllers.index);
//cadastrar ONG
routes.post('/ongs', OngsControllers.create);

//routes.get('/profile', ProfileControllers.index);

routes.post('/session', SessionControlers.create);

//listar Casos
routes.get('/incidents', IncidentsControllers.index);
//cadastrar Casos
routes.post('/incidents', IncidentsControllers.create);
//deletar Caso
routes.delete('/incidents/:id', IncidentsControllers.delete);


module.exports = routes;