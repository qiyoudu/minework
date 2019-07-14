<template>
  <div class="login">
    <!--
      el-form:就是表单组件
      :model : 传入一个对象，让对象的属性和表单元素双向绑定
      label-width="80px"
      el-form-item: 每一行表单元素
     记得查找好对应的文档
    -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="username" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登陆</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { Message } from 'element-ui'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async submitForm () {
      // try 和catch 用来解决控制台报错的问题
      try {
        await this.$refs.form.validate()
        const res = await this.axios.post(`login`, {
          username: this.form.username,
          password: this.form.password
        })

        // console.log(res)
        const { data, meta } = res
        if (meta.status === 200) {
          localStorage.setItem('token', data.token)
          // 登录到首页

          this.$router.push('/index')
          // 显示登录成功信息
          this.$message.success(meta.msg)
          // 本地存入token
        } else {
          // 显示登录失败的消息
          this.$message.error(meta.msg)
        }
      } catch (e) {
        this.$message.error('登录失败')
      }
      // 等待表单校验成功
    }
  }
}
</script>
<style lang="scss" >
#app {
  height: 100%;
  padding-top: 1px;
  background-color: skyblue;
}
html,
body {
  height: 100%;
  padding-top: 1px;
}
.login {
  height: 100%;
  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px 40px;
    border-radius: 20px;
  }
}
</style>
