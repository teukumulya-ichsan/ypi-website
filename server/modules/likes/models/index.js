const DBService = require('@common/services/db.common.service.js');

class LikeModel {
  constructor() {
    this.like_berita = 'berita_like';
    this.like_event = 'event_like';
    this.dbService = new DBService();
  }

  async indexBerita(search, sortBy = 'id_berita', order = 'ASC') {
    let query = `SELECT * from ${this.like_berita}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async indexEvent(search, sortBy = 'id_event', order = 'ASC') {
    let query = `SELECT * from ${this.like_event}`;

    if (search) {
      query += ` AND komentar LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }
}

module.exports = LikeModel;
