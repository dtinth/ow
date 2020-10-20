const db = require('../lib/db')
const live = require('uncache')(require)

module.exports = async ({ prefix, message, parts, client }) => {
  const { tryParseCommandName, tryParseUrl } = require('./utils')
  if (parts[1] === 'register') {
    if (parts.length !== 4) {
      message.reply(`Usage: ${prefix}ow register <command-name> <url>`)
      return
    }
    const commandName = tryParseCommandName(parts[2])
    if (!commandName) {
      message.reply('Invalid command name. Command names must be alphanumeric.')
      return
    }
    const url = tryParseUrl(parts[3])
    if (!url) {
      message.reply('Please specify a valid HTTPS URL.')
      return
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      message.reply('Please specify an HTTPS URL.')
      return
    }
    const docId = `guild/${message.channel.guild.id}/commands/${commandName}`
    const existingCommand = await db.get(docId)
    if (existingCommand && existingCommand.owner !== message.author.id) {
      message.reply('This command name is already registered by someone else. Please pick another name.')
      return
    }
    message.reply('Register!')
    return
  }
  message.reply('Unrecognized command. See documentation: https://ow.wonderful.software/')
}
