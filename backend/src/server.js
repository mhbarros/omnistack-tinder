const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const rotas    = require('./rotas');

mongoose.connect('mongodb+srv://mhbarros:mhbarros@cluster0-zkqfb.mongodb.net/tindev?retryWrites=true&w=majority',{useNewUrlParser:true});

const server = express();
server.use(cors());
server.use(express.json());
server.use(rotas);

server.listen(3333);
