const BeritaController = require('@berita/controllers');

module.exports = app => {
  const beritaController = new BeritaController();

  app
    .route('/berita')
    .get(beritaController.index)
    .post(beritaController.create);

  app
    .route('/berita/:id')
    .get(beritaController.getBeritaDetail)
    .put(beritaController.update)
    .delete(beritaController.delete);
};
