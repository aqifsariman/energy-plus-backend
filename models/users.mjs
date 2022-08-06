export default function usersModel(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already taken.',
      },
      validate: {
        isAlphanumeric: { args: true, msg: 'Symbols are not allowed.' },
        len: {
          args: [5, 16],
          msg: 'Username must be more than 5 characters.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email address format is incorrect.',
        },
      },
      unique: {
        args: true,
        msg: 'Email address already exists.',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Spaces are not allowed in the password field.',
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}
