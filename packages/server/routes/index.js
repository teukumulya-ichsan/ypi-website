const userRoute = require('@user/routes');
const beritaRoute = require('@berita/routes');
const eventRoute = require('@event/routes');
const categoryRoute = require('@categories/routes');
const commentsRoute = require('@comments/routes');
const likesRoute = require('@likes/routes');

module.exports = (app, passport) => {
  const privateRoute = passport.authenticate('jwt', { session: false });

  //! TEST ROUTE AND PASSPORT
  // app.route('/').get((req, res) => {
  //   res.send('Started from Here!!');
  // });

  // app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  //   res.json('Success! You can now see this without a token.');
  // });

  userRoute(app, privateRoute);
  beritaRoute(app, privateRoute);
  eventRoute(app, privateRoute);
  categoryRoute(app, privateRoute);
  commentsRoute(app, privateRoute);
  likesRoute(app, privateRoute);
};
