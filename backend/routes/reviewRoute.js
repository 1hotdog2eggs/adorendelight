const express = require("express");

const {
    createReviewValidator,
    updateReviewValidator,
    getReviewValidator,
    deleteReviewValidator,
} = require("../utils/validators/reviewValidator");

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    createFilterObj,
    setProductIdAndUserIdToBody,
} = require("../controllers/reviewController");

const authService = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(createFilterObj, getReviews)
    .post(
        authService.protect,
        authService.allowedTo("user"),
        setProductIdAndUserIdToBody,
        createReviewValidator,
        createReview
    );
router
    .route("/:id")
    .get(getReviewValidator, getReview)
    .put(
        authService.protect,
        authService.allowedTo("user"),
        updateReviewValidator,
        updateReview
    )
    .delete(
        authService.protect,
        authService.allowedTo("user", "admin"),
        deleteReviewValidator,
        deleteReview
    );

module.exports = router;
