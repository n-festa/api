
module.exports = (sequelize, DataTypes) => {
	const ingredients = sequelize.define('ingredients', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name:{
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		food_id:{
			type: DataTypes.INTEGER,
		}

		
	}, {});


	return ingredients;
};
