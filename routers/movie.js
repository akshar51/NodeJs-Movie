const {Router} = require('express');
const { viewAddMovie, home, viewListMovie } = require('../controllers/movie.controller');

const movieRouter = Router();

movieRouter.get('/',home)
movieRouter.get('/addMovie',viewAddMovie)
movieRouter.get('/list',viewListMovie)

module.exports = movieRouter