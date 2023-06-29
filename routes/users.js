const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-up',passport.islogin,usersController.user_sign_up);
router.get('/log-in',passport.islogin,usersController.user_log_in);
router.post('/create',usersController.create);  
router.get('/forgot_password',usersController.forgot_password);
router.post('/reset_link',usersController.reset_link);

router.get('/reset_password/:accessToken',usersController.reset_password)
router.post('/pass/update/:accessToken',usersController.update_pass)

// use passport as a middleware to authenticate
router.post('/createsession', passport.authenticate(
    'local',
    {failureRedirect: '/users/log-in'}      //make your email name and mongodb email name same i.e email otherwise it goes in failure.
), usersController.createsession);

router.get('/sign-out',usersController.destroysession);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/users/log-in'}), usersController.createsession)
module.exports = router;  