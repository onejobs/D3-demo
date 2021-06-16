<template>
  <div class="container">
    <div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          v-for="(item, index) in tableList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.code && !scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                软件ID:</span
              >
              {{ scope.row.code }}
            </div>
            <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px"> 计算机ID:</span>
              <span>{{ scope.row.code }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="300">
          <template slot-scope="scope">
            <div v-if="scope.row.code && !scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                软件占用:</span
              >
              <el-progress
                :percentage="scope.row.softwareRAM"
                :color="softColor"
                style="display: inline-block; width: 150px"
              ></el-progress>
            </div>
            <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px"> CPU使用率:</span>
              <span :style="centralColor(scope.row.ratio)"
                >{{ scope.row.ratio }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="300">
          <template slot-scope="scope">
            <div v-if="scope.row.code && !scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                软件占用:</span
              >
              <el-progress
                :percentage="scope.row.softwareCPU"
                :color="memoryColor"
                style="display: inline-block; width: 150px"
              ></el-progress>
            </div>
            <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px"> 内存（32G）使用率:</span>
              <span :style="randomColor(scope.row.occupancy)"
                >{{ scope.row.occupancy }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.code && !scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                每秒访问量:</span
              >
              {{ scope.row.visits }}
            </div>
            <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px"> 总访问量:</span>
              <span>{{ scope.row.visits }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <!--  size="mini" -->
            <el-input
              v-model="search"
              size="medium"
              suffix-icon="el-icon-search"
              placeholder="请输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              @click="restart(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-video-play"></i>重启1</el-button
            >
            <el-button
              @click="deploy()"
              type="primary"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-aim"></i>部署</el-button
            >

            <el-button
              @click="off(scope.row)"
              type="danger"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-turn-off"></i>关机</el-button
            >
            <el-button
              @click="reset(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-video-play"></i>重启2</el-button
            >
            <el-button
              @click="close(scope.row)"
              type="danger"
              size="mini"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-close"></i> 关闭</el-button
            >
            <el-button
              @click="copy()"
              type="warning"
              size="small"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-document-copy"></i>复制</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <Deployment ref="dialog2" />
      <CopySoft ref="dialog1" />
    </div>
  </div>
</template>
<script>
import Deployment from "./deployment";
import CopySoft from "./copySoft";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      search: "",
      softwareCPU: 25,
      // 内存占用表头颜色组
      memoryColor: function (softwareCPU) {
        if (softwareCPU < "20") {
          return "#409EFF";
        } else if (softwareCPU < "40") {
          return "#67C23A";
        } else if (softwareCPU < "60") {
          return "#E6A23C";
        } else if (softwareCPU < "80") {
          return "#F56C6C";
        } else {
          return "red";
        }
      },
      // CPU表头颜色组
      softColor: function (softwareRAM) {
        if (softwareRAM < "20") {
          return "#409EFF";
        } else if (softwareRAM < "40") {
          return "#67C23A";
        } else if (softwareRAM < "60") {
          return "#E6A23C";
        } else if (softwareRAM < "80") {
          return "#F56C6C";
        } else {
          return "red";
        }
      },

      tableList: [
        {
          label: "品类",
          prop: "category",
        },
      ],
      tableData: [
        {
          id: 1,
          category: "Windows（Win7）",
          children: [
            {
              id: 11,
              category: "huawei",
              code: "65896315",
              visits: "1834",
              occupancy: "18%",
              ratio: "39%",
              children: [
                {
                  id: 111,
                  category: "软件开发",
                  code: "65894234",
                  visits: "96",
                  softwareCPU: 45,
                  softwareRAM: 17,
                },
                {
                  id: 112,
                  category: "HSXIA软件",
                  code: "65894423",
                  visits: "28",
                  softwareCPU: 75,
                  softwareRAM: 27,
                },
                {
                  id: 113,
                  category: "态势分析软件",
                  code: "94234658",
                  visits: "39",
                  softwareCPU: 15,
                  softwareRAM: 83,
                },
              ],
            },
            {
              id: 12,
              category: "xiaomi",
              code: "65896315",
              visits: "1476",
              occupancy: "86%",
              ratio: "64%",
              children: [
                {
                  id: 121,
                  category: "软件开发",
                  code: "65894234",
                  visits: "83",
                  softwareCPU: 75,
                  softwareRAM: 17,
                },
                {
                  id: 122,
                  category: "HSXIA软件",
                  code: "65894423",
                  visits: "65",
                  softwareCPU: 37,
                  softwareRAM: 69,
                },
                {
                  id: 123,
                  category: "态势分析软件",
                  code: "94234658",
                  visits: "93",
                  softwareCPU: 15,
                  softwareRAM: 83,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          category: "MAC OS",
          children: [
            {
              id: 21,
              category: "Air pro",
              code: "65896315",
              visits: "1834",
              occupancy: "18%",
              ratio: "39%",
              children: [
                {
                  id: 211,
                  category: "软件开发",
                  code: "65894234",
                  visits: "96",
                  softwareCPU: 45,
                  softwareRAM: 17,
                },
                {
                  id: 212,
                  category: "HSXIA软件",
                  code: "65894423",
                  visits: "28",
                  softwareCPU: 75,
                  softwareRAM: 27,
                },
                {
                  id: 213,
                  category: "态势分析软件",
                  code: "94234658",
                  visits: "39",
                  softwareCPU: 15,
                  softwareRAM: 83,
                },
              ],
            },
            {
              id: 22,
              category: "Air plus",
              code: "65896315",
              visits: "1476",
              occupancy: "86%",
              ratio: "64%",
              children: [
                {
                  id: 221,
                  category: "软件开发",
                  code: "65894234",
                  visits: "83",
                  softwareCPU: 75,
                  softwareRAM: 17,
                },
                {
                  id: 222,
                  category: "HSXIA软件",
                  code: "65894423",
                  visits: "65",
                  softwareCPU: 37,
                  softwareRAM: 69,
                },
                {
                  id: 223,
                  category: "态势分析软件",
                  code: "94234658",
                  visits: "93",
                  softwareCPU: 15,
                  softwareRAM: 83,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    // 内存表格颜色组
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
    // CPU表格颜色组
    centralColor() {
      return (ratio) => {
        if (0 <= parseFloat(ratio) && parseFloat(ratio) < 20) {
          return { color: "#409EFF" };
        } else if (20 <= parseFloat(ratio) && parseFloat(ratio) < 40) {
          return { color: "#67C23A" };
        } else if (40 <= parseFloat(ratio) && parseFloat(ratio) < 60) {
          return { color: "#E6A23C" };
        } else if (60 <= parseFloat(ratio) && parseFloat(ratio) < 80) {
          return { color: "#F56C6C" };
        } else if (80 <= parseFloat(ratio) && parseFloat(ratio) <= 100) {
          return { color: "red" };
        }
      };
    },
  },
  components: {
    Deployment,
    CopySoft,
  },
  methods: {
    // 重启1
    restart() {
      this.$confirm("是否确定启动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "启动成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启动",
          });
        });
    },
    // 重启2
    reset() {
      this.$confirm("是否确定启动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "启动成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启动",
          });
        });
    },
    // 关机
    off() {
      this.$confirm("是否确定关机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "关机成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关机",
          });
        });
    },
    // 关闭
    close() {
      this.$confirm("是否确定关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "关闭成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消关闭",
          });
        });
    },
    deploy() {
      // console.log(this.$refs.dialog)
      this.$refs.dialog2.dialogVisible = !this.$refs.dialog2.dialogVisible;
    },
    copy() {
      // console.log(this.$refs.dialog)
      this.$refs.dialog1.dialogVisible1 = !this.$refs.dialog2.dialogVisible1;
    },
  },
};
</script>
<style scoped lang="less">
/deep/.el-input__suffix {
  margin-right: 15px;
}
</style>
  