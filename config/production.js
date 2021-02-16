module.exports = {
    MODE : 'PRODUCTION',

    /**
     *  DB_START_MODE
     *  Установить DEFAULT для стандартного подключения к базе данных
     *  Установить RESET для полного стирания базы данных и инициализации новой. Внимание,
     *  данный режим рекомендуется только для первой установки приложения.
     * */

    DB_START_MODE : 'DEFAULT', //'RESET' or 'DEFAULT',

    /**
     * REST_API_URL
     * Фактический адрес url
     * */

    REST_API_URL : "sample.com",

    /**
     * REST_API_PORT
     * Порт для REST-API сервера. Стартует на localhost
     * */

    REST_API_PORT : 1234,

    /**
     * IMAGE_STORAGE_FULL_PATH
     * Путь для сохранения изображений. Фактический путь по которому будут сохраняться ихображения
     * `${IMAGE_STORAGE_FULL_PATH}/storage`
     * */

    IMAGE_STORAGE_FULL_PATH : '/var/kekbot',

    /**
     * CHANNEL
     * Адрес канала для публикаций постов
     * */

    CHANNEL : "@your_channel",

    /**
     * Конфиг для базы данных
     * */

    DB : {
        user: '',
        host: 'localhost',
        database: '',
        password: '',
        port: 5432,
    },

    ADMIN_USERS : [
        {
            id : 1,
            login : 'admin',
            password : 'admin',
            role : "SUPER_ADMIN",
            token : "sdfdfsasdf342df"
        },
        {
            id : 2,
            login : 'admin2',
            password : 'admin2',
            role : "ADMIN",
            token : "adsfsdfsdf"
        },
        {
            id :  3,
            login : 'tlgrm',
            password : 'qwerrt',
            role : "TELEGRAM",
            token : "asdfdfwef2efw"
        }
    ],

    VERSION  : require("./version.js")
}