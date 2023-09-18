
module.exports = (sequelize, DataTypes) => {
	const recipes = sequelize.define('recipes', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		ingredient_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		sku_id: {
			type: DataTypes.INTEGER,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		unit: {
			type: DataTypes.STRING(60),
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},
	}, {});


	return recipes;
};
