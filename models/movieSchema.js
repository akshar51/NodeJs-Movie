const { default: mongoose } = require("mongoose");

const movieSchema = mongoose.Schema({
    image : {
        type : String,
    },
    m_name : {
        type : String,
        required : true,
    },
    m_time : {
        type : String,
        required : true,
    },
    m_date : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    age : {
        type : String,
        required : true,
    },
    language : {
        type : Array,
        required : true,
    }


},{
    timestamps : true,
})

const Movie = mongoose.model('movie',movieSchema);

module.exports = Movie