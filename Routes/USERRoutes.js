const express = require('express');
const router = express.Router();

const {getUser, signIn, signOut, signUp} = require('../Controllers/UserController');
const { verifyAccessToken } = require('../JWT/JWT');


router.route('/portfolio/user').get(verifyAccessToken,getUser)

router.route('/portfolio/user/signin').post(signIn);

router.route('/portfolio/user/signout').get(signOut);

router.route('/portfolio/user/signup').post(signUp);

module.exports = router;