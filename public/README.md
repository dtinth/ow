ow Discord Bot
==============

**ow Discord Bot** is a simple Discord bot that lets _everyone_ in your server create a custom Discord commands using a simple HTTP endpoint.

!> This bot is under development; it does not work yet!

The goal of this project is to:

- allow _anyone_ to add custom commands to your Discord server, to foster a community of tinkering.
- let people who uses shared hosting and serverless environments to create simple bots.

## Usage reference

### Adding the bot

First, [add the bot to your server][add].

[add]: https://discord.com/api/oauth2/authorize?client_id=767744745699016754&permissions=8&scope=bot

### Adding a custom command

```
///ow register <command-name> <url>
```

| Placeholder | Description |
| --- | --- |
| `<command-name>` | Name of the command |
| `<url>` | URL to run |

### Handing requests from `ow`

`ow` will send a POST request to your registered endpoint when the custom command is invoked.
To verify the authenticity of the request, please check the `Authorization` header, which is in this form:

```
Authorization: Bearer <jwt>
```

The `<jwt>` token is signed with `RS256` algorithm has the following claims:

| Claim | Description |
| --- | --- |
| `iss` | Token issuer, which is `ow.wonderful.software` |
| `aud` | The Discord guild ID and the name of the command in form of `<guildId>:<commandName>` |
| `sub` | The sender of the message |

It will be signed with the following public key:

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6AwA3yGt9JJYlgeHHCW+
UCeQeJ9VslsFkB6gPoaczJmHYspsxWkJfkGeKUswam26gUHdwkInqFibQ6qtYVhV
WHKEcqrSutpl+s9D/iOv56OJdfVlEJKXLTFtNUwy62QYtRP/GuyZBH+L7CRVbJDV
GsaUESBqU30a1aRUqwPIHV6rppUh86anBgU5Abd5DkgpA46YxXlC9SKNGV/XOXl4
OBSAqG6cE1lbC33cdF3zOI5JHfRIlB2OMq9dqCC68xj35dtuB7ob6kQ6ecYEu//2
mFV+YJRCWaWIxy4NgqD0IVMRVZWkW51z4SN7+1F4ikTaTUrFh8n6JH+x2XUgTs2G
/QIDAQAB
-----END PUBLIC KEY-----
```

## About this bot

### Source code

This bot is [**open source** and runs on Glitch](https://glitch.com/~ow-discord-bot).
The source code is also [mirrored on GitHub](https://github.com/dtinth/ow).