const CommentController = require('@comments/controllers');

module.exports = app => {
  const commentController = new CommentController();

  //* Berita Route
  app
    .route('/comments-berita')
    .get(commentController.indexBerita)
    .post(commentController.createCommentBerita);

  app
    .route('/comments-berita/:id')
    .get(commentController.getCommentBeritaDetail)
    .put(commentController.updateCommentBerita)
    .delete(commentController.deleteCommentBerita);

  //* Event Route //
  app
    .route('/comments-event')
    .get(commentController.indexEvent)
    .post(commentController.createCommentEvent);

  app
    .route('/comments-event/:id')
    .get(commentController.getCommentEventDetail)
    .put(commentController.updateCommentEvent)
    .delete(commentController.deleteCommentEvent);
};
