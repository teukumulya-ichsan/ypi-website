const CommentsModel = require('@comments/models');
const Validate = require('fastest-validator');
const HttpStatus = require('http-status-codes');

class CommentService {
  constructor() {
    this.commentModel = new CommentsModel();
    this.validator = new Validate();
    this.schema = {
      komentar: {
        type: 'string',
        max: 1024
      }
    };
  }

  async indexBerita(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const commentBerita = await this.commentModel.indexBerita(
      search,
      sortBy,
      order
    );

    return {
      data: commentBerita
    };
  }

  async createCommentBerita(data) {
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

    const commentSave = await this.commentModel.createCommentBerita(data);

    if (commentSave.affectedRows === 0) {
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
      message: 'Comment Berhasil di Buat'
    };
  }

  async getCommentBeritaDetail(commentId) {
    const data = await this.commentModel.getCommentBeritaDetail(commentId);

    if (data.length > 0) {
      return {
        status: HttpStatus.OK,
        data: data[0]
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA EMPTY'
    };
  }

  async updateCommentBerita(commentId, commentData) {
    if (!commentId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'commentIs required'
      };
    }

    const existsComment = await this.commentModel.getCommentBeritaDetail(
      commentId
    );
    if (existsComment.length > 0) {
      const updatedComment = await this.commentModel.updateCommentBerita(
        commentId,
        commentData
      );
      if (updatedComment.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'Comment Berhasil di Update'
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

  async deleteCommentBerita(commentId) {
    const existCate = await this.commentModel.getCommentBeritaDetail(commentId);
    if (existCate.length > 0) {
      const deleteComment = await this.commentModel.deleteCommentBerita(
        commentId
      );
      if (deleteComment.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Comment Deleted'
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

  //* ------------------------------ EVENT ----------------------------------- */

  async indexEvent(query) {
    const search = query.query;
    const sortBy = query.sort_by;
    const order = query.order;

    const commentEvent = await this.commentModel.indexEvent(
      search,
      sortBy,
      order
    );

    return {
      data: commentEvent
    };
  }

  async createCommentEvent(data) {
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

    const commentSave = await this.commentModel.createCommentEvent(data);

    if (commentSave.affectedRows === 0) {
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
      message: 'Comment Berhasil di Buat'
    };
  }

  async getCommentEventDetail(commentId) {
    const data = await this.commentModel.getCommentEventDetail(commentId);

    if (data.length > 0) {
      return {
        status: HttpStatus.OK,
        data: data[0]
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      message: 'DATA EMPTY'
    };
  }

  async updateCommentEvent(commentId, commentData) {
    if (!commentId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'commentIs required'
      };
    }

    const existsComment = await this.commentModel.getCommentBeritaDetail(
      commentId
    );
    if (existsComment.length > 0) {
      const updatedComment = await this.commentModel.updateCommentEvent(
        commentId,
        commentData
      );
      if (updatedComment.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }

      return {
        status: HttpStatus.OK,
        message: 'Comment Berhasil di Update'
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

  async deleteCommentEvent(commentId) {
    const existCate = await this.commentModel.getCommentEventDetail(commentId);
    if (existCate.length > 0) {
      const deleteComment = await this.commentModel.deleteCommentEvent(
        commentId
      );
      if (deleteComment.affectedRows !== 1) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal Server Error'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Comment Deleted'
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
}

module.exports = CommentService;
