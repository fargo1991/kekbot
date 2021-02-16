const suggestions = `
        CREATE TABLE suggestions(
        id SERIAL,
        user_id INT,
        image_id INT,
        post_id INT,
        text TEXT,
        is_approved BOOLEAN DEFAULT false,
        is_publicated BOOLEAN DEFAULT false,
        is_deferred BOOLEAN DEFAULT false,
        is_deleted BOOLEAN DEFAULT false,
        approved TIMESTAMP DEFAULT null,
        publicated TIMESTAMP DEFAULT null,
        created TIMESTAMP DEFAULT Now(),
        updated TIMESTAMP DEFAULT null,
        deleted TIMESTAMP DEFAULT null
        )`;

module.exports = suggestions;