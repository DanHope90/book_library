module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter author.',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter author.',
        },
      },
    },
  };

  const AuthorModel = connection.define('Author', schema);
  return AuthorModel;
};
