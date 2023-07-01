const express = require('express');

const router = express.Router();
const friendsController = require('../controllers/friends_controller');


router.post('/isfriend', friendsController.isfriend);
router.post('/request',friendsController.request)

module.exports = router;