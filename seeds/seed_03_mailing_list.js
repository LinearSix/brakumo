
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mailing_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('mailing_list').insert([
        {
          "mail_name": "Johnny Walker",
          "mail_email": "johnny_walker@austinchronicle.com",
          "mail_state": "Texas",
          "mail_preference_1": 1,
          "mail_preference_2": 1
        },
        {
          "mail_name": "Jim Beam",
          "mail_email": "jim_beam@pitchfork.com",
          "mail_state": "California",
          "mail_preference_1": 2,
          "mail_preference_2": 2
        },
        {
          "mail_name": "Jack Daniels",
          "mail_email": "jack_daniels@rollingstone.com",
          "mail_state": "New York",
          "mail_preference_1": 1,
          "mail_preference_2": 2
        }
      ]);
    });
};