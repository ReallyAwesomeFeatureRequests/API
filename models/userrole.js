/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userrole', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
		},
		role: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'role',
				key: 'id'
			}
		}
	}, {
		tableName: 'userrole',
		timestamps: false
	});
};
