<template>
  <div id="login">
    <div class="login-title">多人协作家庭记账系统</div>
    <div class="login-content">
      <div class="login-form">
        <el-input
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
          v-model="account"
          class="input-text"
        >
        </el-input>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="password"
          show-password
          class="input-text"
        >
        </el-input>
        <el-row>
          <el-col :span="12">
            <el-button
              class="submit-button"
              type="primary"
              round
              v-on:click="login"
              >登录</el-button
            >
          </el-col>
          <el-col :span="12">
            <el-button class="submit-button" round v-on:click="register"
              >注册</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from '../../utils/http'
import { Message } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      account: '',
      password: '',
    }
  },
  mounted() {},
  methods: {
    login: function() {
      if (this.account === '') {
        Message.error({ message: '账号不能为空!' })
        return
      }
      if (this.password === '') {
        Message.error({ message: '密码不能为空!' })
        return
      }
      post('/user/login', { name: this.account, password: this.password }).then(
        (res) => {
          if (res.description === 'success') {
            Message.success({ message: '登录成功' })
            this.$router.push({ path: '/system/accountManage' })
            sessionStorage.setItem('userId', res.data[0].id)
            sessionStorage.setItem('houseId', res.data[0].houseId)
            sessionStorage.setItem('name', res.data[0].name)
            sessionStorage.setItem('isAdmin', res.data[0].isAdmin)
          }
        }
      )
    },
    register: function() {
      let namePattern = /^[a-zA-Z0-9_-]{2,16}$/
      let passwordPattern = /^[a-zA-Z0-9]{8}$/
      if (this.account === '') {
        Message.error({ message: '账号不能为空!' })
        return
      }
      if (this.password === '') {
        Message.error({ message: '密码不能为空!' })
        return
      }
      if (!namePattern.test(this.account)) {
        Message.error({
          message: '用户名必须由2-16位，字母、数字、下划线组成!',
        })
        return
      }
      if (!passwordPattern.test(this.password)) {
        Message.error({
          message: '密码必须8位字母、数字组成，不能含有非法字符!',
        })
        return
      }

      post('/user/register', {
        name: this.account,
        password: this.password,
        isAdmin: 1,
      }).then((res) => {
        if (res.description === 'success') {
          Message.success({ message: '注册成功，请登录' })
          this.account === ''
          this.password === ''
        }
      })
    },
  },
}
</script>

<style>
#login {
  height: 100%;
  background: url('https://cn.bing.com/th?id=OHR.MoonDogs_ZH-CN5201314184_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')
    50% 50% / cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login-title {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.login-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  padding: 30px 60px 60px 60px;
  width: 400px;
}

.input-text {
  margin-bottom: 25px;
}
.submit-button {
  width: 96%;
}
</style>
