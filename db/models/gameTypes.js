/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('gameTypes', {
		gameId: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		},
		config: {
			type: DataTypes.JSON,
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'gameTypes'
	});
};
