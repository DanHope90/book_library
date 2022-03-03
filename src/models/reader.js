module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter name.',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter name.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter valid email.',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter valid email.',
        },
        isEmail: {
          args: [true],
          msg: 'Please enter valid email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter valid password.',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter valid password.',
        },
        len: {
          args: [8],
          msg: 'Your password must be at least 8 characters long.',
        },
      },
    },
  };

  const RearderModel = connection.define('Reader', schema);
  return RearderModel;
};
