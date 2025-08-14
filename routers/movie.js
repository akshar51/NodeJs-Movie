const {Router} = require('express');
const { viewAddMovie, home } = require('../controllers/movie.controller');

const movieRouter = Router();

movieRouter.get('/',home)
movieRouter.get('/addMovie',viewAddMovie)

module.exports = movieRouter