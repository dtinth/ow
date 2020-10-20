const db = require('../lib/db')
const live = require('uncache')(require)

module.exports = ({ message, parts, client }) => {
  const { tryParseCommandName, tryParseUrl } = require('./utils')
  if (parts[1] === 'register') {
    const commandName = tryParseCommandName(parts[2])
    if (!commandName) {
      message.reply('Invalid command name. Command names must be alphanumeric.')
      return
    }
    const url = tryParseUrl(parts[3])
    if (!url) {
      message.reply('Please specify a valid URL.')
      return
    }
    if (url.protocol !== 'https:') {
      message.reply('Please specify a valid URL.')
      return
    }
    message.reply('Register!')
    return
  }
  message.reply('Unrecognized command. See documentation: https://ow.wonderful.software/')
}
