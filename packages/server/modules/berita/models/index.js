const DBService = require('@common/services/db.common.service.js');

class BeritaModel {
  constructor() {
    this.table = 'berita';
    this.dbService = new DBService();
  }

  async index(search, sortBy = 'id', order = 'DESC', status, is_deleted) {
    // let query = `SELECT * from ${this.table}`;
    let query = `SELECT tb1.*, s.name AS author_name, bk.nama AS kategori_name from ${this.table} tb1, user s, berita_kategori bk WHERE tb1.create_user=s.user_id AND tb1.id_kategori=bk.id `;

    if (is_deleted) {
      query += ` AND tb1.is_deleted = 1`;
    } else {
      if (status) {
        query += ` and tb1.status = '${status}' AND tb1.is_deleted = 0`;
      } else {
        query += ` and tb1.status = 'ACTIVE' AND tb1.is_deleted = 0`;
      }
    }

    if (search) {
      query += ` AND tb1.judul LIKE '%${search}%'`;
    }

    query += ` ORDER BY tb1.${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async create(data) {
    console.log(data);
    const query = `INSERT into ${this.table} SET ?`;
    const result = await this.dbService.query(query, data);

    return result;
  }

  async update(beritaId, data) {
    const query = `UPDATE ${this.table}
                   SET ?
                   WHERE id=?`;

    const result = await this.dbService.query(query, [data, beritaId]);

    return result;
  }

  // this function is gonna not using because using soft deleted
  async delete(id) {
    const query = `DELETE from ${this.table} where id=?`;

    return await this.dbService.query(query, id);
  }

  async getById(id) {
    const query = `SELECT tb1.*, s.name AS author_name, bk.nama AS kategori_name FROM ${this.table} tb1, user s, berita_kategori bk WHERE tb1.create_user=s.user_id and tb1.id_kategori=bk.id AND tb1.id=?`;

    return await this.dbService.query(query, id);
  }

  async getBeritaDeleted(id) {
    const query = `SELECT id FROM ${this.table} WHERE is_deleted = 1 AND id=?`;

    return await this.dbService.query(query, id);
  }
}

module.exports = BeritaModel;
