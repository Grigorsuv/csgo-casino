const {createPool} = require('mysql');
const {promisifyModule} = require("./promise");

const mainPool = promisifyModule(new createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
}));


module.exports = {
    async executeMain(query, params) {
        try {
            return await mainPool.queryAsync(query, params);
        } catch (err) {
            console.error(err.message || 'DB ERROR');
            console.error(query, 'Error Query DB');
            console.error(params, 'Error params DB');
            throw Error(err);
        }
    },
    async executeMainFirst(query, params) {
        try {
            let res = await mainPool.queryAsync(query, params);

            if(!res || res.length === 0) return null;

            return res[0]
        } catch (err) {
            console.error(err.message || 'DB ERROR');
            console.error(query, 'Error Query DB');
            console.error(params, 'Error params DB');
            throw Error(err);
        }
    }
}
