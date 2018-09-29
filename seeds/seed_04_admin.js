
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {
          "admin_username": "linearsix",
          "admin_password": "1BrakumoIsEnough!"
        },
      ]);
    });
};
