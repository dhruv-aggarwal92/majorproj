const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get('/profile',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',passport.islogin,usersController.user_sign_up);
router.get('/log-in',passport.islogin,usersController.user_log_in);
router.post('/create',usersController.create);  

// use passport as a middleware to authenticate
router.post('/createsession', passport.authenticate(
    'local',
    {failureRedirect: '/users/log-in'}      //make your email name and mongodb email name same i.e email otherwise it goes in failure.
), usersController.createsession);

router.get('/sign-out',usersController.destroysession)
module.exports = router;