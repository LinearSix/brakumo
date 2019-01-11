
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {
          "blog_date": "2018-08-16",
          "blog_show_id": 1,
          "blog_title": "Barely an ER visit",
          "blog_content": "I only needed 8 stitches from the bottle that clipped my head last night. I think that's reason enough to call it the best show to date!",
        },
        {
          "blog_date": "2018-08-19",
          "blog_show_id": 2,
          "blog_title": "Friday! Friday! Friday!",
          "blog_content": "I can't believe someone actually booked me on a Friday night. Idiots",
        }
      ]);
    });
};
