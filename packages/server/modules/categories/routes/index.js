const CategoryController = require('@categories/controllers');

module.exports = app => {
  const categoryController = new CategoryController();

  app
    .route('/category-berita')
    .get(categoryController.indexBerita)
    .post(categoryController.createCateBerita);

  app
    .route('/category-berita/:id')
    .get(categoryController.getCateBeritaById)
    .put(categoryController.updateCateBerita)
    .delete(categoryController.deleteCateBerita);

  app
    .route('/category-event')
    .get(categoryController.indexEvent)
    .post(categoryController.createCateEvent);

  app
    .route('/category-event/:id')
    .get(categoryController.getCateEventById)
    .put(categoryController.updateCateEvent)
    .delete(categoryController.deleteCateEvent);
};
