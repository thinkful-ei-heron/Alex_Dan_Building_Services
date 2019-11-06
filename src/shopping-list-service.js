/* eslint-disable strict */

const ShoppingService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list_test');
  }
};

module.exports = ShoppingService;
