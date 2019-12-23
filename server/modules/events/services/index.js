const EventModel = require('@event/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

class EventService {
  constructor() {
    this.eventModel = new EventModel();
    this.validator = new Validate();
    this.schema = {
      judul: {
        type: 'string',
        min: 5,
        max: 255
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE'],
        optional: true
      },
      id_kategori: {
        type: 'string'
      }
    };
  }

  async index(query) {
    const search = query.q;
    const sortBy = query.sort_by;
    const order = query.order;
    const status = query.status;
    const is_deleted = query.deleted;

    const eventData = await this.eventModel.index(
      search,
      sortBy,
      order,
      status,
      is_deleted
    );

    return {
      data: eventData
    };
  }

  async create(data) {
    const isFormValid = this.validator.validate(data, this.schema);
    if (isFormValid !== true) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: {
          error_code: 'FORM_VALIDATION',
          message: isFormValid
        }
      };
    }

    const eventSave = await this.eventModel.create(data);
    if (eventSave.affectedRows === 0) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          error_code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal Server Error'
        }
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Event Berhasil di Buat'
    };
  }

  async update(eventId, eventData) {
    if (!eventId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'eventID is required'
      };
    }

    const existEvent = await this.eventModel.getById(eventId);
    if (existEvent.length > 0) {
      const isDataValid = await this.dataValidation(eventId);
      if (isDataValid !== true) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: {
            error_code: 'DATA_VALIDATION',
            message: isDataValid
          }
        };
      } else {
        const updatedEvent = await this.eventModel.update(eventId, eventData);
        if (updatedEvent.affectedRows !== 1) {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
          };
        }
      }

      return {
        status: HttpStatus.OK,
        message: 'Event berhasil di Update'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'UNKNOWN ID'
      }
    };
  }

  async delete(eventId) {
    const eventData = {
      is_deleted: 1
    };

    const existEvent = await this.eventModel.getById(eventId);
    if (existEvent.length > 0) {
      const isDataValid = await this.dataValidation(eventId);
      if (isDataValid !== true) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: {
            error_code: 'DATA_VALIDATION',
            message: isDataValid
          }
        };
      } else {
        const deletedEvent = await this.eventModel.update(eventId, eventData);
        if (deletedEvent.affectedRows !== 1) {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
          };
        }

        return {
          status: HttpStatus.OK,
          message: 'Event Berhasil di Hapus'
        };
      }
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async getById(eventId) {
    const data = await this.eventModel.getById(eventId);
    if (data.length > 0) {
      if (data[0].is_deleted === 1) {
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'DATA IS DELETED'
        };
      } else {
        return {
          status: HttpStatus.OK,
          data: data[0]
        };
      }
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA NOT FOUND'
    };
  }

  // function data validation of deleted 'event'
  async dataValidation(data) {
    const eventDeleted = await this.eventModel.getEventDeleted(data);
    if (eventDeleted.length > 0) {
      return [
        {
          type: 'integer',
          field: 'id',
          message: 'Event ID is Unknown or Deleted'
        }
      ];
    }
    return true;
  }
}

module.exports = EventService;
