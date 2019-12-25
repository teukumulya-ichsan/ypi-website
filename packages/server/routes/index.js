const userRoute = require('@user/routes');
const beritaRoute = require('@berita/routes');
const eventRoute = require('@event/routes');
const categoryRoute = require('@categories/routes');
const commentsRoute = require('@comments/routes');
const likesRoute = require('@likes/routes');

module.exports = (app, passport) => {
  app.route('/').get((req, res) => {
    res.send('Started from Here!!');
  });

  app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success! You can now see this without a token.');
  });

  userRoute(app);
  beritaRoute(app, passport);
  eventRoute(app);
  categoryRoute(app);
  commentsRoute(app);
  likesRoute(app);
};
