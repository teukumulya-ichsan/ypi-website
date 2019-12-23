const UserController = require('@user/controllers');

module.exports = app => {
  const userController = new UserController();

  app
    .route('/users')
    .get(userController.index)
    .post(userController.create);

  app
    .route('/users/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.fullDelete);
};
