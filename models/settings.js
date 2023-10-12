module.exports = (sequelize, DataTypes) => {
	const settings = sequelize.define('settings', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		key: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		value: {
			type: DataTypes.STRING(191),
			allowNull: false,
		},
		
		
	}, {});

	return settings;
};
