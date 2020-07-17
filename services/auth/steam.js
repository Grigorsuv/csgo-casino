
const util = require('util')
    , OpenIDStrategy = require('@passport-next/passport-openid').Strategy
    , SteamWebAPI = require('steam-web');

/**
 * Retrieve user's Steam profile information.
 *
 * @param  {String} key     Steam WebAPI key.
 * @param  {String} steamID SteamID64.
 * @param callback
 * @return {Object}         User's Steam profile.
 */
const getUserProfile = (key, steamID, callback) => {
    const steam = new SteamWebAPI({ apiKey: key, format: 'json' });

    steam.getPlayerSummaries({
        steamids: [ steamID ],
        callback: function(err, result) {
            if(err) {
                return callback(err);
            }

            const profile = {
                provider: 'steam',
                _json: result.response.players[0],
                id: result.response.players[0].steamid,
                displayName: result.response.players[0].personaname,
                photos: [{
                    value: result.response.players[0].avatar
                }, {
                    value: result.response.players[0].avatarmedium
                }, {
                    value: result.response.players[0].avatarfull
                }]
            };

            callback(null, profile);
        }
    });
}

/**
 * @param {Object} options
 * @param {Function} validate
 * @api public
 */
const Strategy = (options, validate) =>{
    options = options || {};
    options.providerURL = options.providerURL || 'https://steamcommunity.com/openid';
    options.profile =  (options.profile === undefined) ? true : options.profile;
    options.stateless = true; //Steam only works as a stateless OpenID

    const originalPassReqToCallback = options.passReqToCallback;
    options.passReqToCallback = true; //Request needs to be verified

    const verify =(req, identifier, profile, done) =>{
        const validOpEndpoint = 'https://steamcommunity.com/openid/login';
        const identifierRegex = /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/;

        if(req.query['openid.op_endpoint'] !== validOpEndpoint ||
            !identifierRegex.test(identifier)) {
            return done(null, false, { message: 'Claimed identity is invalid.' });
        }

        const steamID = identifierRegex.exec(identifier)[0];

        if(options.profile) {
            getUserProfile(options.apiKey, steamID, function(err, profile) {
                if(err) {
                    done(err);
                } else {
                    if(originalPassReqToCallback) {
                        validate(req, identifier, profile, done);
                    } else {
                        validate(identifier, profile, done);
                    }
                }
            });
        } else {
            if(originalPassReqToCallback) {
                validate(req, identifier, profile, done);
            } else {
                validate(identifier, profile, done);
            }
        }
    }

    OpenIDStrategy.call(this, options, verify);

    this.name = 'steam';
    this.stateless = options.stateless;
}

/**
 * Inherit from `OpenIDStrategy`.
 */
util.inherits(Strategy, OpenIDStrategy);


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
