<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 搜索框 -->
    <!-- 添加用户 -->
    <el-button type="primary" dialogFormVisible @click="addInfo">添加用户</el-button>
    <!-- 这是弹框1 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" dialogFormVisible @click="onSumbmit('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 这是弹框2 -->
    <el-dialog title="修改用户信息" :visible.sync="editDialog">
      <el-form :model="form" :rules="rules" ref="editRuleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-tag type="info">{{ form.username}}</el-tag>
          <!-- <el-input v-model="form.username" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" dialogFormVisible @click="onEditSumbmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <!-- {{scope.row}} -->
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.email }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="small"
            @click="editInfo(scope)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            size="small"
            type="danger"
            @click="delInfo(scope)"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" plain>主要按钮</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这里面的数据名不能重复
      editDialog: false,
      dialogFormVisible: false,
      tableData: [],
      value: true,
      query: '',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async delInfo ({ row }) {
      // console.log(1)
      console.log(row.id)
      console.log(row)
      // 发送ajax  需要有提示框
      try {
        await this.$confirm('此次操作将永久删除用户,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.axios.delete(`users/${row.id}`)
        console.log(res)
        this.$message.success(res.meta.msg)
        this.render()
      } catch (e) {
        // 这里取代了catch
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      }
    },
    addInfo () {
      this.dialogFormVisible = true
      // 清空信息
      this.form = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    },
    async onEditSumbmit () {
      try {
        // 这里面是 同步执行的 都是成功后的结果 继续往下执行 await 后面是promise对象 等待他成功继续执行 如果错误就停止执行 这里try catch捕捉错误信息
        await this.$refs.editRuleForm.validate()

        // 发送ajax
        let { id } = this.form
        console.log(id)

        const res = await this.axios.put(`users/${id}`, this.form)
        console.log(res)
        this.editDialog = false
        // 重新渲染
        this.render()
      } catch (e) {
        // 必须带个e 为啥?
        // console.log(e)

        this.$message.error('注册失败')
        return false
      }
    },
    editInfo ({ row }) {
      this.editDialog = true
      console.log(row)
      this.form.username = row.username
      this.form.email = row.email
      this.form.mobile = row.mobile
      this.form.id = row.id
    },
    search () {
      // 可以获取到 this.requery是双向绑定的  重新渲染时 调用封装时的函数 能找到this.query 以后 功能和 模板一块写不要分开容易 搞混
      this.render()
    },
    async render () {
      const res = await this.axios.get(`users`, {
        params: {
          query: this.query,
          pagenum: 1,
          pagesize: 2
        }
      })
      const { data, meta } = res
      if (meta.status === 200) {
        this.tableData = data.users
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    async onSumbmit () {
      // 等待表单校验成功
      try {
        await this.$refs.ruleForm.validate()
        this.dialogFormVisible = false
        // 发送ajax
        const res = await this.axios.post(`users`, {
          username: this.form.username,
          password: this.form.password
        })
        console.log(res)
        const { meta } = res
        if (meta.status === 201) {
          this.$message(meta.msg)
          this.render()
        } else {
          this.$message(meta.msg)
        }
      } catch (e) {
        // 为啥必须要有e?
        this.$message.error('创建失败')
      }
    }
  },
  created () {
    this.render()
  }
}
</script>

<style lang="scss">
.users {
  .el-breadcrumb {
    height: 50px;
  }
  .input-with-select,
  .el-input,
  .el-input-group {
    width: 50%;
  }
}
</style>
