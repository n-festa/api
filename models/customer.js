module.exports = (sequelize, DataTypes) => {
	const customers = sequelize.define('customers', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING(25),
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		dob: {
			type: DataTypes.DATE,
		//	allowNull: false,
		},
		health_info_id: {
			type: DataTypes.INTEGER,
		},
		status: {
			type: DataTypes.STRING(60),
		},
		remember_token:{
			type: DataTypes.STRING(100),
		},
		createdAt:
		{
			type: DataTypes.DATE, field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE, field: 'updated_at',
		},
	}, {});

	
	return customers;
};
