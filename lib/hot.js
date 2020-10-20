exports.createHot = () => {
  const seenMap = new Map()
  return (myRequire, name) => {
    const id = myRequire.resolve(name)
    let seen = seenMap.get(id)
    if (!seen) {
      delete myRequire.cache[id]
      seen = { value: myRequire(id) }
      seenMap.set(id, seen)
    }
    return seen.value
  }
}