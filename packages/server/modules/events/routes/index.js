const EventController = require('@event/controllers');

module.exports = app => {
  const eventController = new EventController();

  app
    .route('/events')
    .get(eventController.index)
    .post(eventController.create);

  app
    .route('/events/:id')
    .get(eventController.getEventDetail)
    .put(eventController.update)
    .delete(eventController.delete);
};
