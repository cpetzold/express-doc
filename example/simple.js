var express = require('express')
  , doc = require('../');
  
var server = express.createServer();

server.get('/doc', doc);