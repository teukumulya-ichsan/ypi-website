const DBService = require('@common/services/db.common.service.js');

class BeritaModel {
  constructor() {
    this.table = 'berita';
    this.dbService = new DBService();
  }

  async index(search, sortBy = 'id', order = 'DESC', status, is_deleted) {
    let query = `SELECT * from ${this.table}`;

    if (is_deleted) {
      query += ` WHERE is_deleted = 1`;
    } else {
      if (status) {
        query += ` WHERE status = '${status}' AND is_deleted = 0`;
      } else {
        query += ` WHERE status = 'ACTIVE' AND is_deleted = 0`;
      }
    }

    if (search) {
      query += ` AND judul LIKE '%${search}%'`;
    }

    query += ` ORDER BY ${sortBy} ${order}`;

    return await this.dbService.query(query);
  }

  async create(data) {
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
    const query = `SELECT * from ${this.table} where id=?`;

    return await this.dbService.query(query, id);
  }

  async getBeritaDeleted(id) {
    const query = `SELECT id FROM ${this.table} WHERE is_deleted = 1 AND id=?`;

    return await this.dbService.query(query, id);
  }
}

module.exports = BeritaModel;
