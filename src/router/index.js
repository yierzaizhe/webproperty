import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to =>{
      return "/login"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: (() => import('../views/Login'))
  },
  {
    path: '/conmmunity',
    name: 'Conmmunity',
    component: (() => import('../components/dashbord/Conmmunity'))
  },
  {
    //实现动态路由，根据参数进入不同的控制面板
    path: "/dashboard/:path",
    name: "DashBoard",
    meta: {
      needLogin: true
    },

    component: () =>
        import(/* webpackChunkName: "about" */ "../views/MainBord.vue")
  }


]

const router = new VueRouter({
  routes
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  //所有设置meta的，needlogin为true的都守卫
  if (to.meta.needLogin == true) {
    let auth = localStorage.getItem("Authorization");
    let token = null;
    if (auth == null) {
      next("/login");
    } else {
      //token = JSON.parse(auth).token;
      token = auth;
      console.log("router取得的token为：" + token);
    }

    if (token == null || token == "") {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
} )

export default router


