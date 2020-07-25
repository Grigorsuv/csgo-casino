const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX),
        min: parseInt(process.env.DB_POOL_MIN),
        acquire: process.env.DB_POOL_ACQUIRE,
        idle:process.env.DB_POOL_IDLE
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.userRoles = require("./userRoles")(sequelize, Sequelize);
db.gameTypes = require("./gameTypes")(sequelize, Sequelize);
db.gameStatuses = require("./gameStatuses")(sequelize, Sequelize);
db.games = require("./games")(sequelize, Sequelize);
db.gameParticipantsStatuses = require("./gameParticipantsStatuses")(sequelize, Sequelize);
db.gameParticipants = require("./gameParticipants")(sequelize, Sequelize);
db.items = require("./items")(sequelize, Sequelize);
db.userItems = require("./userItems")(sequelize, Sequelize);
db.gameItems = require("./gameItems")(sequelize, Sequelize);


db.users.hasMany(db.userRoles);

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

module.exports = db;
