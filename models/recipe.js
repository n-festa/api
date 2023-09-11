
module.exports = (sequelize, DataTypes) => {
	const recipe = sequelize.define('recipe', {
		id: {
			type: DataTypes.BIGINT(11),
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


	return recipe;
};
