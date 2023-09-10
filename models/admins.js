


module.exports = (sequelize, DataTypes) => {
	const Admins = sequelize.define('admins', {
		id: {
			type: DataTypes.BIGINT(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		phone: {
			type: DataTypes.STRING(25),
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		avatar: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(60),
		},
		refesh_token:{
			type: DataTypes.STRING(60),
		}
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},

	}, {});


	return Admins;
};
