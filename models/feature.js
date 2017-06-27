/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('feature', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		clientPriority: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		targetDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		ticketUrl: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		client: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'client',
				key: 'id'
			}
		},
		productArea: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'productarea',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.STRING(45),
			allowNull: true,
			references: {
				model: 'status',
				key: 'id'
			}
		},
		createdBy: {
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
		tableName: 'feature',
		timestamps: false
	});
};
