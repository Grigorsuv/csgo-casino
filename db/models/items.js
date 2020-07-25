/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('items', {
		itemId: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(40),
			allowNull: false
		},
		image: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'items'
	});
};
