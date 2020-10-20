const express = require("express");
const app = express();
const { createHot } = require('./lib/hot')

const Discord = require('discord.js')
const client = new Discord.Client()
const privateKey = require('fs').readFileSync('.data/jwtRS256.key', 'utf8')

app.use(express.static("public"));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  try {
    const hot = createHot()
    await hot(require, './hot/handlers').onMessage({ message: msg, client, hot, privateKey })
  } catch (error) {
    console.error(
      'Cannot process message',
      msg.id,
      'from',
      msg.author.tag,
      'in',
      msg.channel && msg.channel.name,
      msg.channel && msg.channel.guild && msg.channel.guild.name,
      error,
    )
  }
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

client.login(process.env.DISCORD_TOKEN)
