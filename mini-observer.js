class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

function observe (obj) {
  // iterate through all properties on the object
  // and convert them into getter/setters with
  // Object.defineProperty()
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key]

    // each property gets a dependency instance
    const dep = new Dep()

    Object.defineProperty(obj, key, {
      // The getter is responsible for registering subscribers
      get () {
        dep.depend()
        return internalValue
      },

      // The setter is responsible for notifying change
      set (newVal) {
        const changed = internalValue !== newVal
        internalValue = newVal
        // triggering re-computation
        if (changed) {
          dep.notify()
        }
      }
    })
  })
  return obj
}

let activeUpdate = null

function autorun (update) {
  // wrap the raw update function into a "job" function that registers and
  // unregisters itself as the current active job when invoked
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}