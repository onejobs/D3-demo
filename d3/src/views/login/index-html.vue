<template>
  <div class="container">
    <!-- 力导向图div -->
    <svg width="560" height="300"></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    let svg = d3.select("svg");
    let width = +svg.attr("width");
    let height = +svg.attr("height");
    let nodesData = [
      {
        source: "安其拉", // 开始节点
        data: {
          //关系提示数据
          rzs: "1000万美元",
        },
        target: "企业", // 结束节点
        relation: "投资", //关系名称
        sourceImg: "http://mail.tom.com/error/i2.gif", //开始节点头像
        targetImg: "", //结束节点头像
        sourceColor: "#F4793B", // 开始节点颜色
        targetColor: "#0084ff", // 结束节点颜色
        sourceRadius: "30", // 开始节点球半径
        targetRadius: "35", // 结束节点球半径
        type: "A",
      },
      {
        source: "安其拉",
        data: {
          rzs: "12万美元",
        },
        target: "机构",
        relation: "投资",
        sourceImg: "http://mail.tom.com/error/i2.gif",
        targetImg: "",
        sourceColor: "#F4793B",
        targetColor: "#0084ff",
        sourceRadius: "30",
        targetRadius: "35",
        type: "A",
      },
      {
        source: "孙悟空",
        target: "机构",
        relation: "总经理",
        sourceImg: "",
        targetImg: "",
        sourceColor: "#F4793B",
        targetColor: "#0084ff",
        sourceRadius: "30",
        targetRadius: "35",
        type: "A",
      },
      {
        source: "孙悟空",
        target: "公司",
        relation: "董事",
        sourceImg: "",
        sourceImg: "",
        targetImg: "",
        sourceColor: "#F4793B",
        targetColor: "#0084ff",
        sourceRadius: "30",
        targetRadius: "35",
        type: "A",
      },
      {
        source: "孙悟空",
        target: "机构",
        relation: "法人",
        sourceImg: "",
        targetImg: "",
        sourceColor: "#F4793B",
        targetColor: "",
        sourceRadius: "30",
        targetRadius: "35",
        type: "A",
      },
    ];
    // 第二步  添加节点数据
    let simulation = d3.forceSimulation().nodes(nodesData);

    simulation
      .force("charge_force", d3.forceManyBody())
      .force("center_force", d3.forceCenter(width / 2, height / 2));

    let node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", this.circleColor);

    simulation.on("tick", tickAction);

    function tickAction() {
      node
        .attr("cx", (d) => {
          return d.x;
        })
        .attr("cy", (d) => {
          return d.y;
        });
    }
  },
  methods: {
    circleColor(d) {
      if (d.sex === "M") {
        return "blue";
      } else {
        return "pink";
      }
    },
  },
};
</script>
<style scoped>
svg {
  border: 1px solid #ccc;
}
</style>
<style>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}
.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
  