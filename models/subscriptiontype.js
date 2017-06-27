/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subscriptiontype', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
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
		tableName: 'subscriptiontype',
		timestamps: false
	});
};
