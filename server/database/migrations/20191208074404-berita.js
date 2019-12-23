'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('berita', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      photo_url: Sequelize.TEXT,
      video_url: Sequelize.TEXT,
      judul: Sequelize.STRING(150),
      ringkasan: Sequelize.TEXT,
      konten: Sequelize.TEXT,
      waktu_terbit: Sequelize.DATE,
      waktu_berakhir: Sequelize.DATE,
      id_kategori: Sequelize.INTEGER(11),
      status: Sequelize.STRING(10),
      create_user: Sequelize.INTEGER(11),
      create_date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      edit_user: Sequelize.INTEGER(11),
      edit_date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('berita');
  }
};
