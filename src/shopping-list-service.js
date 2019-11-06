/* eslint-disable strict */

const ShoppingService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },
  insertItem(knex, item) {
    return knex
      .insert(item)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0]);
  },
  getById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .first();
  },
  deleteItem(knex, id) {
    return knex('shopping_list')
      .delete()
      .where({ id });
  },
  updateItem(knex, id, newData) {
    return knex('shopping_list')
      .update(newData)
      .where({ id });
  }
};

module.exports = ShoppingService;
