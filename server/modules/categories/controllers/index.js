const CategoryService = require('@categories/services');

class CategoryController {
  constructor() {
    this.categoryService = new CategoryService();

    // ------------------------- BERITA -------------------------- //
    this.indexBerita = this.indexBerita.bind(this);
    this.createCateBerita = this.createCateBerita.bind(this);
    this.updateCateBerita = this.updateCateBerita.bind(this);
    this.deleteCateBerita = this.deleteCateBerita.bind(this);
    this.getCateBeritaById = this.getCateBeritaById.bind(this);

    // ------------------------- EVENT -------------------------- //
    this.indexEvent = this.indexEvent.bind(this);
    this.createCateEvent = this.createCateEvent.bind(this);
    this.updateCateEvent = this.updateCateEvent.bind(this);
    this.deleteCateEvent = this.deleteCateEvent.bind(this);
    this.getCateEventById = this.getCateEventById.bind(this);
  }

  // ------------------------- BERITA -------------------------- //

  async indexBerita(req, res) {
    const result = await this.categoryService.indexBerita(req.query);
    // contoh yang bener
    res.send({
      data: result.data
    });
  }

  async createCateBerita(req, res) {
    const saveCate = await this.categoryService.createCateBerita(req.body);

    res.status(saveCate.status);
    if (saveCate.status === 200) {
      res.send(saveCate);
    }

    res.send({
      error: saveCate.error
    });
  }

  async updateCateBerita(req, res) {
    const cateId = req.params.id;
    const cateData = req.body;

    const updatedCate = await this.categoryService.updateCateBerita(
      cateId,
      cateData
    );

    res.status(updatedCate.status);
    if (updatedCate.status === 200) {
      res.send(updatedCate);
    }

    res.send({
      error: updatedCate.error
    });
  }

  async deleteCateBerita(req, res) {
    const cateId = req.params.id;

    const deletedCate = await this.categoryService.deleteCateBerita(cateId);
    res.status(deletedCate.status);
    if (deletedCate.status === 200) {
      res.send({
        message: deletedCate.message
      });
    }

    res.send({
      error: deletedCate.error
    });
  }

  async getCateBeritaById(req, res) {
    const cateId = req.params.id;

    const cateData = await this.categoryService.getCateBeritaById(cateId);

    res.status(cateData.status);
    if (cateData.status === 200) {
      res.send({
        data: cateData
      });
    }

    res.send({
      error: cateData.error
    });
  }
  // ------------------------- EVENT -------------------------- //

  async indexEvent(req, res) {
    const result = await this.categoryService.indexEvent(req.query);
    res.send({
      data: result.data
    });
  }

  async createCateEvent(req, res) {
    const saveCate = await this.categoryService.createCateEvent(req.body);

    res.status(saveCate.status);
    if (saveCate.status === 200) {
      res.send({
        data: saveCate
      });
    }

    res.send({
      error: saveCate.error
    });
  }

  async updateCateEvent(req, res) {
    const cateId = req.params.id;
    const cateData = req.body;

    const updatedCate = await this.categoryService.updateCateEvent(
      cateId,
      cateData
    );

    res.status(updatedCate.status);
    if (updatedCate.status === 200) {
      res.send(updatedCate);
    }

    res.send({
      error: updatedCate.error
    });
  }

  async deleteCateEvent(req, res) {
    const cateId = req.params.id;

    const deletedCate = await this.categoryService.deleteCateEvent(cateId);
    res.status(deletedCate.status);
    if (deletedCate.status === 200) {
      res.send({
        message: deletedCate.message
      });
    }

    res.send({
      error: deletedCate.error
    });
  }

  async getCateEventById(req, res) {
    const cateId = req.params.id;

    const cateData = await this.categoryService.getCateEventById(cateId);

    res.status(cateData.status);
    if (cateData.status === 200) {
      res.send({
        data: cateData
      });
    }

    res.send({
      error: cateData.error
    });
  }
}
module.exports = CategoryController;
