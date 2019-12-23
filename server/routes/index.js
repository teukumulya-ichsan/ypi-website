const userRoute = require('@user/routes');
const beritaRoute = require('@berita/routes');
const eventRoute = require('@event/routes');
const categoryRoute = require('@categories/routes');
const commentsRoute = require('@comments/routes');
const likesRoute = require('@likes/routes');

module.exports = app => {
  app.route('/').get((req, res) => {
    res.send('Started from Here!!');
  });

  userRoute(app);
  beritaRoute(app);
  eventRoute(app);
  categoryRoute(app);
  commentsRoute(app);
  likesRoute(app);
};
