/* eslint-disable strict */

const ArticlesService = {
  getAllArticles(knex) {
    return knex.select('*').from('blogful_articles');
  },

  insertArticle(knex, art) {
    return knex
      .insert(art)
      .into('blogful_articles')
      .returning('*')
      .then(rows => rows[0]);
  },

  getById(knex, id) {
    return knex
      .select('*')
      .from('blogful_articles')
      .where('id', id)
      .first();
  },

  deleteArticle(knex, id) {
    return knex('blogful_articles')
      .delete()
      .where({ id });
  },

  updateArticle(knex, id, newData) {
    return knex('blogful_articles')
      .update(newData)
      .where({ id });
  }
};

module.exports = ArticlesService;
