const VueRouter = require('vue-router').default
const page404 = function (resolve) {
  resolve({
    template: "<h1>page not found</h2>",
    data: function () {
      return {}
    }
  })
}

const router = module.exports = new VueRouter({
  base: __dirname,
  mode: 'hash',
  linkActiveClass: 'router-link-active',
  routes: [{
    name: 'index',
    path: '/',
    redirect: {
      name: 'home'
    }
  }, {
    name: 'home',
    path: '/pages/home',
    component: function (resolve) {
      require(['~pages/home'], resolve)
    }
  }, {
    name: '404',
    path: '/:any*',
    component: page404
  }]
})

