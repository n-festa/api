
module.exports = (sequelize, DataTypes) => {
	const ingredients = sequelize.define('vouchers', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name:{
			type: DataTypes.STRING(255),
		},
		description:{
			type: DataTypes.TEXT(500),
		},
		type:{
			type: DataTypes.STRING(75),
		},
		coupon_code:{
			type: DataTypes.STRING(191),
		},
		discount_value:{
			type: DataTypes.INTEGER,
		},
		discount_unit:{
			type: DataTypes.STRING(45),
		},
		status:{
			type: DataTypes.STRING(60),
		},
		create_date:{
			type: DataTypes.DATE,
		},
		valid_from:{
			type: DataTypes.DATE,
		},
		valid_util:{
			type: DataTypes.DATE,
		},
		budget:{
			type: DataTypes.INTEGER,
		}
	}, {});


	return ingredients;
};
