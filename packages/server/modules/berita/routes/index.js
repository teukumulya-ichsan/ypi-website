const BeritaController = require('@berita/controllers');

module.exports = (app, passport) => {
  const beritaController = new BeritaController();

  app
    .route('/berita')
    .get(passport.authenticate('jwt', { session: false }), beritaController.index)
    .post(beritaController.upload.single('photo_url'), beritaController.create);

  app
    .route('/berita/:id')
    .get(beritaController.getBeritaDetail)
    .put(beritaController.upload.single('photo_url'), beritaController.update)
    .delete(beritaController.delete);
};
