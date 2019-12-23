const BeritaService = require('@berita/services');

class BeritaController {
  constructor() {
    this.beritaService = new BeritaService();
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getBeritaDetail = this.getBeritaDetail.bind(this);
  }

  async index(req, res) {
    const result = await this.beritaService.index(req.query);
    res.send(result);
  }

  async create(req, res) {
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
    const beritaData = req.body;

    // console.log(beritaData);

    const updateBerita = await this.beritaService.update(beritaId, beritaData);

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
