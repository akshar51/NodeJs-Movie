const { Router } = require("express");
const { addTrailer, createTrailer, deleteTrailer } = require("../controllers/trailer.controller");
const { thumbnail } = require("../middleware/image");



const trailer = Router()

trailer.get('/trailer',addTrailer);
trailer.post('/createTrailer',thumbnail,createTrailer)
trailer.get('/deleteTrailer/:id',deleteTrailer)


module.exports = trailer