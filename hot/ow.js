const db = require('../lib/db')
const axios = require('axios')

module.exports = async ({ prefix, message, parts, client, hot }) => {
  const { tryParseCommandName, tryParseUrl } = hot(require, './utils')
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
    if (commandName === 'ow') {
      message.reply('Command name "ow" is reserved.')
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
    const existingCommand = await db.get(docId).catch(e => null)
    if (existingCommand && existingCommand.owner && existingCommand.owner !== message.author.id) {
      message.reply('This command name is already registered by someone else. Please pick another name.')
      return
    }
    await db.put({
      _id: docId,
      _rev: existingCommand && existingCommand._rev,
      type: 'command',
      owner: message.author.id,
      guildId: message.channel.guild.id,
      commandName: commandName,
      url: String(url),
      updated: new Date().toJSON(),
    })
    message.reply(`Registered command ${prefix}${commandName}`)
    return
  }
  message.reply('Unrecognized command. See documentation: https://ow.wonderful.software/')
}
