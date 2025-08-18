const {Router} = require('express');
const { viewAddMovie, home, viewListMovie, addMovie, deleteMovie, editMovie, updateMovie, mainPage } = require('../controllers/movie.controller');
const {image} = require('../middleware/image');

const movieRouter = Router();

// Default page
movieRouter.get('/admin',home)
movieRouter.get('/',mainPage)
//Rendering pages
movieRouter.get('/addMovie',viewAddMovie)
movieRouter.get('/list',viewListMovie)

//Delete
movieRouter.get('/delete/:id',deleteMovie)

//Updating/Edit
movieRouter.get('/edit/:id',editMovie)
movieRouter.post('/update/:id',image,updateMovie)

//Create
movieRouter.post('/create',image,addMovie);

module.exports = movieRouter