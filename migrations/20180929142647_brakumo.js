
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable("venues", function (table) {
        table.increments('ven_id').primary();
        table.string('ven_name').notNullable().defaultTo('');
        table.string('ven_address_1').notNullable().defaultTo('');
        table.string('ven_address_2').notNullable().defaultTo('');
        table.string('ven_city').notNullable().defaultTo('');
        table.string('ven_state').notNullable().defaultTo('');
        table.string('ven_postal').notNullable().defaultTo('');
        table.string('ven_phone').notNullable().defaultTo('');
        table.string('ven_web').notNullable().defaultTo('');
        table.string('ven_desc').notNullable().defaultTo('');
      }),
  
      knex.schema.createTable("press", function (table) {
        table.increments('press_id').primary();
        table.date('press_date');
        table.string('press_publication').notNullable().defaultTo('');
        table.string('press_author').notNullable().defaultTo('');
        table.string('press_content').notNullable().defaultTo('');
        table.string('press_link').notNullable().defaultTo('');
      }),

      knex.schema.createTable("mailing_list", function (table) {
        table.increments('mail_id').primary();
        table.string('mail_name').notNullable().defaultTo('');
        table.string('mail_email').notNullable().defaultTo('');
        table.string('mail_state').notNullable().defaultTo('');
        table.integer('mail_preference_1').notNullable().defaultTo(1);
        table.integer('mail_preference_2').notNullable().defaultTo(1);
      }),

      knex.schema.createTable("admin", function (table) {
        table.increments('admin_id').primary();
        table.string('admin_username').notNullable().defaultTo('');
        table.string('admin_password').notNullable().defaultTo('');
      }),

      knex.schema.createTable("shows", function (table) {
        table.increments('show_id').primary();
        table.integer('venue_id');
        table.foreign('venue_id').onDelete('CASCADE').references('ven_id').inTable('venues');
        table.date('show_date');
        table.time('show_time');
        table.string('show_info').notNullable().defaultTo('');
        table.string('show_ticket_link').notNullable().defaultTo('');
      }),
      
      knex.schema.createTable("blogs", function (table) {
        table.increments('blog_id').primary();
        table.integer('blog_show_id');
        table.foreign('blog_show_id').onDelete('CASCADE').references('show_id').inTable('shows');
        table.date('blog_date');
        table.string('blog_title').notNullable().defaultTo('');
        table.string('blog_content', 1000).notNullable().defaultTo('');
      }),
    ]);
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("blogs"),
        knex.schema.dropTable("shows"),
        knex.schema.dropTable("venues"),
        knex.schema.dropTable("press"),
        knex.schema.dropTable("admin"),
        knex.schema.dropTable("mailing_list")
    ]);
  };