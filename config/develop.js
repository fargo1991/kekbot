module.exports = {
    MODE : 'DEV',

    /**
     *  DB_START_MODE
     *  Установить DEFAULT для стандартного подключения к базе данных
     *  Установить RESET для полного стирания базы данных и инициализации новой. Внимание,
     *  данный режим рекомендуется только для первой установки приложения.
     * */

    DB_START_MODE : 'UPDATE', //'RESET' or 'DEFAULT' or 'UPDATE',

    /**
     * REST_API_URL
     * Фактический адрес url
     * */

    REST_API_URL : "localhost",

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

    IMAGE_STORAGE_FULL_PATH : '/Users/yaroslavposlavsky/WebstormProjects/kekbot',

    /**
     * CHANNEL
     * Адрес канала для публикаций постов
     * */

    CHANNEL : "@bold_tg",

    /**
     * Конфиг для базы данных
     * */

    DB : {
        user: 'postgres',
        host: 'localhost',
        database: 'kek',
        password: '',
        port: 5432
    },


    ADMIN_USERS : [
        {
            id : 1,
            login : 'admin',
            password : 'admin',
            role : "SUPER_ADMIN",
            token : "qwerty"
        },
        {
            id : 2,
            login : 'admin_adminov',
            password : 'admin',
            role : "ADMIN",
            token : "qwerty123"
        },
        {
            id :  3,
            login : 'tlgrm',
            password : 'tlgrm',
            role : "TELEGRAM",
            token : "qwerty123123123"
        }
    ],

    VERSION  : require("./version.js")
}