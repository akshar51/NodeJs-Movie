const { default: mongoose } = require("mongoose");

const trailerSchema = mongoose.Schema({
   title : {
    type : String,
    required : true,
   },
   description : {
    type : String,
    required : true,
   },
   youtubeUrl : {
    type : String,
    required : true,
   },
   thumbnail : {
    type : String,
   }

},{
    timestamps : true,
})

const Trailer = mongoose.model('trailer',trailerSchema);

module.exports = Trailer