const ReviewServices = require('../../services/review.service');
const reviewService = new ReviewServices();

// ADD REVIEW
exports.addReview = async (req, res) => {
    try {
        let review = await reviewService.getReview({ 
            user: req.user._id,
            product:req.query.product,
            isDelete: false 
        });
        if(review) {
            return res.status(400).json({ Message: 'Review is alredy exist' });
        }
        review = await reviewService.addNewReview({ ...req.body, user: req.user._id });
        res.status(201).json({review, Message: 'Review is Added Successfully...✅' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
};

// GET ALL REVIEW
exports.getAllReview = async(req , res) => {
    try {
        let review = await reviewService.getAllReview(req.query);
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
};

// DELETE REVIEW
exports.deleteReview = async(req , res) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if(!review){
            return res.status(404).json({Message: 'Review is not found...'});
        }
        review = await reviewService.updateReview(review._id , {isDelete: true});
        res.status(202).json({review , Message: 'Review is Delete Successfully...✅'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
}