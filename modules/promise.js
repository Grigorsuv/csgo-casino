const Bluebird = require('bluebird');

Bluebird.config({
    longStackTraces: true
});

module.exports = {
    promisifyModule: module => Bluebird.promisifyAll(module)
};
