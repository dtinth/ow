
exports.tryParseCommandName = (name) => {
  name = String(name)
  return name.match(/^[a-z0-9_-]+$/) ? name : null
}

exports.tryParseUrl = (input) => {
  try {
    return new URL(input)
  } catch (e) {
    return null
  }
}