const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');




exports.getData=asyncHandler(async (req, res, next) => {
    console.log('asdasdas'); 
    res.send("asdasasdasd");
})


/*
git add .
git commit -m "sssss4"
git push -u origin main
*/