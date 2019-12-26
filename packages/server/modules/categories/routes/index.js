const CategoryController = require('@categories/controllers');

module.exports = (app, passport) => {
  const categoryController = new CategoryController();

  app
    .route('/category-berita')
    .get(categoryController.indexBerita)
    .post(passport, categoryController.createCateBerita);

  app
    .route('/category-berita/:id')
    .get(categoryController.getCateBeritaById)
    .put(passport, categoryController.updateCateBerita)
    .delete(passport, categoryController.deleteCateBerita);

  app
    .route('/category-event')
    .get(categoryController.indexEvent)
    .post(passport, categoryController.createCateEvent);

  app
    .route('/category-event/:id')
    .get(categoryController.getCateEventById)
    .put(passport, categoryController.updateCateEvent)
    .delete(passport, categoryController.deleteCateEvent);
};
