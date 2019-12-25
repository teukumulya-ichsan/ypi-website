const BeritaService = require('@berita/services');

const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const diskstorage = multer.diskStorage({
  destination: `${__dirname}/../../../../client/public/img/berita`,
  filename: async function(req, file, cb) {
    let ext = path.extname(file.originalname);
    let hashname = await bcrypt.hash(file.originalname, 8);
    hashname = hashname.substr(0, 5);
    cb(null, hashname + '-' + Date.now() + ext);
  }
});

class BeritaController {
  constructor() {
    this.beritaService = new BeritaService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getBeritaDetail = this.getBeritaDetail.bind(this);

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
    const result = await this.beritaService.index(req.query);
    res.send(result);
  }

  async create(req, res) {
    // console.log(req.file);
    req.body.photo_url = req.file ? req.file.filename : '';

    const saveBerita = await this.beritaService.create(req.body);

    res.status(saveBerita.status);

    if (saveBerita.status === 200) {
      res.send({
        data: saveBerita
      });
    }

    res.send({
      error: saveBerita.error
    });
  }

  async update(req, res) {
    const beritaId = req.params.id;

    // console.log(beritaData);

    const updateBerita = await this.beritaService.update(beritaId, req);

    res.status(updateBerita.status);

    if (updateBerita.status === 200) {
      res.send({
        data: updateBerita
      });
    }

    res.send({
      error: updateBerita.error
    });
  }

  async delete(req, res) {
    const beritaId = req.params.id;

    const deleteBerita = await this.beritaService.delete(beritaId);

    // console.log(deleteBerita);

    res.status(deleteBerita.status);

    if (deleteBerita.status === 200) {
      res.send({
        message: deleteBerita.message
      });
    }

    res.send({
      error: deleteBerita.error
    });
  }

  async getBeritaDetail(req, res) {
    const data = await this.beritaService.getById(req.params.id);
    res.send(data);
  }
}

module.exports = BeritaController;
