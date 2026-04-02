const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');

const { listingSchema,reviewSchema} = require('../schema.js');
const listing = require('../models/listing.js');




const validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body);
    if(error){
        let msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,msg);
    }else{
        next();

    }
}


//index route
router.get('/',wrapAsync(async(req,res)=>{
   const allListings = await listing.find({});
   res.render("listings/index",{allListings});
}));

//new route

router.get('/new',(req,res)=>{
    res.render('listings/new');
}); 

//show route
router.get("/:id", wrapAsync(async (req,res)=>{
    let { id } = req.params;
    const Listing = await listing.findById(id).populate('reviews');
    res.render("listings/show",{ Listing });
}));

//create route
router.post('/',validateListing,
    wrapAsync(async(req,res,next)=>{
   

    const newList = new listing(req.body.listing);
    await newList.save();
   res.redirect("/listings");
    
}));


//edit route
router.get('/:id/edit',wrapAsync(async(req,res)=>{
   
     let { id } = req.params;
    const Listing = await listing.findById(id);
    res.render("listings/edit",{ Listing });
}));

//update route
router.put('/:id',
    validateListing,wrapAsync(async(req,res)=>{
    let { id } = req.params;
    const updatedListing = await listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    res.redirect(`/listings/${updatedListing._id}`);
}));

//delete route
router.delete('/:id',wrapAsync(async(req,res)=>{
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));

module.exports = router;