const LikeController = require('@likes/controllers');

module.exports = app => {
  const likeControlller = new LikeController();

  app.route('/like-berita').get(likeControlller.indexBerita);

  app.route('/like-event').get(likeControlller.indexEvent);
};
