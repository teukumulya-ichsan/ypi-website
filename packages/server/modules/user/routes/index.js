const UserController = require('@user/controllers');

module.exports = (app, passport) => {
  const userController = new UserController();

  app
    .route('/users')
    .get(passport, userController.index)
    .post(passport, userController.create);

  app
    .route('/users/:id')
    .get(userController.getById)
    .put(passport, userController.update)
    .delete(passport, userController.fullDelete);

  app.route('/login').post(userController.login);
};
