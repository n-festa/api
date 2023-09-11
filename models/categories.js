
module.exports = (sequelize, DataTypes) => {
	const categories = sequelize.define('categories', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(400),
		},
		status: {
			type: DataTypes.STRING(60),
			allowNull: true,
		},
		icon: {
			type: DataTypes.STRING(60),
		},
		order: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		is_featured: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		is_default: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},
	}, {});


	return categories;
};
