import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state() {
    return {
      msg: 'hello',
      name: 'wff',
      age: 25
    }
  },
  getters: {
    realMsg(state) {
      return state.msg + 'real '
    }
  },
  actions: {
    changePerson(args:Record<string, any>) {
      this.name = 'yh'
      this.age = 24
      otherStore().changeMsg()
    }
  }
})

export const otherStore = defineStore('other', {
  state() {
    return {
      otherMsg: 'hi'
    }
  },
  actions: {
    changeMsg() {
      this.otherMsg = 'hello'
    }
  }
})

export const curStore = defineStore('other', {
  state() {
    return {
      session: {

      }
    }
  },
  actions: {
    changeMsg() {

    }
  }
})
