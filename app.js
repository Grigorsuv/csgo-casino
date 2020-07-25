
const express = require('express')  , passport = require('passport')//, SteamStrategy = require('./services/auth/steam')
const app = express();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

require('./db/models/index')
// passport.use(new SteamStrategy({
//         returnURL: process.env.STEAM_API_RETURN,
//         realm: process.env.STEAM_API_REALM,
//         apiKey: process.env.STEAM_API_KEY
//     },
//     function(identifier, profile, done) {
//         // asynchronous verification, for effect...
//         process.nextTick(function () {
//
//
//             profile.identifier = identifier;
//             return done(null, profile);
//         });
//     }
// ));


const {
    setGlobalMiddleware,
    errorHandler,
    notFound,
    healthyResponse,
} = require('./middleware');
// const API = require('./api');


setGlobalMiddleware(app);

app.use(passport.initialize());

app.get('/', healthyResponse);
// app.use('/api', API);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
