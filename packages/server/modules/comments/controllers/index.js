const CommentService = require('@comments/services');

class CommentController {
  constructor() {
    this.commentService = new CommentService();

    //* ------------------- BERITA ------------------- //
    this.indexBerita = this.indexBerita.bind(this);
    this.createCommentBerita = this.createCommentBerita.bind(this);
    this.getCommentBeritaDetail = this.getCommentBeritaDetail.bind(this);
    this.updateCommentBerita = this.updateCommentBerita.bind(this);
    this.deleteCommentBerita = this.deleteCommentBerita.bind(this);

    //* ------------------- EVENT ------------------- //
    this.indexEvent = this.indexEvent.bind(this);
    this.createCommentEvent = this.createCommentEvent.bind(this);
    this.getCommentEventDetail = this.getCommentEventDetail.bind(this);
    this.updateCommentEvent = this.updateCommentEvent.bind(this);
    this.deleteCommentEvent = this.deleteCommentEvent.bind(this);
  }

  async indexBerita(req, res) {
    const result = await this.commentService.indexBerita(req.query);
    res.send(result);
  }

  async getCommentBeritaDetail(req, res) {
    const data = await this.commentService.getCommentBeritaDetail(
      req.params.id
    );

    res.send(data);
  }

  async createCommentBerita(req, res) {
    const saveComment = await this.commentService.createCommentBerita(req.body);

    res.status(saveComment.status);
    if (saveComment.status === 200) {
      res.send(saveComment);
    }
  }

  async updateCommentBerita(req, res) {
    const commentId = req.params.id;
    const commentData = req.body;

    const updatedComment = await this.commentService.updateCommentBerita(
      commentId,
      commentData
    );

    res.status(updatedComment.status);
    if (updatedComment.status === 200) {
      res.send(updatedComment);
    }

    res.send({
      error: updatedComment.error
    });
  }

  async deleteCommentBerita(req, res) {
    const commentId = req.params.id;

    const deleteComment = await this.commentService.deleteCommentBerita(
      commentId
    );

    res.status(deleteComment.status);

    if (deleteComment.status === 200) {
      res.send({
        message: deleteComment.message
      });
    }

    res.send({
      error: deleteComment.error
    });
  }

  //* ------------------------------ EVENT ----------------------------------- */

  async indexEvent(req, res) {
    const result = await this.commentService.indexEvent(req.query);
    res.send(result);
  }
  async createCommentEvent(req, res) {
    const saveComment = await this.commentService.createCommentEvent(req.body);

    res.status(saveComment.status);
    if (saveComment.status === 200) {
      res.send(saveComment);
    }
  }

  async getCommentEventDetail(req, res) {
    const data = await this.commentService.getCommentEventDetail(req.params.id);

    res.send(data);
  }

  async updateCommentEvent(req, res) {
    const commentId = req.params.id;
    const commentData = req.body;

    const updatedComment = await this.commentService.updateCommentEvent(
      commentId,
      commentData
    );

    res.status(updatedComment.status);
    if (updatedComment.status === 200) {
      res.send(updatedComment);
    }

    res.send({
      error: updatedComment.error
    });
  }

  async deleteCommentEvent(req, res) {
    const commentId = req.params.id;

    const deleteComment = await this.commentService.deleteCommentEvent(
      commentId
    );

    res.status(deleteComment.status);

    if (deleteComment.status === 200) {
      res.send({
        message: deleteComment.message
      });
    }

    res.send({
      error: deleteComment.error
    });
  }
}

module.exports = CommentController;
