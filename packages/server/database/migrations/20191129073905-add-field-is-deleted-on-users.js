"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "users",
          "is_deleted",
          {
            type: Sequelize.INTEGER(1),
            after: "password",
            defaultValue: 0
          },
          { transaction: t }
        )
      ]).then(() => {});
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("users", "is_deleted", { transaction: t })
      ]);
    });
  }
};
