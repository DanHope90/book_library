const res = require('express/lib/response');
const { Book, Reader } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
  };

  return models[model];
};

const createItem = async (res, model, item) => {
  const Model = getModel(model);

  try {
    const newItem = await Model.create(item);

    res.status(201).json(newItem);
  } catch (error) {
    const errorMessages = error.errors.map((e) => e.messages);

    res.status(500).json({ errors: errorMessages });
  }
};

const getAllItems = async (res, model, item) => {
const Model = getModel(model);
const allItems = await Model.findAll(item);

res.status(200).json(allItems);
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

module.exports = { createItem, getAllItems };
