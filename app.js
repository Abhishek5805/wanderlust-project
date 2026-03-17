const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');


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

app.get('/listings',wrapAsync(async(req,res)=>{
   const allListings = await listing.find({});
   res.render("listings/index",{allListings});
}));

//new route

app.get('/listings/new',(req,res)=>{
    res.render('listings/new');
}); 

//show route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/show",{ Listing });
}));

//create route
app.post('/listings',wrapAsync(async(req,res,next)=>{
        if(!req.body.listing)
        {
             throw new ExpressError('Invalid listing data',400);
        }
    const newList = new listing(req.body.listing);
    await newList.save();
   res.redirect("/listings");
    
}));


//edit route
app.get('/listings/:id/edit',wrapAsync(async(req,res)=>{
   
     let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit",{ Listing });
}));

//update route
app.put('/listings/:id',wrapAsync(async(req,res)=>{
    let { id } = req.params;
    const updatedListing = await listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    res.redirect(`/listings/${updatedListing._id}`);
}));

//delete route
app.delete('/listings/:id',wrapAsync(async(req,res)=>{
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
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