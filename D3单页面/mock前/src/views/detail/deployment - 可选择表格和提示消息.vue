<template>
  <div class="container">
    <el-dialog
      title="软件部署"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="8">
          <div style="border-right: 1px solid #ebebeb; padding-bottom: 20px">
            <div class="searchZi">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
            </div>

            <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree"
              @node-click="handleNodeClick"
            >
            </el-tree></div
        ></el-col>
        <el-col :span="16">
          <div style="background: pink; border-left: 1px solid #ebebeb">
            <el-table
              ref="multipleTable"
              :data="
                tableData.slice(
                  (currentPage - 1) * pagesize,
                  currentPage * pagesize
                )
              "
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="软件" width="120">
                <template slot-scope="scope">{{ scope.row.soft }}</template>
              </el-table-column>
              <el-table-column prop="code" label="编号" width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="软件描述"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <div class="footer-fy">
          <el-pagination
            small
            layout="total,prev,pager,next,jumper"
            :total="tableData.length"
            :page-size="pagesize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>

        <div class="footer-ok">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handSoft">部 署</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "deployment",

  data() {
    return {
      // 分页
      pagesize: 5,
      currentPage: 1,
      dialogVisible: false,
      filterText: "",
      data: [
        {
          id: 1,
          label: "计算类软件",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "编程类软件",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "模型类软件",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      tableData: [
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
        {
          soft: "*****软件",
          code: "25448963514",
          address: "软件描述**************************",
        },
      ],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 分页,点击切换
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // ------------------------------
    handleClose(done) {
      this.dialogVisible = false;
    },
    handSoft(done) {
      if (this.multipleSelection.length == 0) {
        this.$message("请至少选择一条");
      } else {
        console.log(this.multipleSelection);
        this.$confirm("确认部署？")
          .then((_) => {
            this.dialogVisible = false;
          })
          .catch((_) => {});
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
};
</script>
<style scoped lang="less">
.container /deep/ .el-dialog__header {
  border-bottom: 1px solid #ebebeb;
}
.container /deep/ .el-dialog__body {
  // background: red;
  padding: 0px 20px;
}
.container /deep/ .el-dialog__footer {
  border-top: 1px solid #ebebeb;
  padding-top: 20px;
}
.searchZi {
  margin: 20px 20px 20px 0px;
}
.footer-ok {
  display: inline-block;
  margin-left: 30px;
}
.footer-fy {
  display: inline-block;
}
</style>
