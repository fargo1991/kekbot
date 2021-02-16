var CONFIG = require("../config");

// активирует заглушку для режима dev
const FAKE_MODE = process.env.MODE === 'DEV';

module.exports = function(bot, db){

  return {
    postSuggestion : (suggestionId) => {
      let suggestion,
          images,
          tgToken = CONFIG.ADMIN_USERS.find(u => u.role === "TELEGRAM").token;

      return db.query(`SELECT * from suggestions WHERE id=${suggestionId}`)
        .then(
          result => {

            suggestion = result.rows[0];

            /**
             * @photoUrl не должен содержать:
             *  - порт,
             *  - название файла не должно начинаться с цифры,
             *  - в ответе сервера на GET-запрос обязательно должен передаваться mime-type, соответствующий
             *    типу файла, адрес файла должен быть доступен из сети Internet.
             *  - желательно (возможно, обязательно) соединение должно быть защищено шифрованием SSL(TLS)
             *
             *  для публикации фотографий через бота необходимо убедиться, что аккаунт бота подписан на канал
             *  и имеет права администратора
             * */
            let photoUrl  = `https://${CONFIG.REST_API_URL}/api/v1/image_for_tg/${tgToken}/image_${suggestion.image_id}`;

            if(FAKE_MODE)
                return new Promise( (resolve, reject) => setTimeout(() =>{resolve()}, 1000) );

            return bot.sendPhoto(
              CONFIG.CHANNEL,
              photoUrl,
                { caption : `${suggestion.text} \n автор: ${suggestion.user_id} \n Опубликовано через @ReStradamusBot`}
              )
          }
        )
    },
    publicPost : (postId) => {
        let post,
            images,
            tgToken = CONFIG.ADMIN_USERS.find(u => u.role === "TELEGRAM").token;

        return db.query(`SELECT * from posts WHERE id=${postId}`)
            .then(
                result => {

                    post = result.rows[0];

                    /**
                     * @photoUrl не должен содержать:
                     *  - порт,
                     *  - название файла не должно начинаться с цифры,
                     *  - в ответе сервера на GET-запрос обязательно должен передаваться mime-type, соответствующий
                     *    типу файла, адрес файла должен быть доступен из сети Internet.
                     *  - желательно (возможно, обязательно) соединение должно быть защищено шифрованием SSL(TLS)
                     *
                     *  для публикации фотографий через бота необходимо убедиться, что аккаунт бота подписан на канал
                     *  и имеет права администратора
                     * */
                    let photoUrl  = `https://${CONFIG.REST_API_URL}/api/v1/image_for_tg/${tgToken}/image_${post.image_id}`;

                    if(FAKE_MODE)
                        return new Promise( (resolve, reject) => setTimeout(() =>{resolve()}, 1000) );

                    return bot.sendPhoto(
                        CONFIG.CHANNEL,
                        photoUrl,
                        { caption : `${post.caption}`}
                    )
                }
            )
    }
  }

};