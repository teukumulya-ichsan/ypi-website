const EventService = require('@event/services');

//* for image upload
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');

const diskstorage = multer.diskStorage({
  destination: `${__dirname}/../../../../client/public/img/events`,
  filename: async function(req, file, cb) {
    let ext = path.extname(file.originalname);
    let hashname = await bcrypt.hash(file.originalname, 8);
    hashname = hashname.substr(0, 5);
    cb(null, hashname + '-' + Date.now() + ext);
  }
});

class EventController {
  constructor() {
    this.eventService = new EventService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getEventDetail = this.getEventDetail.bind(this);

    //* Multer for upload file
    this.upload = multer({
      storage: diskstorage,
      limits: {
        fileSize: 1000000
      },
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Please upload jpg/jpeg/png image'));
        }

        callback(undefined, true);
      }
    });
  }

  async index(req, res) {
    const result = await this.eventService.index(req.query);
    res.send(result);
  }

  async create(req, res) {
    console.log(req.body);
    req.body.photo_url = req.file ? req.file.filename : '';
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

    console.log('fdfs ', req.body);

    const updateEvent = await this.eventService.update(eventId, req);

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
