const posts = `
            CREATE TABLE posts(
                id SERIAL,
                suggestion_id INT,
                image_id INT,
                caption TEXT,
                is_publicated BOOLEAN DEFAULT false,
                is_deferred BOOLEAN DEFAULT false,
                is_scheduled BOOLEAN DEFAULT false,
                is_deleted BOOLEAN DEFAULT false,
                publicated TIMESTAMP DEFAULT null,
                created_user_id INT,
                updated_user_id INT,
                created TIMESTAMP DEFAULT Now(),
                updated TIMESTAMP DEFAULT Now(),
                deleted TIMESTAMP DEFAULT null
            )`;

module.exports = posts;