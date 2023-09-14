
module.exports = (sequelize, DataTypes) => {
	const skus = sequelize.define('skus', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		menu_item_id: {
			type: DataTypes.STRING(191),
		},
		sku: {
			type: DataTypes.INTEGER,
		},
		price: {
			type: DataTypes.DOUBLE,
		},
		status: {
			type: DataTypes.STRING(60),
		},
		is_standard: {
			type: DataTypes.INTEGER,
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},
	}, {});


	return skus;
};
