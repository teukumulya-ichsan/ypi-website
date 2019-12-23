const DBService = require('@common/services/db.common.service.js');

class CommentModel {
  constructor() {
    this.comment_berita = 'berita_komentar';
    this.comment_event = 'event_komentar';
    this.dbService = new DBService();
  }

  async indexBerita(search, sortBy = 'id', order = 'DESC') {
    let query = `SELECT * from ${this.comment_berita}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async createCommentBerita(data) {
    let query = `INSERT INTO ${this.comment_berita} SET ?`;
    return await this.dbService.query(query, data);
  }

  async getCommentBeritaDetail(commentId) {
    const query = `SELECT * from ${this.comment_berita} WHERE id=?`;

    return await this.dbService.query(query, commentId);
  }

  async updateCommentBerita(commentId, data) {
    let query = `UPDATE ${this.comment_berita} SET ? WHERE id=?`;

    return await this.dbService.query(query, [data, commentId]);
  }

  async deleteCommentBerita(id) {
    const query = `DELETE from ${this.comment_berita} where id=?`;

    return await this.dbService.query(query, id);
  }

  //* ------------------------ EVENT ------------------------ *//

  async indexEvent(search, sortBy = 'id', order = 'DESC') {
    let query = `SELECT * from ${this.comment_event}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async createCommentEvent(data) {
    let query = `INSERT INTO ${this.comment_event} SET ?`;
    return await this.dbService.query(query, data);
  }

  async getCommentEventDetail(commentId) {
    const query = `SELECT * from ${this.comment_event} WHERE id=?`;

    return await this.dbService.query(query, commentId);
  }

  async updateCommentEvent(commentId, data) {
    let query = `UPDATE ${this.comment_event} SET ? WHERE id=?`;

    return await this.dbService.query(query, [data, commentId]);
  }

  async deleteCommentEvent(id) {
    const query = `DELETE from ${this.comment_event} where id=?`;

    return await this.dbService.query(query, id);
  }
}

module.exports = CommentModel;
