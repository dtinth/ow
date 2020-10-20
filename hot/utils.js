
exports.tryParseCommandName = (name) => {
  name = String(name)
  return name.match(/^[a-z0-9_-]{1,32}$/) ? name : null
}

exports.tryParseUrl = (input) => {
  try {
    return new URL(input)
  } catch (e) {
    return null
  }
}