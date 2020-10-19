ow Discord Bot
==============

**ow Discord Bot** is a simple Discord bot that lets _everyone_ in your server create a custom Discord commands using a simple HTTP endpoint.

## Usage reference

### Adding the bot

First, [add the bot to your server][add].

[add]: https://discord.com/api/oauth2/authorize?client_id=767744745699016754&permissions=8&scope=bot

### Adding a custom command

```
///ow register <command-name> <url>
```

- `<command-name>` Name of the command.
- `<url>` URL to run.

### Handing requests from `ow`

`ow` will send a POST request to your registered endpoint.
To verify the authenticity of the request, please check the `authorization` header, which is in this form:

```
authorization: bearer <jwt>
```

- `<jwt>` A JWT token 

## About this bot

### Source code

This bot is [**open source** and runs on Glitch](https://glitch.com/~ow-discord-bot).
The source code is also [mirrored on GitHub](https://github.com/dtinth/ow).