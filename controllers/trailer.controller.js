const { thumbnail } = require("../middleware/image");
const Trailer = require("../models/trailerSchema")
const fs = require('fs');

module.exports.addTrailer = async (req,res)=>{
    try {
        let trailer = await Trailer.find({})
        res.render('pages/addTrailers',{trailer})
    } catch (error) {
        console.log(error)
        res.render('pages/addTrailers',{trailer : []})
    }
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

module.exports.deleteTrailer = async(req,res)=>{
    try {
        let {id} = req.params
        let trailer = await Trailer.findByIdAndDelete(id)

        if (trailer && trailer.thumbnail) {
            try {
                fs.unlinkSync(trailer.thumbnail);
            } catch (err) {
                console.log("File already deleted or not found:", err.message);
            }
        }
        
        res.redirect("/trailer")        
    } catch (error) {
        console.log(error);
        res.redirect("/trailer")    
    }
}



