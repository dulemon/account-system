<template>
  <div class="user-manage" style="height: 100%">
    <div class="user-manage-top">
      <!-- <el-input style="width: 200px; margin-right: 20px"
                placeholder="请输入内容"
                v-model="input2">
        <el-button slot="append"
                   icon="el-icon-search"></el-button>
      </el-input> -->
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增</el-button
      >
      <el-dialog
        title="新增家庭成员"
        :visible.sync="dialogFormVisible"
        destroy-on-close
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser('form')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="passwordModalVisible" destroy-on-close>
        <div style="text-align: center">{{ resetPassword }}</div>
      </el-dialog>
    </div>
    <div style="height: calc(100% - 80px)" v-loading="loading">
      <!-- <div slot="empty" style="height: 100%; display: flex; justify-content: center; align-items: center">暂无数据</div> -->

      <el-table
        class="user-manage-table"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="index" label="序号" type="index" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :formatter="formatterTime"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-popconfirm
              :title="`确定将${scope.row.name}移出本家庭吗?`"
              @confirm="deleteRow(scope.row)"
            >
              <el-button type="text" size="small" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
            <el-popconfirm
              :title="`确定要重置${scope.row.name}的密码吗`"
              @confirm="resetPassWord(scope.row)"
            >
              <el-button
                type="text"
                size="small"
                slot="reference"
                style="margin: 0 10px"
                >重置密码</el-button
              >
            </el-popconfirm>
            <el-popconfirm
              :title="`确定要转将管理员转让给${scope.row.name}吗`"
              @confirm="transferAdmin(scope.row)"
            >
              <el-button type="text" size="small" slot="reference"
                >转让管理员</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right; padding: 10px 0 10px 10px">
        <el-pagination
          style="padding: 0"
          background
          layout="prev, pager, next"
          :current-page="pageNum"
          :total="total"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, put } from '../../utils/http'
import moment from 'moment'
import { Message } from 'element-ui'
export default {
  name: 'UserManage',
  mounted() {
    this.getList()
  },
  data() {
    let validateName = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        let reg = /^[a-zA-Z0-9_-]{2,16}$/
        if (!reg.test(value)) {
          callback(new Error('用户名必须由2-16位，字母、数字、下划线组成!'))
        }

        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        let reg = /^[a-zA-Z0-9]{8}$/
        if (!reg.test(value)) {
          callback(new Error('密码必须8位字母、数字组成，不能含有非法字符!'))
        }

        callback()
      }
    }
    return {
      tableData: [],
      loading: false,
      dialogFormVisible: false,
      passwordModalVisible: false,
      form: {
        name: '',
        password: '',
      },
      formLabelWidth: '120px',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      resetPassword: '',
      rules: {
        name: [
          { required: true, message: '账号不能为空', trigger: 'change' },
          { validator: validateName, trigger: 'change' },
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { validator: validatePassword, trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    formatterTime(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    getList() {
      this.loading = true
      get('/user/query', {
        houseId: sessionStorage.getItem('houseId'),
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then((res) => {
        this.loading = false
        if (res.description === 'success') {
          this.tableData = res.data.list.filter((item) => item.isAdmin !== 1)
          this.total = res.data.total
        }
      })
    },
    addUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post('/user/add', {
            houseId: sessionStorage.getItem('houseId'),
            name: this.form.name,
            password: this.form.password,
            isAdmin: 0,
          }).then((res) => {
            this.dialogFormVisible = false
            if (res.description === 'success') {
              this.pageNum = 1
              this.getList()
            }
          })
        } else {
          return false
        }
      })
    },
    deleteRow(row) {
      put('/user/remove', {
        adminUserId: sessionStorage.getItem('userId'),
        removeUserId: row.id,
      }).then((res) => {
        if (res.description === 'success') {
          Message.success({ message: '移除成功!' })
          this.pageNum = 1
          this.getList()
        }
      })
    },
    resetPassWord(row) {
      put('/user/resetPwd', { id: row.id }).then((res) => {
        if (res.description === 'success') {
          this.resetPassword = `${row.name}的密码已重置为：${res.data.password}`
          this.passwordModalVisible = true
        }
      })
    },
    transferAdmin(row) {
      put('/user/transferAdmin', {
        fromUserId: sessionStorage.getItem('userId'),
        toUserId: row.id,
      }).then((res) => {
        if (res.description === 'success') {
          Message.success({ message: '转让成功' })
          this.pageNum = 1
          this.getList()
        }
      })
    },
  },
}
</script>

<style>
.user-manage-top {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 15px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.user-manage-table {
  border: 1px solid #ebebeb;
}
</style>
