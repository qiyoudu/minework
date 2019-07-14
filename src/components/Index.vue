<template>
  <el-container class="index">
    <el-header>
      <img height="60px" src="../assert/imgs/small.jpg" alt />
      <div class="title">这是用户管理系统</div>
      <div class="left">
        <span>尊敬的用户你好</span>

        <a href="javascript:;" @click="quiet">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">角色列表</el-menu-item>
              <el-menu-item index="2-2">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    quiet () {
      // 先弹出是否退出按钮
      this.$confirm('是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除从本地删除token
          localStorage.removeItem('token')
          // 去首页
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '成功退出'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.index {
  .el-submenu,
  .el-menu-item {
    min-width: 199px;
  }
  height: 100%;
  .el-header {
    height: 60px;
    background-color: #b3c1cd;
    display: flex;
    .title {
      flex: 1;
      text-align: center;
      font-size: 20px;
      color: white;
      font-weight: 600;
      line-height: 60px;
    }
    .left {
      line-height: 60px;
      a {
        color: orange;
        font-weight: 600px;
        margin-left: 20px;
      }
    }
  }
  .el-aside {
    background-color: blue;
    height: 100%;
  }
}
</style>
