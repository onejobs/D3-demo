<template>
  <div class="container">
    <el-row>
      <el-col :span="6"
        ><div class="a">
          <img src="../../assets/images/hr.jpg" alt="" />
          <span class="zi">0713YKDFDDF</span>
        </div></el-col
      >
      <el-col :span="18"
        ><div class="b">
          <el-table :data="tablesData" style="width: 100%">
            <el-table-column prop="trainingName" label="训练名称" width="180">
            </el-table-column>
            <el-table-column prop="currentAccount" label="当前科目" width="180">
            </el-table-column>
            <el-table-column
              prop="trainingBackground"
              label="训练背景"
              width="280"
            >
            </el-table-column>
            <el-table-column
              prop="implementationPhase"
              label="实施阶段"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="subject" label="科目"> </el-table-column>
          </el-table></div
      ></el-col>
    </el-row>
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
        <!-- <el-table-column width="150" >
          <template slot-scope="scope">
             <div v-if="scope.row.code && !scope.row.children">
              {{ scope.row.category }}
            </div> 
            <div v-if="scope.row.code && scope.row.children">
             <span style="margin-right: 6px"> {{ scope.row.category }}</span> 
              <span> （</span>
              <span > IP:</span>
              <span class="ipCode">{{ scope.row.code }} </span>
              <span > ）</span>
            </div>
          </template>
        </el-table-column> -->
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
     <el-table-column  width="200">
          <template slot-scope="scope">
             <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                软件启动状态</span
              >
              
            </div>
            

            <span
              style="margin-right: 6px; color: #5cb87a;display: inline-block"
              v-if="scope.row.code && !scope.row.children"
            >
              已启动</span
            >
            <span
              style="margin-right: 6px; color: #f00; display: inline-block"
              v-if="scope.row.code && !scope.row.children"
            >
              未启动</span
            >
          </template>
        </el-table-column>
        <el-table-column  width="200">
          <template slot-scope="scope">
             <div v-if="scope.row.code && scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                当前状态</span
              >
              
            </div>
            <div v-if="scope.row.code && !scope.row.children">
              <span style="margin-right: 6px; display: inline-block">
                正在启动:</span
              >
              <span style="color: #5cb87a"> {{ scope.row.visits }}</span>
            </div>

            <span
              style="margin-right: 6px; display: inline-block"
              v-if="scope.row.code && !scope.row.children"
            >
              等待启动</span
            >
            <span
              style="margin-right: 6px; color: #f00; display: inline-block"
              v-if="scope.row.code && !scope.row.children"
            >
              启动失败</span
            >
          </template>
        </el-table-column>
        <el-table-column  width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="small"
              suffix-icon="el-icon-search"
              placeholder="请输入关键字搜索"
            />
          </template>

          <template slot-scope="scope">
            <el-button
              @click="downloadImg(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ></i>操作</el-button
            >
            <el-button
              @click="open(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-video-play"></i>启动</el-button
            >
            <el-button
              @click="close(scope.row)"
              type="danger"
              size="mini"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-close"></i> 关闭</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      tablesData: [
        {
          trainingName: "0713YKDFDDF",
          currentAccount: "FK演练DZ21测试",
          trainingBackground: "D13565部队直线打击目标测试",
          implementationPhase: "阶段3",
          subject: "zhe shi ge ke mu",
        },
      ],
      // 内存表头颜色组
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
          id: 91,
          category: "XXX席位方案",
          children: [
            {
              id: 1,
              category: "XXX指挥所",
              children: [
                {
                  id: 11,
                  code: "65896315",
                  category: "XXX席位（ IP:65896315 ）",
                  visits: "1834",
                  occupancy: "18%",
                  ratio: "39%",
                  children: [
                    {
                      id: 111,
                      category: "软件开发",
                      code: "65894234",
                      visits: "96%",
                      softwareCPU: 45,
                      softwareRAM: 17,
                    },
                    {
                      id: 112,
                      category: "HSXIA软件",
                      code: "65894423",
                      visits: "28%",
                      softwareCPU: 75,
                      softwareRAM: 27,
                    },
                    {
                      id: 113,
                      category: "态势分析软件",
                      code: "94234658",
                      visits: "39%",
                      softwareCPU: 15,
                      softwareRAM: 83,
                    },
                  ],
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
  methods: {
    // 启动
    open() {
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
  },
};
</script>
<style scoped lang="less">
.a {
  position: relative;
  background: red;
  height: 96px;
  img {
    height: 96px;
    width: 96px;
  }
  .zi {
    width: 200px;
    height: 24px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ade2fb;
    line-height: 70px;
    margin-top: 36px;
    margin-left: 21px;
    position: absolute;
    top: -24px;
  }
}
.b {
  background: blue;
  height: 96px;
}
// .ipCode {
//   position: absolute;
//   left: 50px;
// }
/deep/.el-input__suffix {
  margin-right: 15px;
}
</style>
  