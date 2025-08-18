const { thumbnail } = require("../middleware/image");
const Trailer = require("../models/trailerSchema")

module.exports.addTrailer = (req,res)=>{
    res.render("pages/addTrailers")
}

module.exports.createTrailer = async (req,res)=>{
    try {
        let thumbnail = req.file ? req.file.path : null;
        let trailer = await Trailer.create({...req.body,thumbnail})
        res.redirect(req.get('Referrer' || '/'))
    } catch (error) {
        console.log(error)
        res.redirect(req.get('Referrer' || '/'))
    }
}