const tg_chat_messages = `CREATE TABLE IF NOT EXISTS tg_chat_messages(
            id SERIAL,
            tg_user_id INT,
            tg_id INT,
            created TIMESTAMP DEFAULT Now(),
            updated TIMESTAMP DEFAULT Now(),
            deleted TIMESTAMP DEFAULT Now(),
            text TEXT,
            date  INT,
            photo TEXT,
            is_deleted BOOLEAN DEFAULT false,
            is_updated BOOLEAN DEFAULT false,
            is_viewed BOOLEAN DEFAULT false,
            viewed TIMESTAMP,
            is_from_user BOOLEAN
          )`;

module.exports = tg_chat_messages;