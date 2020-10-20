const db = require('../lib/db')
const axios = require('axios')
const { sign } = require('jsonwebtoken')

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

  let text = message.content
  let replyTo = message.author.toString()
  {
    const m = text.match(/^<@!?\d+>\s*/)
    if (m) {
      replyTo = m[0].trim()
      text = text.substr(m[0].length)
    }
  }
  if (!text.startsWith(prefix)) {
    return
  }
  text = text.substr(prefix.length)
  const parts = text.split(/\s+/)
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

  const url = existingCommand.url
  const jwt = sign({
  }, privateKey, {
    algorithm: 'RS256',
    expiresIn: 60,
    issuer: 'ow.wonderful.software',
    audience: `${message.channel.guild.id}:${commandName}`,
    subject: message.author.id,
  })
  const payload = {
    text,
    message: pick(message, {
      content: true,
      createdTimestamp: true,
      embeds: true,
      member: {
        displayHexColor: true,
        displayName: true,
        user: {
          id: true,
          tag: true,
          username: true,
        },
      },
      channel: {
        id: true,
        name: true,
        guild: {
          id: true,
          name: true,
        },
      },
    })
  }
  const response = await axios.post(url, payload, {
    headers: {
      authorization: `Bearer ${jwt}`
    },
    validateStatus: () => true,
  })
  message.channel.send(replyTo + ' ' + String(response.data))
}

function pick(thing, schema) {
  if (schema === true) return thing
  if (Array.isArray(thing)) {
    return thing.map(el => pick(el, schema))
  }
  if (!thing) {
    return thing
  }
  const out = {}
  for (const key of Object.keys(schema)) {
    out[key] = pick(thing[key], schema[key])
  }
  return out
}