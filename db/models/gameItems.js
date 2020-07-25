/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('gameItems', {
		gameId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		userItemId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'gameItems'
	});
};
