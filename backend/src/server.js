const express  = require('express');
const cors     = require('cors');
const rotas    = require('./rotas');

require('dotenv').config();
require('./db');

const server = express();
server.use(cors());
server.use(express.json());
server.use(rotas);

server.listen(3333);
