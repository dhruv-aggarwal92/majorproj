const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log("Router loaded");

router.get('/',homeController.home);
router.use('/users', require('./users'));       //this is how we can assess the other fils in users folder through index.js.
router.use('/posts',require('./posts'));        //the first one is for action we write in the html file form and second one is for the file we made in routes
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));


router.use('/api',require('./api'));

module.exports = router;