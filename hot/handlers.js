const db = require('../lib/db')

exports.onMessage = async ({ message, client, hot, privateKey }) => {
  const { tryParseCommandName } = hot(require, './utils')
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
    await hot(require, './ow')({ prefix, parts, message, client, hot })
    return
  }
  
  const commandName = tryParseCommandName(parts[0])
  if (!commandName) {
    return
  }

  const docId = `guild/${message.channel.guild.id}/commands/${commandName}`
  const existingCommand = await db.get(docId).catch(e => null)
  if (!existingCommand) {
    return
  }

  const url = 
  message.reply('Found it!')
}
