const BeritaController = require('@berita/controllers');

module.exports = (app, passport) => {
  const beritaController = new BeritaController();

  app
    .route('/berita')
    .get(beritaController.index)
    .post(
      passport,
      beritaController.upload.single('photo_url'),
      beritaController.create
    );

  app
    .route('/berita/:id')
    .get(beritaController.getBeritaDetail)
    .put(
      passport,
      beritaController.upload.single('photo_url'),
      beritaController.update
    )
    .delete(passport, beritaController.delete);
};
