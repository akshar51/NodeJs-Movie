module.exports.home = (req,res)=>{
    res.render('pages/index')
}

module.exports.viewAddMovie = (req,res)=>{
    res.render('pages/addMovie')
}

module.exports.viewListMovie = (req,res)=>{
    res.render('pages/listMovie')
}