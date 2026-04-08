
// app.js this file is the main entry point of the application. It sets up the Express server, connects to the MongoDB database, and defines the routes for the application. It also includes error handling for 404 and other errors.
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
const reviews = require('./routes/review.js');


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


app.use('/listings', listings);
app.use('/listings/:id/reviews',reviews);


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