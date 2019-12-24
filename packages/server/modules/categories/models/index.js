const DBService = require('@common/services/db.common.service.js');

class CategoryModel {
  constructor() {
    this.cate_berita = 'berita_kategori';
    this.cate_event = 'event_kategori';
    this.dbService = new DBService();
  }
  // ----------------------------- BERITA ------------------------//
  async indexBerita(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT tb1.*, s.name AS creator_name from ${this.cate_berita} tb1, user s WHERE tb1.create_user=s.user_id`;

    if (search) {
      query += ` AND tb1.nama LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async getCateBeritaById(id) {
    const query = `SELECT tb1.*, s.name AS creator_name from ${this.cate_berita} tb1, user s WHERE tb1.create_user=s.user_id AND tb1.id=?`;

    return await this.dbService.query(query, id);
  }

  async createCateBerita(data) {
    const query = `INSERT into ${this.cate_berita} SET ?`;

    return await this.dbService.query(query, data);
  }

  async updateCateBerita(cateId, data) {
    const query = `UPDATE ${this.cate_berita}
                   SET ?
                   WHERE id=?`;

    const result = await this.dbService.query(query, [data, cateId]);
    return result;
  }

  async deleteCateBerita(id) {
    const query = `DELETE from ${this.cate_berita} where id=?`;

    return await this.dbService.query(query, id);
  }

  // ----------------------------- EVENT ------------------------//
  async indexEvent(search, sortBy = 'id', order = 'ASC') {
    let query = `SELECT tb1.*, s.name AS creator_name from ${this.cate_event} tb1, user s WHERE tb1.create_user=s.user_id`;

    if (search) {
      query += ` AND tb1.nama LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async getCateEventById(id) {
    const query = `SELECT tb1.*, s.name AS creator_name from ${this.cate_event} tb1, user s WHERE tb1.create_user=s.user_id AND tb1.id=?`;

    return await this.dbService.query(query, id);
  }

  async createCateEvent(data) {
    const query = `INSERT into ${this.cate_event} SET ?`;

    return await this.dbService.query(query, data);
  }

  async updateCateEvent(cateId, data) {
    const query = `UPDATE ${this.cate_event}
                   SET ?
                   WHERE id=?`;

    const result = await this.dbService.query(query, [data, cateId]);
    return result;
  }

  async deleteCateEvent(id) {
    const query = `DELETE from ${this.cate_event} where id=?`;

    return await this.dbService.query(query, id);
  }
}

module.exports = CategoryModel;
