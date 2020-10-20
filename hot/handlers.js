const db = require('../lib/db')
const live = require('uncache')(require)

exports.onMessage = async (message, { client }) => {
  if (message.author.id === client.user.id) {
    return
  }
  if (!message.member) {
    message.reply('For information on how to use this bot, please check its documentation: https://ow.wonderful.software/')
    return
  }
  const prefix = '///'
  if (typeof message.content !== 'string') {
    return
  }
  if (!message.content.startsWith(prefix)) {
    return
  }

  const parts = message.content.substr(prefix.length).split(/\s+/)
  if (parts[0] === 'ow') {
    await live('./ow')({ parts, message, client })
    return
  }
}
