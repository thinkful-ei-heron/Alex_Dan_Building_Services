/* eslint-disable strict */
const ShoppingService = require('../src/shopping-list-service.js');
const knex = require('knex');

describe('Shopping list service object', function() {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'product 1',
      price: '1.00',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'product 2',
      price: '1.01',
      date_added: new Date('2028-01-22T16:28:32.615Z'),
      checked: true,
      category: 'Main'
    },
    {
      id: 3,
      name: 'product 3',
      price: '1.03',
      date_added: new Date('2023-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL
    });
  });

  before(() => db('shopping_list_test').truncate());

  afterEach(() => db('shopping_list_test').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list_test' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list_test').insert(testItems);
    });
    //retrieve all data
    it(`getAllItems() resolves all items from 'shopping_list_test' table`, () => {
      return ShoppingService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });
    //insert new item

    //retrieve specific update

    //update item

    //delete item
  });
});
