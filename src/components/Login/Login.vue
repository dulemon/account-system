<template>
  <div id="login">
    <div class="login-content">
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
                   <el-button  class="submit-button" type="primary" round v-on:click="login">登录</el-button>
              </el-col>
               <el-col :span="12">
                   <el-button class="submit-button" round v-on:click="register">注册</el-button>
              </el-col>
          </el-row>
      <!-- <el-row>
        <el-col :span="2"> 账号： </el-col>
        <el-col :span="22">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="account"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> 密码： </el-col>
        <el-col :span="22">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="password"
            show-password
          >
          </el-input>
        </el-col>
      </el-row>
      <el-button type="primary" round v-on:click="login">登录</el-button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      return {
          account: '',
    password: ''
      }
  },
  methods: {
      login: function(){
        this.$router.push({path:'/system'})
      },
      register: function(){
          console.log(this)
      }
  }
};
</script>

<style>
#login {
height: 100%;
background: url("https://cn.bing.com/th?id=OHR.MoonDogs_ZH-CN5201314184_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp") 50% 50% / cover;
display: flex;
justify-content: center;
align-items: center;

  
}
.login-content {
  padding: 60px;
  width: 400px;
}
.login-content div {
  display: flex;
}
.input-text{
    margin-bottom: 25px;
}
.submit-button{
    width: 96%;

}
</style>