const express = require('express');
const ReviewRoutes = express.Router();
const {userVerifyToken} = require('../../helpers/verifyToken');

const { addReview, getAllReview ,  deleteReview } = require('../../controller/user/review.controller');

ReviewRoutes.post('/add-Review' , userVerifyToken,  addReview);
ReviewRoutes.get('/get-All-Review' , userVerifyToken,  getAllReview);
ReviewRoutes.delete('/delete-Review' , userVerifyToken , deleteReview);

module.exports = ReviewRoutes;