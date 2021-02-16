const images = `
        CREATE TABLE images(
        id SERIAL,
        width INT,
        height INT,
        path TEXT,
        small_image_ids integer[]
      )`;

module.exports = images;