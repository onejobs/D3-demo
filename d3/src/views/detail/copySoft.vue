<template>
  <div class="container">
    <el-dialog
      title="计算机"
      :visible.sync="dialogVisible1"
      width="60%"
      :before-close="handleClose"
    >
      <div slot="title" class="header-title">
        <span class="title-name"> {{ titleName }}</span>
        <div class="title-search">
          <el-input
            size="medium"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
        </div>
      </div>
      <div>
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
          <el-table-column prop="name" label="计算机名称" width="120">
          </el-table-column>
          <el-table-column label="IP地址" width="120">
            <template slot-scope="scope">{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column prop="ram" label="内存" width="120">
          </el-table-column>
          <el-table-column label="计算机负载">
            <template slot-scope="scope">
              <span :style="randomColor(scope.row.occupancy)">{{
                scope.row.occupancy
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="describe"
            label="计算机描述"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
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
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="handSoft">启 动</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "copySoft",
  data() {
    return {
      input2: "",
      titleName: "计算机",
      age: 20,
      // 分页
      pagesize: 5, // 每页条数
      currentPage: 1, //  默认开始页面
      dialogVisible1: false,
      tableData: [
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "18%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "36%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "57%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "78%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "92%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "18%",
          describe: "计算机描述*****************",
        },
        {
          address: "192.168.201.2",
          name: "huawei",
          ram: "32G",
          occupancy: "45%",
          describe: "计算机描述*****************",
        },
      ],
      multipleSelection: [],
    };
  },
  computed: {
    //   计算机负载表格颜色组
    randomColor() {
      return (occupancy) => {
        if (0 <= parseFloat(occupancy) && parseFloat(occupancy) < 20) {
          return { color: "#409EFF" };
        } else if (20 <= parseFloat(occupancy) && parseFloat(occupancy) < 40) {
          return { color: "#67C23A" };
        } else if (40 <= parseFloat(occupancy) && parseFloat(occupancy) < 60) {
          return { color: "#E6A23C" };
        } else if (60 <= parseFloat(occupancy) && parseFloat(occupancy) < 80) {
          return { color: "#F56C6C" };
        } else if (
          80 <= parseFloat(occupancy) &&
          parseFloat(occupancy) <= 100
        ) {
          return { color: "red" };
        }
      };
    },
  },
  methods: {
    // 分页,点击切换
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 获取当前某一行数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 关闭弹框
    handleClose(done) {
      this.dialogVisible1 = false;
    },
    // 启动按钮
    handSoft(done) {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请至少选择一条",
          duration: 3000,
        });
      } else {
        console.log(this.multipleSelection);
        this.$confirm("确认启动？")
          .then((_) => {
            this.dialogVisible1 = false;
          })
          .catch((_) => {});
      }
    },
  },
};
</script>
<style scoped lang="less">
.container /deep/ .el-dialog__header {
  border-bottom: 1px solid #ebebeb;
  height: 60px;
  position: relative;
  .title-name {
    font-size: 20px;
    line-height: 60px;
    margin-left: 13px;
  }
  .title-search {
    position: absolute;
    right: 50px;
    bottom: 20px;
  }
  .el-input__suffix {
    margin-right: 5px;
  }
}
.container /deep/ .el-dialog__body {
  // background: red;
  padding: 0px 20px;
  height: 276px;
}
.container /deep/ .el-dialog__footer {
  border-top: 1px solid #ebebeb;
  padding-top: 20px;
}
.footer-ok {
  display: inline-block;
  margin-left: 30px;
}
.footer-fy {
  display: inline-block;
}
</style>
    