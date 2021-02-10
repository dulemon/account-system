<template>
  <div class="accounts-manage">
        <div class="accounts-manage-top">
      <el-input
        style="width: 200px; margin-right: 20px"
        placeholder="请输入内容"
        v-model="input2"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary">新增</el-button>
    </div>
    <div style="padding: 10px; height: calc(100% - 80px)" v-loading="loading">
      <!-- <div slot="empty" style="height: 100%; display: flex; justify-content: center; align-items: center">暂无数据</div> -->

      <el-table
        class="accounts-manage-table"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right; padding: 10px 0 10px 10px">
        <el-pagination
          style="padding: 0"
          background
          layout="prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'AccountsManage',
    data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      loading: false,
    };
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },

}
</script>

<style>
.accounts-manage-top {
  display: flex;
  padding: 10px 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.accounts-manage-table {
  border: 1px solid #ebebeb;
}

</style>