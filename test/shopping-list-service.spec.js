/* eslint-disable quotes */
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

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list_test' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list').insert(testItems);
    });
    //retrieve all data
    it(`getAllItems() resolves all items from 'shopping_list_test' table`, () => {
      return ShoppingService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });
   
    //retrieve specific update
    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const id = 2;
      const testItem = testItems[id - 1];

      return ShoppingService.getById(db, id).then(actual => {
        expect(actual).to.eql({
          id: id,
          name: testItem.name,
          price: testItem.price,
          date_added: testItem.date_added,
          checked: testItem.checked,
          category: testItem.category
        });
      });
    });

    //update item
    it(`updateItem() updates an item from 'shopping_list' table`, () => {
      const idOfItemToUpdate = 1;
      const newItemData = {
        name: 'updated name',
        checked: true,
        date_added: new Date()
      };
      return ShoppingService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            price: item.price,
            category: item.category,
            ...newItemData
          });
        });
    });
    //delete item
    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const id = 3;
      return ShoppingService.deleteItem(db, id)
        .then(() => ShoppingService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => item.id !== id);
          expect(allItems).to.eql(expected);
        });
    });
    
  });
  context(`Given 'shopping_list' has no data`, () => {
    it('getAllArticles() resolves an empty array', () => {
      return ShoppingService.getAllItems(db).then(actual => {
        expect(actual).to.eql([]);
      });
    });
  
    it(`insertItem() inserts a new item and resolves the new item`, () => {
      const newItem = {
        name: 'new product',
        price: '15.00',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: false,
        category: 'Lunch'
      };
      return ShoppingService.insertItem(db, newItem).then(actual => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          date_added: newItem.date_added,
          checked: newItem.checked,
          category: newItem.category
        });
      });
    });
  });

});


