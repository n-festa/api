module.exports = (sequelize, DataTypes) => {
	const roles = sequelize.define('roles', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT(400),
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},

	}, {});

	return roles;
};
