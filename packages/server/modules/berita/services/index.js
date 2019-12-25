const BeritaModel = require('@berita/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

const UserModel = require('@user/models');
const CategoryModel = require('@categories/models');
const fs = require('fs');

class BeritaService {
  constructor() {
    this.beritaModel = new BeritaModel();
    this.userModel = new UserModel();
    this.cateModel = new CategoryModel();
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

    const beritaData = await this.beritaModel.index(
      search,
      sortBy,
      order,
      status,
      is_deleted
    );

    const newData = this.remakeData(beritaData);

    return {
      data: newData
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

    const beritaSave = await this.beritaModel.create(data);

    if (beritaSave.affectedRows === 0) {
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
      message: 'Berita Berhasil di Buat'
    };
  }

  async update(beritaId, { body, file }) {
    if (!beritaId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'beritaId is required!'
      };
    }
    if (body.photo_url === '' || file) {
      if (body.photo_url_lama !== '') {
        fs.unlinkSync(
          `${__dirname}/../../../../client/public/img/berita/${body.photo_url_lama}`
        );
      }

      body.photo_url = file ? file.filename : body.photo_url;
    } else {
      body.photo_url = body.photo_url_lama;
    }

    const existsID = await this.beritaModel.getById(beritaId);
    if (existsID.length > 0) {
      const isDataValid = await this.dataValidation(beritaId);
      // console.log(isDataValid);
      if (isDataValid !== true) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: {
            error_code: 'DATA_VALIDATION',
            message: isDataValid
          }
        };
      } else {
        delete body.category;
        delete body.photo_url_lama;
        const beritaData = body;

        const updatedBerita = await this.beritaModel.update(
          beritaId,
          beritaData
        );
        if (updatedBerita.affectedRows !== 1) {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
          };
        }

        return {
          status: HttpStatus.OK,
          message: 'Berita Berhasil di Update'
        };
      }
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'UNKNOWN ID'
      }
    };
  }

  async delete(beritaId) {
    const beritaData = {
      is_deleted: 1
    };

    const existsID = await this.beritaModel.getById(beritaId);
    if (existsID.length > 0) {
      const isDataValid = await this.dataValidation(beritaId);
      // console.log(isDataValid);
      if (isDataValid !== true) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: {
            error_code: 'DATA_VALIDATION',
            message: isDataValid
          }
        };
      } else {
        const deletedBerita = await this.beritaModel.update(
          beritaId,
          beritaData
        );
        if (deletedBerita.affectedRows !== 1) {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error'
          };
        }

        return {
          status: HttpStatus.OK,
          message: 'Berita Berhasil di Hapus'
        };
      }
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'UNKNOWN ID'
      }
    };
  }

  async getById(beritaId) {
    const data = await this.beritaModel.getById(beritaId);

    const newData = this.remakeData(data);

    // console.log(data[0].id_kategori);
    if (newData.length > 0) {
      if (newData[0].is_deleted === 1) {
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'DATA IS DELETED'
        };
      } else {
        return {
          status: HttpStatus.OK,
          data: newData[0]
        };
      }
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA EMPTY'
    };
  }

  //* function data validation of deleted 'Berita'
  async dataValidation(data) {
    const beritaDelete = await this.beritaModel.getBeritaDeleted(data);

    // console.log(beritaDelete);

    if (beritaDelete.length > 0) {
      return [
        {
          type: 'integer',
          field: 'id',
          message: 'Berita ID is Unknown or Deleted'
        }
      ];
    }
    return true;
  }

  remakeData(data) {
    let newData = [];
    data.forEach(item => {
      var user_id = item.create_user;
      item.create_user = {
        author_id: user_id,
        author_name: item.author_name
      };
      delete item.author_name;

      item.category = {
        category_id: item.id_kategori,
        category_name: item.kategori_name
      };

      delete item.id_kategori;
      delete item.kategori_name;
      newData.push(item);
    });

    return newData;
  }
}

module.exports = BeritaService;
