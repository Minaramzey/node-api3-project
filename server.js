const express = require('express');
const helmet = require("helmet");

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const { logger } = require('./middleware/middleware');
const server = express();





server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(express.json());
server.use(helmet());
server.use(logger);
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

// function logger(req, res, next) {}---- in middleware file 

module.exports = server;
