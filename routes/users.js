const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.user_sign_up);
router.get('/log-in',usersController.user_log_in);
router.post('/create',usersController.create);  
router.post('/createsession',usersController.createsession);
router.post('/remove',usersController.remove);
module.exports = router;