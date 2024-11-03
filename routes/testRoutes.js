const express = require('express');

const {
getData
  } = require('../services/testServices');

  const router = express.Router();
 
  router .route('/').get(getData);
  
  module.exports = router;

