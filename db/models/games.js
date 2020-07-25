/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('games', {
		gameId: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		initiator: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		type: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		rate: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		costToJoin: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		sequelize,
		tableName: 'games'
	});
};
