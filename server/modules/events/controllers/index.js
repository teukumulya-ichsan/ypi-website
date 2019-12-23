const EventService = require('@event/services');

class EventController {
  constructor() {
    this.eventService = new EventService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getEventDetail = this.getEventDetail.bind(this);
  }

  async index(req, res) {
    const result = await this.eventService.index(req.query);
    res.send(result);
  }

  async create(req, res) {
    const saveEvent = await this.eventService.create(req.body);
    res.status(saveEvent.status);

    if (saveEvent.status === 200) {
      res.send({
        data: saveEvent
      });
    }

    res.send({
      error: saveEvent.error
    });
  }

  async update(req, res) {
    const eventId = req.params.id;
    const eventData = req.body;

    const updateEvent = await this.eventService.update(eventId, eventData);

    res.status(updateEvent.status);

    if (updateEvent.status === 200) {
      res.send({
        data: updateEvent
      });
    }

    res.send({
      error: updateEvent.error
    });
  }

  async delete(req, res) {
    const eventId = req.params.id;

    const deleteEvent = await this.eventService.delete(eventId);

    res.status(deleteEvent.status);

    if (deleteEvent.status === 200) {
      res.send({
        message: deleteEvent.message
      });
    }

    res.send({
      error: deleteEvent.error
    });
  }

  async getEventDetail(req, res) {
    const data = await this.eventService.getById(req.params.id);
    res.send(data);
  }
}

module.exports = EventController;
