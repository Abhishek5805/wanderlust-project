const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema,reviewSchema} = require('../schema.js');
const review = require('../models/review.js');


const validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body);
    if(error){
        let msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(400,msg);
    }else{
        next();

    }
}

//review routes
//post route for reviews
router.post('/',validateReview,wrapAsync(async(req,res)=>{
   let Listings = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);

    Listings.reviews.push(newReview);
    await newReview.save();
    await Listings.save();
    res.redirect(`/listings/${Listings._id}`);
}));



//delete route for reviews
router.delete('/:reviewId',wrapAsync(async(req,res)=>{
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;