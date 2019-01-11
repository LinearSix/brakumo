
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('venues').del()
    .then(function () {
      // Inserts seed entries
      return knex('venues').insert([
        {
          "ven_name": "Sahara Lounge",
          "ven_address_1": "1413 Webberville Rd",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78721",
          "ven_phone": "(512) 927-0700",
          "ven_web": "https://saharalounge.com/",
          "ven_desc": "Laid-back live music venue with an African twist featuring an eclectic lineup & signature cocktails."
        },
        {
          "ven_name": "Spider House Ballroom",
          "ven_address_1": "2908 Fruth St",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78705",
          "ven_phone": "(512) 480-9562",
          "ven_web": "https://spiderhouse.com/",
          "ven_desc": "Eclectic performance space featuring diverse events (live music, DJs & comedy), a full bar & patio."
        },
        {
          "ven_name": "Elysium",
          "ven_address_1": "705 Red River St",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78701",
          "ven_phone": "(512) 478-8385",
          "ven_web": "http://www.elysiumonline.net/",
          "ven_desc": "Goth & industrial dance music from DJs & live bands, with theme nights, sunken dance floor & patio."
        },
        {
          "ven_name": "Empire Control Room",
          "ven_address_1": "606 E 7th St",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78701",
          "ven_phone": "",
          "ven_web": "http://empireatx.com/",
          "ven_desc": "Empire is a 15,000 square foot modern music space at 7th and Red River, dedicated to presenting quirky, warehouse style events that feel more like adventurous discoveries than everyday affairs."
        },
        {
          "ven_name": "The Volstead",
          "ven_address_1": "1500 E 6th St",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78702",
          "ven_phone": "",
          "ven_web": "http://texashotelvegas.com/",
          "ven_desc": "Casual night club with leather couches, cocktails & boasting a massive patio & DJs most nights."
        },
        {
          "ven_name": "Cement Loop",
          "ven_address_1": "5811 Berkman Dr. Ste. 140",
          "ven_address_2": "",
          "ven_city": "Austin",
          "ven_state": "TX",
          "ven_postal": "78723",
          "ven_phone": "",
          "ven_web": "http://www.cementloop.com/",
          "ven_desc": "An unconventional space in a conventional building establishing a creative platform to make, connect and explore art and its craft."
        }
      ]);
    });
};