const {Router} = require('express');
const { viewAddMovie, home, viewListMovie, addMovie, deleteMovie } = require('../controllers/movie.controller');
const image = require('../middleware/image');

const movieRouter = Router();

movieRouter.get('/',home)
movieRouter.get('/addMovie',viewAddMovie)
movieRouter.get('/list',viewListMovie)
movieRouter.post('/create',image,addMovie);
movieRouter.get('/delete/:id',deleteMovie)

module.exports = movieRouter