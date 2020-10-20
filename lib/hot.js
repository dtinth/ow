exports.HotContext = class HotContext {
  constructor() {
    this.seen = new Map()
  }
  with(myRequire) {
    return (name) => {
      const id = myRequire.resolve(name)
      let seen = this.seen.get(id)
      if (!seen) {
        delete myRequire.cache[id]
        seen = { value: myRequire(id) }
        this.seen.set(id, seen)
      }
      return seen.value
    }
  }
}