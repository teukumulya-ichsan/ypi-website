const EventController = require('@event/controllers');

module.exports = (app, passport) => {
  const eventController = new EventController();

  app
    .route('/events')
    .get(eventController.index)
    .post(
      passport,
      eventController.upload.single('photo_url'),
      eventController.create
    );

  app
    .route('/events/:id')
    .get(eventController.getEventDetail)
    .put(
      passport,
      eventController.upload.single('photo_url'),
      eventController.update
    )
    .delete(passport, eventController.delete);
};
