<template>
  <div class="login-wrap">
    <div class="login">
      <div class="form">
        <div class="title">后台管理系统</div>
        <div class="name">
          <input type="text" placeholder="请输入用户名" v-model="form.mobileNo">
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码" v-model="form.password">
        </div>
        <div class="btn">
          <el-button type="primary" round @click="login" :loading="loading">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobileNo: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    errorMes (mes) {
      this.$message({ message: mes, duration: 1000, type: 'error' })
    },
    login () {
      let regMobileNo = /^1\d{10}$/
      let regPassword = /^[\d\D]{6,12}$/
      if (this.mobileNo === '') {
        this.errorMes('用户名不能为空')
        return
      }
      if (!regMobileNo.test(this.form.mobileNo)) {
        this.errorMes('用户名不正确')
        return
      }
      if (this.password === '') {
        this.errorMes('密码不能为空')
        return
      }
      if (!regPassword.test(this.form.password)) {
        this.errorMes('密码不正确')
        return
      }
      this.loading = true
      this.$http.post(this.$apiUrls.login, this.form).then(res => {
        this.loading = false
        res = res.data
        if (res.code === 200) {
          this.reset()
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push({path: '/frame/blank'})
        } else {
          this.errorMes(res.message)
        }
      }).catch(() => {
        this.loading = false
        this.errorMes('服务器报错了')
      })
    },
    reset () {
      this.form.mobileNo = ''
      this.form.password = ''
    }
  }
}
</script>
<style scoped>
.login-wrap {
  position: relative;
  height: 100%;
  background: url('../image/login/bg.png') no-repeat center center;
  background-size: 100% auto;
}
.login {
  position: absolute;
  left: 50%;
  top: 52%;
  width: 420px;
  height: 460px;
  margin-left: -210px;
  margin-top: -230px;
  z-index: 1;
}
.form {
  height: 350px;
  padding: 70px 60px 0 60px;
  box-shadow: 2px 1px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #fff;
}
.title {
  padding-bottom: 25px;
  font-size: 24px;
  color: #2c3e50;
}
.name input {
  background: url('../image/login/name.png') no-repeat left 18px;
}
.password input {
  background: url('../image/login/password.png') no-repeat left 18px;
}
.name input, .password input {
  width: 250px;
  padding: 20px 25px;
  font-size: 14px;
  border: 0 none;
  border-bottom: 1px solid #ebeef5;
  color: #2c3e50;
}
.name input::-webkit-input-placeholder, .password input::-webkit-input-placeholder {
  color: #c0c4cc;
}
.btn {
  padding-top: 50px;
  text-align: center;
}
.btn .el-button.is-round {
  padding: 12px 0;
  width: 250px;
}
</style>
