const { default: mongoose } = require("mongoose")

const db = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://aksharparekh401:12345@cluster0.ncwztql.mongodb.net/movie')
        console.log("Database Connected ...")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = db