const express = require('express')
    , router = express.Router()
    , passport = require('passport');

const controller = require('./controller')
router.get('/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    controller.authorizerCallback);


router.get('/steam/return',
    (req, res, next) =>{
        req.url = req.originalUrl;
        next();
    },
    passport.authenticate('steam', { failureRedirect: '/' }),
    controller.returnCallback);

module.exports = router;
