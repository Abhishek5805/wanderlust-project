const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const review = require('./review.js');

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,

    image:{
        url:{
            type:String,
            default:"https://img.freepik.com/free-photo/beautiful-lake-mountains_395237-44.jpg?semt=ais_rp_50_assets&w=740&q=80"
        },
        filename:String
    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]

});

//mongoose middleware to delete associated reviews when a listing is deleted
listingSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await mongoose.model('Review').deleteMany({ _id: { $in: doc.reviews } });
    }  
}); 

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;