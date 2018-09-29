
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('press').del()
    .then(function () {
      // Inserts seed entries
      return knex('press').insert([
        {
          "press_date": "2017-04-20",
          "press_publication": "The Austin Chronicle",
          "press_author": "Johnny Walker",
          "press_content": "Without a doubt, the shittiest band I've ever seen allowed on a stage. I had to make a doctor's appointment the following day.",
          "press_link": "https://www.austinchronicle.com/"
        },
        {
          "press_date": "2018-01-01",
          "press_publication": "Pitchfork",
          "press_author": "Jim Beam",
          "press_content": "I really started my new year off wrong by listening to the latest offering from Brakumo. I could make better music by vomitting on my cat, which I actually did 10 seconds into the first track.",
          "press_link": "https://pitchfork.com/"
        },
        {
          "press_date": "2018-06-05",
          "press_publication": "Rolling Stone",
          "press_author": "Jack Daniels",
          "press_content": "I wish I'd received a CD or LP of Brakumo's lateset album so I could line my birdcage with the cover art.",
          "press_link": "https://www.rollingstone.com/"
        }
      ]);
    });
};
