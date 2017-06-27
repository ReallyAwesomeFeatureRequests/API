/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subscription', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'subscriptiontype',
				key: 'id'
			}
		},
		thread: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'thread',
				key: 'id'
			}
		},
		user: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'user',
				key: 'id'
			}
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
		tableName: 'subscription',
		timestamps: false
	});
};
