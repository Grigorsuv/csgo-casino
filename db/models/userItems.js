/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userItems', {
		userItemId: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		itemId: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'userItems'
	});
};
