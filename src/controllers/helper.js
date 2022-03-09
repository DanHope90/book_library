const res = require('express/lib/response');
const { Book, Reader, Author, Genre } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    author: Author,
    genre: Genre,
  };

  return models[model];
};

const removePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password;
  }
  return obj;
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);
    const itemWithoutPassword = removePassword(newItem.get());

    res.status(201).json(itemWithoutPassword);
  } catch (error) {
    const errorMessages = error.errors.map((e) => e.messages);

    res.status(500).json({ errors: errorMessages });
  }
};

const getAllItems = (res, model) => {
  const Model = getModel(model);

  return Model.findAll().then((items) => {
    const itemsWithoutPassword = items.map((item) =>
      removePassword(item.dataValues)
    );
    res.status(200).json(itemsWithoutPassword);
  });
};

const updateItem = (res, model, item, id) => {
  const Model = getModel(model);
  return Model.update(item, { where: { id } }).then(([recordsUpdated]) => {
    if (!recordsUpdated) {
      res.status(404).json(get404Error(model));
    } else {
      getModel(model)
        .findByPk(id)
        .then((updatedItem) => {
          const itemWithoutPassword = removePassword(updatedItem.dataValues);
          res.status(200).json(itemWithoutPassword);
        });
    }
  });
};

// both update item & deleteItem timeout

// const updateItem = async (res, model, item, id) => {
//   const Model = getModel(model);
//   const [itemUpdated] = await Model.update(item, { where: { id } });

//     if (!itemUpdated) {
//         res.status(404).json(get404Error(model));
//     } else {
//         const updatedItem = await Model.findByPk(id);
//         res.status(200).json(updatedItem);
//     }
// };

// const deleteItem = async (res, model, id) => {
//   const Model = getModel(model);

//   const itemsDeleted = await Model.destroy({ where: { id } });

//   if (!itemsDeleted) {
//     res.status(404).json(get404Error(model));
//   } else {
//     res.status(204).send();
//   }
// };

module.exports = { createItem, getAllItems, updateItem };
