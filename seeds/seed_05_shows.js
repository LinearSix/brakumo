
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shows').insert([
        {
          "venue_id": 1,
          "show_date": "2018-08-15",
          "show_time": "12:29:45",
          "show_info": "$100 cover - free parking",
          "show_ticket_link": "NA"
        },
        {
          "venue_id": 2,
          "show_date": "2018-08-18",
          "show_time": "12:29:45",
          "show_info": "With special guests Dick Dribbler, Poopshoot, and Metallica",
          "show_ticket_link": "NA"
        },
        {
          "venue_id": 3,
          "show_date": "2018-08-16",
          "show_time": "12:29:45",
          "show_info": "Album release party with free peppermint string cheese and okra buffet",
          "show_ticket_link": "https://www.ticketmaster.com/"
        },
        {
          "venue_id": 2,
          "show_date": "2018-09-18",
          "show_time": "13:29:45",
          "show_info": "With special guests Papa Hemmingway, Foolproof, and Radiohead",
          "show_ticket_link": "https://www.ticketmaster.com/"
        }
      ]);
    });
};
