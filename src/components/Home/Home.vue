<template>
  <div id="home">
    <div class="menu">
      <el-menu
        default-active="1"
        class="el-menu-list"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >   
          <el-menu-item index="1" @click="changeRoute('/system/accountManage')">账单管理</el-menu-item>      
          <el-menu-item index="2" @click="changeRoute('/system/statistics')">账单统计</el-menu-item> 
          <el-menu-item index="3" @click="changeRoute('/system/userManage')">用户管理</el-menu-item>      
      </el-menu>
      <div class="otherInfo">
        <i
          class="el-icon-user"
          style="color: #fff; font-size: 20px; margin-right: 10px"
        ></i>
        <i
          class="el-icon-switch-button"
          style="color: #fff; font-size: 20px"
        ></i>
      </div>
    </div>
    <div class="home-wrap" v-if="path.indexOf('statistics') > -1">
      <Statistics />
    </div>
    <div class="home-wrap"  v-else-if="path.indexOf('userManage') > -1">
      <UserManage />
    </div>
     <div class="home-wrap"  v-else-if="path.indexOf('accountManage') > -1">
      <AccountsManage />
    </div>
  </div>
</template>

<script>
import UserManage from "../UserManage/UserManage.vue";
import Statistics from "../Statistics/Statistics.vue";
import AccountsManage from "../AccountsManage/AccountsManage.vue";
export default {
  name: "Home",
  components: {
    UserManage,
    Statistics,
    AccountsManage
  },
  data() {
    let path = window.location.hash;
    //   let menuContent = path.indexOf('statistics') > -1 ? <Statistics /> : <UserManage />;
       console.log(path)
    return {
      path,
    };
  },
  methods: {
    handleSelect() {},
    changeRoute(path) {
        console.log(path)
        this.path = path;
        this.$router.push({path})

    }
  },
};
</script>

<style>
#home {
  height: 100%;
}
.menu {
  display: flex;
  background: rgba(84, 92, 100);
  height: 61px;
}
.el-menu-list {
  width: calc(100% - 100px);
  display: flex;
  justify-content: center;
}
.otherInfo {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
}
.home-wrap {
  height: calc(100% - 61px);
}
</style>