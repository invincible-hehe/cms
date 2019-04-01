<template>
  <div class="frame">
    <el-container>
      <!-- 头部信息 -->
      <el-header>
        <div class="header">
          <div class="header-left">
            <span><img src="../image/frame/company-logo.png" class="company-logo"></span>
            <span class="company-name">**企业</span>
          </div>
          <div class="header-right">
            <span class="platform-name">后台管理系统</span>
            <span class="user-name">{{userInfo.mobileNo}}</span>
            <span class="login-out" @click="loginout">退出</span>
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 菜单 -->
        <el-aside width="200px">
          <el-menu default-active="1-1" class="el-menu-vertical-demo" background-color="#2c3e50" text-color="#99a3ae" active-text-color="#fff">
            <el-submenu v-for="nav in navList" :key="nav.code" :index="nav.code">
              <template slot="title">
                <i :class="nav.navIcon"></i>
                <span>{{nav.navName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="item in nav.nodes" :key="item.code" :index="item.code" @click="addTab(item)">{{item.navName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体 -->
        <el-main>
          <el-tabs v-model="activeTab" type="card" @tab-click="chooseTab" @tab-remove="removeTab">
            <el-tab-pane v-for="tab in tabList" :key="tab.name" :label="tab.label" :name="tab.name" closable></el-tab-pane>
          </el-tabs>
          <!-- 内容 -->
          <div class="frame-cont">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Frame',
  data () {
    return {
      userInfo: {},
      navList: [],
      activeTab: '',
      tabList: []
    }
  },
  created () {
    const userInfo = sessionStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo)
    this.getNav()
  },
  methods: {
    loginout () {
      this.$http.post(this.$apiUrls.frame.loginout).then(res => {
        res = res.data
        if (res.code === 200) {
          sessionStorage.removeItem('userInfo')
          this.$router.push({path: '/'})
        } else {
          this.errorMes(res.message)
        }
      }).catch(() => {
        this.loading = false
        this.errorMes('服务器报错了')
      })
    },
    getNav () {
      this.$http.get(this.$apiUrls.frame.nav).then(res => {
        res = res.data
        if (res.code === 200) {
          this.navList = res.data
          const item = this.navList[0].nodes[0]
          this.routerGo(item.navUrl)
          this.addTab(item)
        } else {
          this.errorMes(res.message)
        }
      }).catch(() => {
        this.loading = false
        this.errorMes('服务器报错了')
      })
    },
    addTab (item) {
      let tabs = this.tabList
      let newTab = tabs.filter(tab => tab.name === item.code)[0]
      if (newTab) {
        this.activeTab = newTab.name
        this.routerGo(newTab.url)
      } else {
        const tab = {
          label: item.navName,
          name: item.code,
          url: item.navUrl
        }
        this.tabList.push(tab)
        this.activeTab = tab.name
        this.routerGo(tab.url)
      }
    },
    chooseTab () {
      const item = this.tabList.filter(tab => {
        return tab.name === this.activeTab
      })[0]
      this.routerGo(item.url)
    },
    removeTab (targetName) {
      let tabs = this.tabList
      let activeName = this.activeTab
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.routerGo(nextTab.url)
            }
          }
        })
      }
      this.activeTab = activeName
      this.tabList = tabs.filter(tab => tab.name !== targetName)
    },
    routerGo (path) {
      this.$router.replace({path: '/frame/' + path})
    }
  }
}
</script>

<style>
.frame {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  background-color: #2c3e50;
}
.el-aside::-webkit-scrollbar {
  width: 8px;
}
.el-aside::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #34495e;
}
.el-aside::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #99a3ae;
}
.el-submenu {
  width: 200px;
}
.el-main {
  padding: 0;
}
.el-tabs__header {
  margin: 0;
}
.frame-cont {
  height: calc(100% - 41px);
  overflow-x: hidden;
  overflow-y: auto;
}
.frame-cont::-webkit-scrollbar {
  width: 8px;
}
.frame-cont::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #dcdfe6;
}
.frame-cont::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #fff;
}
.header {
  display: flex;
}
.header-left {
  width: 140px;
  height: 40px;
  padding: 10px 30px;
  background-color: #2c3e50;
  color: #fff;
  font-size: 0;
}
.header-left span {
  display: inline-block;
  vertical-align: middle;
}
.company-logo {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
.company-name {
  padding-left: 10px;
  font-size: 14px;
}
.header-right {
  position: relative;
  flex: 1;
  height: 60px;
  line-height: 60px;
  text-align: right;
  font-size: 0;
}
.platform-name {
  position: absolute;
  left: 0;
  padding-left: 20px;
  font-size: 16px;
}
.user-name, .login-out {
  padding-left: 20px;
  padding-right: 40px;
  font-size: 14px;
  color: #99a3ae;
}
.user-name {
  background: url(../image/frame/user-name.png) left center no-repeat;
}
.login-out {
  background: url(../image/frame/login-out.png) left center no-repeat;
}
</style>
