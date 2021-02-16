module.exports = function(){

  var self = this;

  self.users = [];

  return {
    add : (_user, chat_id) => {

      if( !self.users.find(user => user.id == _user.id) )
        users.push( { ...user, chat_id : chat_id })
    },
    getUserByChatId : (chat_id) => {
      return self.users.find(user => user.chat_id === chat_id)
    }
  }

}
