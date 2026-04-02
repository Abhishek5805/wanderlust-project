const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema,reviewSchema} = require('./schema.js');
const review = require('./models/review.js');
const listings=require('./routes/listings.js');


main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://localhost:27017/wanderlust');
}
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send('Hii i am root');
});




const validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
    if(error){
        let msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,msg);
    }else{
        next();

    }
}

app.use('/listings', listings);

//review routes
//post route for reviews
app.post('/listings/:id/reviews',validateReview,wrapAsync(async(req,res)=>{
   let Listings = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);

    Listings.reviews.push(newReview);
    await newReview.save();
    await Listings.save();
    res.redirect(`/listings/${Listings._id}`);
}));



//delete route for reviews
app.delete('/listings/:id/reviews/:reviewId',wrapAsync(async(req,res)=>{
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));
// app.get('/testlisting',async(req,res)=>{
//     let sampleListing = new listing({
//         title:"Beautiful Beach House",
//         description:"A stunning beach house with breathtaking ocean views. This property features 4 bedrooms, 3 bathrooms, and a spacious living area perfect for entertaining. Enjoy the private pool and direct access to the beach.",
//          price:1500,
//         location:"Malibu, California",
//         country:"United States"
//     });
//     sampleListing.save();
//     console.log('Sample listing created!');
//     res.send('Sucessfull testing');
// });


// 404 handler
app.use((req, res, next) => {
    let err = new Error("Page Not Found");
    err.statusCode = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error", { message });
});

app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});