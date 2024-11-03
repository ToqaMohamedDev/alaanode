const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');




exports.getData=asyncHandler(async (req, res, next) => {
res.send("asdasasdasd");
})