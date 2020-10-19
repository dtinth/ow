exports.onMessage = async (message, { client }) => {
  if (message.author.id === client.user.id) {
    return
  }
  if (!message.member) {
    message.reply('For information on how to use this bot, please check its documentation: https://ow-discord-bot.glitch.me/')
    return
  }
  message.reply('ugh')
}
