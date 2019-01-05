
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shows').insert([
        {
          "venue_id": 1,
          "show_date": "2019-08-15",
          "show_time": "12:29:45",
          "show_info": "$100 cover - free parking",
          "show_ticket_link": "NA"
        },
        {
          "venue_id": 2,
          "show_date": "2019-08-18",
          "show_time": "12:29:45",
          "show_info": "With special guests Dick Dribbler, Poopshoot, and Metallica",
          "show_ticket_link": "NA"
        },
        {
          "venue_id": 3,
          "show_date": "2019-08-16",
          "show_time": "12:29:45",
          "show_info": "Album release party with free peppermint string cheese and okra buffet",
          "show_ticket_link": "https://www.ticketmaster.com/"
        },
        {
          "venue_id": 2,
          "show_date": "2019-09-18",
          "show_time": "13:29:45",
          "show_info": "With special guests Papa Hemmingway, Foolproof, and Radiohead",
          "show_ticket_link": "https://www.ticketmaster.com/"
        },
        {
          "venue_id": 4,
          "show_date": "2019-10-18",
          "show_time": "13:29:45",
          "show_info": "Free beer, free love, nude jack-o-lantern carving contest",
          "show_ticket_link": "http://www.frontgatetickets.com/"
        },
        {
          "venue_id": 3,
          "show_date": "2019-10-20",
          "show_time": "13:29:45",
          "show_info": "Why would you go to this when there are so many other cool things happening?",
          "show_ticket_link": "https://www.ticketmaster.com/"
        }
      ]);
    });
};
