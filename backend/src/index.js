const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
/**
 * rotas
 * recursos 
 */

 /**
  * GET: buscar informação do backend
  * POST: criar uma informção no backend
  * PUT: alterar um inforção
  * DELETAR: deletar uma informção
  */

  /**
   * Tipos de parametros
   * 
   * Query:nomeados apos o ?(filtragem, paginação)
   * Route: indentificar recursos 
   * Request Body: Corpo da requisição para alterar ou criar
   */