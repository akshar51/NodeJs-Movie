const { Router } = require("express");
const { addTrailer, createTrailer } = require("../controllers/trailer.controller");
const { thumbnail } = require("../middleware/image");



const trailer = Router()

trailer.get('/trailer',addTrailer);
trailer.post('/createTrailer',thumbnail,createTrailer)


module.exports = trailer