export default [
    {
        key : 'template1',
        text : 'Стандартный пост из предложки',
        caption : 'Следующее фото ВАШЕ!☝️😉\nСвои стоп-кадры 📸 кидайте в личку админа📬 @rustradamus',
        /**
         * need obj with
         * @text,
         * textbox, @author
         * */

        render : function(params){
            return `${params.text}\n\nАвтор: ${params.author}\n\n${this.caption}`
        }
    }
]