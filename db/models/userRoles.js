/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userRoles', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING(10),
			allowNull: false,
			defaultValue: "user"
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		}
	}, {
		sequelize,
		tableName: 'userRoles'
	});
};
