
module.exports = (sequelize, DataTypes) => {
	const menu_item = sequelize.define('menu_item', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		restaurant_id:{
			type: DataTypes.BIGINT(11),
			allowNull: false,
		},
		name:{
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		short_name:{
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		description:{
			type: DataTypes.TEXT,
		},
		preparing_time:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		cooking_time:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		cutoff_time:{
			type: DataTypes.INTEGER,
			defaultValue: 0
		},
		menu_item_type_id:{
			type: DataTypes.BIGINT(11),
			allowNull: false,
		},
		status:{
			type: DataTypes.STRING(60),
		},
		is_vegetarian:{
			type: DataTypes.INTEGER,
		},
		cooking_schedule:{
			type: DataTypes.TEXT,
		},
		images:{
			type: DataTypes.TEXT,
		},
		tastes:{
			type: DataTypes.STRING(191),
		},
		is_side_dish:{
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


	return menu_item;
};
