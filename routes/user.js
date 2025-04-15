const express = require('express');
const {handleUserSignup , handleUserLogin , handleUserLogout , handleAnalytics , handleContactGet , handleContactPost} = require('../controllers/user');
const router = express.Router();


router.post('/' , handleUserSignup);

router.post('/login' , handleUserLogin);

router.get('/logout', handleUserLogout);

router.get('/analytics', handleAnalytics);

router.get('/contact', handleContactGet);

router.post('/contact', handleContactPost);

module.exports = router;

