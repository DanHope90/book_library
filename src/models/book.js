module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter book title.',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter book title.',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Please enter book title',
        },
        notEmpty: {
          args: [true],
          msg: 'Please enter book title.',
        },
      },
    },
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};
