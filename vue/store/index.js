// ref https://vuex.vuejs.org/en/api.html
const Vuex = require('vuex')
var store = {}
store.state = store.state = {
  login: null
}

store.mutations = store.mutations = {
  login: function (state, val) {
    state.login = val
  }
}

store.actions = {
  login: function (ctx, val) {
    ctx.commit('login', val)
  }
}

store.getters = {}
module.exports = new Vuex.Store(store)

