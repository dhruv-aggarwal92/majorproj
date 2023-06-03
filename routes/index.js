const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("Router loaded");

router.get('/',homeController.home);
router.use('/users', require('./users'));       //this is how we can assess the other fils in users folder through index.js.
router.use('/posts',require('./posts'));
module.exports = router;