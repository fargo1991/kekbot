const notes = `
          CREATE TABLE notes(
            id SERIAL,
            user_id INT,
            images integer[],
            title TEXT,
            content TEXT,
            created TIMESTAMP DEFAULT Now(),
            updated TIMESTAMP DEFAULT null
          )`;

module.exports = notes;