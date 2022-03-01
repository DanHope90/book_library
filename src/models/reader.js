module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  };

  const RearderModel = connection.define('Reader', schema);
  return RearderModel;
};
