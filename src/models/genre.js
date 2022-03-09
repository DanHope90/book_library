/* eslint-disable indent */
module.exports = (connection, DataTypes) => {
    const schema = {
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: [true],
            msg: 'Please enter genre.',
          },
          notEmpty: {
            args: [true],
            msg: 'Please enter genre.',
          },
        },
      },
    };
  
    const GenreModel = connection.define('Genre', schema);
    return GenreModel;
  };
  