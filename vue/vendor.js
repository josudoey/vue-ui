const main = async function () {
  require('~pages/style.css').use()
  const Vue = require('vue')
  const Vuex = require('vuex').default
  Vue.use(Vuex)
  const VueRouter = require('vue-router').default
  Vue.use(VueRouter)

  const axios = require('axios')
  const VueAxios = require('vue-axios')
  Vue.use(VueAxios, axios)
  const store = require('./store')
  const router = require('./router')

  const csrfToken = document.querySelector('meta[name="csrf-token"]')
  if (csrfToken) {
    const csrf = store.state.csrf = axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.getAttribute('content')
  }

  router.afterEach(function (to, from) {})

  router.beforeEach(function (to, from, next) {
    next()
  })
  try {
    const vm = window.vm = new Vue({
      router,
      store
    }).$mount('#app')
  } catch (e) {
    console.error(e)
  }
}

main()

