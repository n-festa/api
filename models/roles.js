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
		restaurant_id: {
			type: DataTypes.TEXT(400),
			allowNull: false,
		},
		
		
	}, {});


	return roles;
};
