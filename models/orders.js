module.exports = (sequelize, DataTypes) => {
	const orders = sequelize.define('orders', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		customer_id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
		},
		restaurant_id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
		},
		driver_id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
		},
		order_total: {
			type: DataTypes.FLOAT,
		},
		delivery_fee: {
			type: DataTypes.FLOAT,
		},
		packaging_fee: {
			type: DataTypes.FLOAT,
		},
		cutlery_fee: {
			type: DataTypes.FLOAT,
		},
		app_fee: {
			type: DataTypes.FLOAT,
		},
		voucher_id: {
			type: DataTypes.BIGINT(11),
		},
		time_delevery_request: {
			type: DataTypes.INTEGER,
		},
		status: {
			type: DataTypes.STRING(60),
			allowNull: true,
			defaultValue: "published"
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},
	}, {});


	return orders;
};
