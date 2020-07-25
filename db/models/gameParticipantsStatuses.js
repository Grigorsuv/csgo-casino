/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('gameParticipantsStatuses', {
		gameParticipantsStatusId: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(10),
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'gameParticipantsStatuses'
	});
};
