/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('status', {
		id: {
			type: DataTypes.STRING(45),
			allowNull: false,
			primaryKey: true
		},
		status: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		createdAt: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'status',
		timestamps: false
	});
};
