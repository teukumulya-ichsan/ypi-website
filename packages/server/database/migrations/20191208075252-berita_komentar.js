'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('berita_komentar', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      id_user: Sequelize.INTEGER(11),
      id_berita: Sequelize.INTEGER(11),
      komentar: Sequelize.STRING(300),
      create_date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      parent: Sequelize.INTEGER(11),
      status: Sequelize.STRING(10)
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('berita_komentar');
  }
};
