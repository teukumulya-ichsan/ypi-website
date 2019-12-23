const CommentController = require('@comments/controllers');

module.exports = app => {
  const commentController = new CommentController();

  app.route('/comments-berita').get(commentController.indexBerita);

  app.route('/comments-berita/:id').post(commentController.createCommentBerita);

  app.route('/comments-event').get(commentController.indexEvent);
};
