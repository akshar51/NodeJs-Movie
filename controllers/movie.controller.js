const { default: mongoose } = require("mongoose")
const Movie = require("../models/movieSchema")
const fs = require('fs');
const path = require('path');
const Trailer = require("../models/trailerSchema");


module.exports.home = (req,res)=>{
    res.render('pages/index')
}

module.exports.mainPage = async (req,res)=>{
    try {
        let movie = await Movie.find({})
        let trailer = await Trailer.find({})
        res.render('pages/home',{movie,trailer})
    } catch (error) {
        console.log(error)
        res.render('pages/home',{movie : [],trailer : []})
    }
}

module.exports.viewAddMovie = (req,res)=>{
    res.render('pages/addMovie')
}

module.exports.viewListMovie = async (req,res)=>{
    try {
        let movie = await Movie.find({})
        res.render('pages/listMovie',{movie})
    } catch (error) {
        console.log(error)
        res.render('pages/listMovie',{movie:[]})
    }
}

module.exports.addMovie = async(req,res)=>{
    try {
        let image = req.file ? req.file.path : null;
        await Movie.create({...req.body,image})
        res.redirect(req.get('Referrer' || '/'))
    } catch (error) {
        console.log(error)
        res.redirect(req.get('Referrer' || '/'))
    }
}

module.exports.deleteMovie =async (req,res)=>{
    try {
        const { id } = req.params
        let movie = await Movie.findByIdAndDelete(id)
        fs.unlinkSync(movie.image)
        res.redirect(req.get("Referrer" || "/"))
    } catch (error) {
        console.log(error)
        res.redirect(req.get("Referrer" || "/"))
    }
}

module.exports.editMovie = async(req,res)=>{
    try {
        const {id} = req.params;
        let movie = await Movie.findById(id)
        res.render('pages/editMovie',{movie})
    } catch (error) {
        console.log(error);
        res.render('pages/editMovie',{movie:{}})
    }
}

module.exports.updateMovie = async(req,res)=>{
    try {
        const { id } = req.params
        await Movie.findByIdAndUpdate(id,req.body,{new : true})
        res.redirect('/list')
    } catch (error) {
        console.log(error);
        res.redirect('/list')
    }
}

module.exports.showMoviePage = async (req,res)=>{
    try {
        const {id} = req.params
        let movieData = await Movie.findById(id)
        res.render('pages/movie',{movieData})        
    } catch (error) {
        console.log(error)
        res.render('pages/movie',{movieData:{}})        
    }
}

