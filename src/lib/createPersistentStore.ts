import { writable, Writable, get } from 'svelte/store'

function localStorageBacked<T> (key, initialValue): Writable<T> {
  const store = writable(initialValue)
  const { subscribe, set } = store

  const json = localStorage.getItem(key)

  if (json !== null) {
    set(JSON.parse(json))
  }

  return {
    set (value) {
      localStorage.setItem(key, JSON.stringify(value))
      set(value)
    },

    update (cb) {
      const value = cb(get(store))
      set(value)
    },

    subscribe
  }
}

export default localStorageBacked