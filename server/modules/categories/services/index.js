const CategoryModel = require('@categories/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

class CategoryService {
  constructor() {
    this.categoryModel = new CategoryModel();
    this.validator = new Validate();
    this.schema = {
      nama: {
        type: 'string',
        min: 5,
        max: 20
      }
    };
  }

  // -----------------------BERITA SERVICES -------------------------//

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;
    const status = query.status;

    const cateData = await this.categoryModel.indexBerita(
      search,
      sortBy,
      order,
      status
    );

    return {
      data: cateData
    };
  }

  async createCateBerita(data) {
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

    const cateSave = await this.categoryModel.createCateBerita(data);
    if (cateSave.affectedRows === 0) {
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
      message: 'Berita Category Created'
    };
  }

  async updateCateBerita(cateId, cateData) {
    if (!cateId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'cateId is required'
      };
    }

    const existCate = await this.categoryModel.getCateBeritaById(cateId);
    if (existCate.length > 0) {
      const updatedCate = await this.categoryModel.updateCateBerita(
        cateId,
        cateData
      );

      if (updatedCate.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Category Updated'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async deleteCateBerita(cateId) {
    const existCate = await this.categoryModel.getCateBeritaById(cateId);
    if (existCate.length > 0) {
      const deletedCate = await this.categoryModel.deleteCateBerita(cateId);
      if (deletedCate.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Category Deleted'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async getCateBeritaById(cateId) {
    const data = await this.categoryModel.getCateBeritaById(cateId);

    if (data.length > 0) {
      return {
        status: HttpStatus.OK,
        data: data[0]
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA NOT FOUND'
    };
  }

  // -----------------------EVENT SERVICES -------------------------//

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;
    const status = query.status;

    const cateData = await this.categoryModel.indexEvent(
      search,
      sortBy,
      order,
      status
    );

    return {
      data: cateData
    };
  }

  async createCateEvent(data) {
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

    const cateSave = await this.categoryModel.createCateEvent(data);
    if (cateSave.affectedRows === 0) {
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
      message: 'Berita Category Created'
    };
  }

  async updateCateEvent(cateId, cateData) {
    if (!cateId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'cateId is required'
      };
    }

    const existCate = await this.categoryModel.getCateEventById(cateId);
    if (existCate.length > 0) {
      const updatedCate = await this.categoryModel.updateCateEvent(
        cateId,
        cateData
      );

      if (updatedCate.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Category Updated'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async deleteCateEvent(cateId) {
    const existCate = await this.categoryModel.getCateEventById(cateId);
    if (existCate.length > 0) {
      const deletedCate = await this.categoryModel.deleteCateEvent(cateId);
      if (deletedCate.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Category Deleted'
      };
    }

    return {
      status: HttpStatus.BAD_REQUEST,
      error: {
        error_code: 'BAD_REQUEST',
        message: 'Unknown ID'
      }
    };
  }

  async getCateEventById(cateId) {
    const data = await this.categoryModel.getCateEventById(cateId);

    if (data.length > 0) {
      return {
        status: HttpStatus.OK,
        data: data[0]
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA NOT FOUND'
    };
  }
}

module.exports = CategoryService;
