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
            <el-input
              v-model="search"
              size="mini"
              placeholder="请输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              @click="downloadImg(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-video-play"></i>重启1</el-button
            >
            <el-button
              @click="downloadImg(scope.row)"
              type="primary"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-aim"></i>部署</el-button
            >
            <el-button
              @click="downloadImg(scope.row)"
              type="danger"
              size="small"
              v-if="scope.row.code && scope.row.children"
              ><i class="el-icon-turn-off"></i>关机</el-button
            >
            <el-button
              @click="downloadImg(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-video-play"></i>重启2</el-button
            >
            <el-button
              @click="handleClick(scope.row)"
              type="danger"
              size="mini"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-close"></i> 关闭</el-button
            >
            <el-button
              @click="downloadImg(scope.row)"
              type="warning"
              size="small"
              v-if="scope.row.code && !scope.row.children"
              ><i class="el-icon-document-copy"></i>复制</el-button
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
      softwareCPU: 25,
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
      search: "",
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
};
</script>
<style scoped lang="scss">
</style>
  