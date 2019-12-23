'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('berita_like', {
      id_user: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      id_berita: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      create_date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('berita_like');
  }
};
