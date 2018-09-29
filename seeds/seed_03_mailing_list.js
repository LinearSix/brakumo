
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('mailing_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('mailing_list').insert([
        {
          "mail_email": "johnny_walker@austinchronicle.com",
          "mail_state": "Texas",
          "mail_preference_1": "FALSE",
          "mail_preference_2": "FALSE"
        },
        {
          "mail_email": "jim_beam@pitchfork.com",
          "mail_state": "California",
          "mail_preference_1": "FALSE",
          "mail_preference_2": "FALSE"
        },
        {
          "mail_email": "jack_daniels@rollingstone.com",
          "mail_state": "New York",
          "mail_preference_1": "FALSE",
          "mail_preference_2": "FALSE"
        }
      ]);
    });
};