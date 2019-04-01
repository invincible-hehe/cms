import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/components/Login'], resolve)
const Frame = resolve => require(['@/components/Frame'], resolve)
const Blank = resolve => require(['@/components/Blank'], resolve)
const Overview = resolve => require(['@/components/Base/Overview'], resolve)
const DataManage = resolve => require(['@/components/Data/DataManage'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/frame',
      name: 'Frame',
      component: Frame,
      meta: {
        title: '登陆'
      },
      children: [
        {
          path: '/frame/blank',
          name: 'Blank',
          component: Blank,
          meta: {
            title: '菜单'
          }
        },
        {
          path: '/frame/overview',
          name: 'Overview',
          component: Overview,
          meta: {
            title: '安检任务一览'
          }
        },
        {
          path: '/frame/data-manage',
          name: 'DataManage',
          component: DataManage,
          meta: {
            title: '客户主数据管理'
          }
        }
      ]
    }
  ]
})
