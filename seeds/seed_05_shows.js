
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shows').insert([
        {
          "venue_id": 6,
          "show_date": "2019-02-16",
          "show_time": "20:00:00",
          "show_info": "Our debut show! Come see the chaos that is sure to ensue.",
          "show_ticket_link": "NA"
        },
        {
          "venue_id": 5,
          "show_date": "2019-03-11",
          "show_time": "18:00:00",
          "show_info": "We are honored to open Austin's premier experimental music night!",
          "show_ticket_link": "NA"
        }
      ]);
    });
};
