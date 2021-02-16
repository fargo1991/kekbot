const tg_users = `CREATE TABLE tg_users(
            id SERIAL,
            tg_id INT,
            tg_username TEXT,
            tg_nickname TEXT
          )`;

module.exports = tg_users;