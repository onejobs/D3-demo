<template>
  <div>
    <h1>vue d3 力导向图</h1>
    <svg width="960" height="600"></svg>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {};
  },
  mounted() {
    var data = {
      links: [
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
      ],
    };

    var options = {};
    options.backgroundColor = "#eee";
    options.nodesFontType = "SimHei";
    options.nodesFontSize = 14;
    options.lineFontType = "SimHei";
    options.lineFontSize = 12;
    options.lineColor = "#000000";
    options.showExamples = true;
    options.examplesX = 20;
    options.examplesY = 450;
    options.examplesFontColor = "#000000";
    // console.log(options, "3333");
    // console.log("divid", "66666");
    // console.log(data, "99999");
    // console.log(dataFilter, "88888");
    drawChart("divid", options, data);

    function drawChart(divid, options, datas, dataFilter) {
      var backgroundColor = options.backgroundColor; //背景颜色
      var nodesFontType = options.nodesFontType; //节点字体
      var nodesFontSize = options.nodesFontSize; //节点字号
      var lineFontType = options.lineFontType; //关系字体
      var lineFontSize = options.lineFontSize; //关系字号
      var lineColor = options.lineColor; //连线颜色
      var examplesFontColor = options.examplesFontColor; //关系示例字体颜色

      // var width = window.innerWidth; //画布宽
      // var height = window.innerHeight; //画布高
      // var width = 600; //画布宽
      // var height = 450; //画布高

      var svg = d3.select("svg"); //选择文档中的svg元素
      let width = +svg.attr("width");
      let height = +svg.attr("height");
      // svgChart.remove(); //删除svgChart元素

      var sourceDatas = {};
      sourceDatas.links = [];
      for (var i = 0; i < datas.links.length; i++) {
        var jsonObj = {};
        jsonObj.source = datas.links[i].source;
        jsonObj.target = datas.links[i].target;
        jsonObj.relation = datas.links[i].relation;
        jsonObj.sourceImg = datas.links[i].sourceImg;
        jsonObj.targetImg = datas.links[i].targetImg;
        jsonObj.sourceColor = datas.links[i].sourceColor;
        jsonObj.targetColor = datas.links[i].targetColor;
        jsonObj.sourceRadius = datas.links[i].sourceRadius;
        jsonObj.targetRadius = datas.links[i].targetRadius;
        // 根据关系类型添加连接线的颜色
        // jsonObj.lineColor = data.links[i].lineColor;
        switch (datas.links[i].relation) {
          case "投资":
            jsonObj.lineColor = "#458B00";
            break;
          case "总经理":
            jsonObj.lineColor = "#EEEE00";
            break;
          case "董事":
            jsonObj.lineColor = "#8fd2e1";
            break;
          case "法人":
            jsonObj.lineColor = "#c2de96";
            break;
          case "董事长":
            jsonObj.lineColor = "#ff4c00";
            break;
          default:
            jsonObj.lineColor = "#000";
        }
        jsonObj.data = datas.links[i].data;
        sourceDatas.links.push(jsonObj);
      }
      // 待释义
      var resourceLinks = sourceDatas.links;
      if (dataFilter != undefined && dataFilter.length > 0) {
        var indexArray = [];
        for (var i = 0; i < dataFilter.length; i++) {
          for (var j = 0; j < resourceLinks.length; j++) {
            if (
              resourceLinks[j].relation == dataFilter[i].relation &&
              dataFilter[i].isShow == "false"
            ) {
              indexArray.push(j);
            }
          }
        }
        if (indexArray.length > 0) {
          var tempArray = [];
          for (var j = 0; j < resourceLinks.length; j++) {
            for (var i = 0; i < indexArray.length; i++) {
              if (indexArray[i] != j) {
                if (i == indexArray.length - 1) {
                  tempArray.push(resourceLinks[j]);
                  break;
                }
                continue;
              } else {
                break;
              }
            }
          }
          resourceLinks = tempArray;
        }
      }
      var links = resourceLinks;

      //关系分组
      var linkGroup = {};
      //对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
      var linkmap = {};
      for (var i = 0; i < links.length; i++) {
        var key =
          links[i].source < links[i].target
            ? links[i].source + ":" + links[i].target
            : links[i].target + ":" + links[i].source;
        if (!linkmap.hasOwnProperty(key)) {
          linkmap[key] = 0;
        }
        linkmap[key] += 1;
        if (!linkGroup.hasOwnProperty(key)) {
          linkGroup[key] = [];
        }
        linkGroup[key].push(links[i]);
      }
      //为每一条连接线分配size属性，同时对每一组连接线进行编号
      for (var i = 0; i < links.length; i++) {
        var key =
          links[i].source < links[i].target
            ? links[i].source + ":" + links[i].target
            : links[i].target + ":" + links[i].source;
        links[i].size = linkmap[key];
        //同一组的关系进行编号
        var group = linkGroup[key];
        //给节点分配编号
        console.log(group);
        setLinkNumber(group);
      }

      //节点
      var nodes = {};
      //关系对应颜色
      var relationColor = {};

      for (var i = 0; i < links.length; i++) {
        links[i].source =
          nodes[links[i].source] ||
          (nodes[links[i].source] = {
            name: links[i].source,
            color: links[i].sourceColor,
            image: links[i].sourceImg,
            radius: links[i].sourceRadius,
          });
        links[i].target =
          nodes[links[i].target] ||
          (nodes[links[i].target] = {
            name: links[i].target,
            color: links[i].targetColor,
            image: links[i].targetImg,
            radius: links[i].targetRadius,
          });
      }

      var sourceData = datas.links;
      for (var i = 0; i < sourceData.length; i++) {
        relationColor[sourceData[i].relation] = {
          relation: sourceData[i].relation,
          lineColor: sourceData[i].lineColor,
        };
      }

      console.log(JSON.stringify(nodes), "bbbbbbbb");
      console.log(d3.values(), "bbbbbbbb");
      // console.log([nodes][0], "ffffff");
      console.log(JSON.stringify([nodes]), "ffffff");
      nodes = d3.values(nodes);
      console.log(nodes, "vvvvvvvvvvv");
      nodes.forEach((element) => {
        // console.log(element);
        console.log(JSON.stringify(element), "bbbbbbbb");
      });

      relationColor = d3.values(relationColor);
      var examples_x = parseFloat(options.examplesX); //关系示例坐标x
      var examples_y = parseFloat(options.examplesY); //关系示例坐标y
      var examplesLength = 80;
      var examplesSize = Math.floor((width - examples_x) / examplesLength);
      var examplesRow =
        relationColor.length % examplesSize == 0
          ? relationColor.length / examplesSize
          : Math.ceil(relationColor.length / examplesSize);
      //计算关系示列位置
      for (var i = 1; i <= relationColor.length; i++) {
        var num = i % examplesSize == 0 ? examplesSize : i % examplesSize;
        relationColor[i - 1].x = examples_x + (num - 1) * examplesLength;
        relationColor[i - 1].y = examples_y + 20 * Math.ceil(i / examplesSize);
      }
      if (dataFilter == undefined) {
        dataFilter = [];
        for (var i = 0; i < relationColor.length; i++) {
          dataFilter.push({
            relation: relationColor[i].relation,
            isShow: "true",
          });
        }
      }
      //D3力导向布局
      var force = d3.layout
        .force() // 生成力导向图的布局函数
        .nodes(nodes) // 指定节点数组
        .links(links) // 指定连线数组
        .size([width, height]) // 指定作用域范围
        .linkDistance(200) // 指定连线长度
        .charge(-1500) // 相互之间的作用力
        .start();
      // 全图缩放器
      var zoom = d3.behavior.zoom().scaleExtent([0.25, 2]).on("zoom", zoomFn); // 设置最大缩放比例

      //在 body 里添加一个 SVG 画布
      // var svg = d3.select("#" + divid).append("svg") //添加一个svg元素
      svg
        .attr("width", width) //设定画布宽度
        .attr("height", height) //设定画布高度
        .attr("style", "background-color:" + backgroundColor)
        .call(zoom) //缩放
        .on("dblclick.zoom", null);
      // 缩放层（位置必须在 container 之前）
      var zoomOverlay = svg
        .append("rect") //在 SVG 中，矩形的元素标签是 rect  添加足够数量的矩形元素
        .attr("width", width) //设定画布宽度
        .attr("height", height) //设定画布高度
        .style("fill", "none")
        .style("pointer-events", "all"); // 鼠标事件
      var container = svg
        .append("g")
        .attr("transform", "scale(" + 0.6 + ")")
        .attr("class", "container");

      // 根据分类进行筛选
      if (options.showExamples) {
        var examples = svg
          .selectAll(".examples") //选择svg中的所有.examples元素
          .data(relationColor) //绑定对象
          .enter() //添加数据
          .append("svg:g")
          .attr("fill-opacity", function (d) {
            for (var i = 0; i < dataFilter.length; i++) {
              if (
                d.relation == dataFilter[i].relation &&
                dataFilter[i].isShow == "false"
              ) {
                return 0.2;
              }
            }
            return 1;
          })
          .on("click", function (d) {
            // 点击事件
            for (var i = 0; i < dataFilter.length; i++) {
              if (dataFilter[i].relation == d.relation) {
                if (dataFilter[i].isShow == "true") {
                  dataFilter[i].isShow = "false";
                } else {
                  dataFilter[i].isShow = "true";
                }
              }
            }
            drawChart(divid, options, datas, dataFilter);
          });

        examples
          .append("svg:path")
          .attr("d", function (d) {
            var x1 = d.x;
            var y1 = d.y;
            var x2 = x1 + 20;
            var y2 = y1;
            return "M" + x1 + " " + y1 + " L " + x2 + " " + y2;
          })
          .style("stroke", function (d) {
            if (d.lineColor == "") {
              return lineColor;
            } else {
              return d.lineColor;
            }
          })
          .style("stroke-width", 2.5); // 边框粗细
        examples
          .append("svg:text")
          .style("font-size", "14px")
          .style("fill", examplesFontColor)
          .attr("x", function (d) {
            if (d.relation.length > 3) {
              return d.x + 20 + (14 * 4) / 2;
            }
            return d.x + 20 + (14 * d.relation.length) / 2;
          })
          .attr("y", function (d) {
            return d.y + 5;
          })
          .attr("text-anchor", "middle") // 节点名称放在圆圈中间位置
          .text(function (d) {
            if (d.relation.length > 3) {
              return d.relation.substring(0, 3) + "...";
            }
            return d.relation;
          })
          .on("mouseover", function (d) {
            console.log("放到分类上");
            tooltip
              .html("<span>" + d.relation + "</span>")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + 20 + "px")
              .style("display", "block")
              .style("position", "absolute")
              .style("opacity", 1.0);
          })
          .on("mouseout", function (d, i) {
            tooltip.style("opacity", 0.0);
          });
      }

      function zoomFn() {
        console.log("开始移动了");
        const { translate, scale } = d3.event;
        console.log(container);

        container.attr(
          "transform",
          "translate(" + translate + ")scale(" + scale * 0.6 + ")"
        );
      }

      //设置连接线
      var edges_path = container
        .selectAll(".edgepath") //选择container中的所有.edgepath元素
        .data(links) //绑定数组
        .enter() //指定选择集的enter部分
        .append("path")
        .attr("marker-end", function (d, i) {
          var arrowMarker = container
            .append("marker")
            .attr("id", "arrow" + i) // 设置id，用于连线文字
            .attr("markerUnits", "userSpaceOnUse") // 设置为userSpaceOnUse箭头不受连接元素的影响
            .attr("markerWidth", "16") // viewport
            .attr("markerHeight", "15") // viewport
            .attr("viewBox", "0 0 12 12") // 实际大小，会自动缩放填充viewport
            .attr("refX", 9) // 偏离圆心距离
            .attr("refY", 6) // 偏离圆心距离
            .attr("orient", "auto") // 绘制方向，可设定为：auto(自动确认方向)和 角度值
            .append("svg:path")
            .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2") // d: 路径描述，贝塞尔曲线
            .attr("fill", function () {
              //箭头颜色
              return (d.lineColor = "" ? lineColor : d.lineColor);
            });

          return "url(#arrow" + i + ")";
        })
        .style("stroke", function (d) {
          if (d.lineColor == "") {
            return lineColor;
          } else {
            return d.lineColor;
          }
        })
        .style("stroke-width", 1.5) // 箭头粗细
        .on("mouseover", function (d) {
          console.log("放到连接线");
          // 设置参股或是融资信息
          if (d.data) {
            tooltip
              .html("<span>" + "融资额:" + d.data.rzs + "</span>")
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + 20 + "px")
              .style("display", "block")
              .style("opacity", 1.0);
          }
          //影藏其它连线上文字
          edges_text.style("fill-opacity", function (edge) {
            if (edge === d) {
              return 1;
            }
            return 0;
          });
          edges_path.style("stroke-width", function (edge) {
            // 边框粗细
            if (edge === d) {
              return 4;
            }
            return 1.5;
          });
        })
        .on("mouseout", function (d, i) {
          //显示连线上的文字
          edges_text.style("fill-opacity", 1);
          edges_path.style("stroke-width", 1.5); // 边框粗细
          // 隐藏提示信息
          tooltip.style("opacity", 0.0);
        });
      //边上的文字（人物之间的关系）， 连接线
      var edges_text = container
        .selectAll(".linetext") //选择container中的所有.linetext元素
        .data(links) //绑定数组
        .enter() //指定选择集的enter部分
        .append("svg:g") //添加足够数量的svg:g元素
        .attr("class", "linetext")
        .attr("fill-opacity", 1);
      edges_text
        .append("svg:text")
        .style("font-size", 12 + "px")
        .style("font-family", lineFontType)
        .style("fill", "#000000") //初始颜色为黑色
        //  .transition() //启动过渡
        //  .attr("fill", "steelblue") // 终止颜色为铁蓝色
        .attr("y", ".33em")
        .attr("text-anchor", "middle") // 节点名称放在圆圈中间位置
        .text(function (d) {
          return d.relation;
        });

      edges_text
        .insert("rect", "text")
        .attr("width", function (d) {
          return d.relation.length * lineFontSize;
        })
        .attr("height", function (d) {
          return lineFontSize;
        })
        .attr("y", "-.6em")
        .attr("x", function (d) {
          return (-d.relation.length * lineFontSize) / 2;
        })
        .style("fill", "none");

      // 节点设置，包含圆形图片节点（人物头像）
      var circle = container
        .selectAll("circle") //选择container中的所有circle元素
        .data(nodes) //绑定数组
        .enter() //指定选择集的enter部分
        .append("circle") // 创建圆
        .style("stroke", function (d) {
          // 边框颜色
          if (d.color == "") {
            return "#EE8262";
          } else if (d.color == "#0084ff") {
            return "#0077c6";
          } else if (d.color == "#F4793B") {
            return "#FC3620";
          }
          return d.color;
        })
        .style("stroke-width", "2px") // 边框粗细
        .attr("r", function (d) {
          return d.radius;
        })
        .attr("fill", function (d, i) {
          //节点图片不为空是添加背景色
          if (d.image == "") {
            if (d.color == "") {
              return "#EE8262";
            }
            return d.color;
          } else {
            //创建圆形图片
            var defs = container.append("defs").attr("id", "imgdefs");

            var catpattern = defs
              .append("pattern")
              .attr("id", "catpattern" + i)
              .attr("height", 1)
              .attr("width", 1);

            catpattern
              .append("image")
              /* .attr("x", - (img_w / 2 - radius))
                        .attr("y", - (img_h / 2 - radius)) */
              .attr("width", d.radius * 2)
              .attr("height", d.radius * 2)
              .attr("xlink:href", d.image);
            //  edgesText.append('textPath') // 设置文字内容
            //      .attr('xlink:href', (d, i) => {
            //          return i && '#edgepath' + i;
            //      }) // 文字布置在对应id的连线上
            return "url(#catpattern" + i + ")";
          }
        })
        .on("click", function (e, d, i) {
          //用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
          document.querySelector("#menu").style.height = 0;

          // //在这里添加交互内容
          // console.log('12555');
          // alert("I am an alert box!!")
          // ---------------------------------
          //左键盘点击 则隐藏右键菜单
          this.vueMethods.hideNodeMenu && this.vueMethods.hideNodeMenu();
          //隐藏以前相应的选中状态
          this.svgObj
            .selectAll("rect")
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0);
          //将当前节点设置为选中状态
          window.d3
            .select("#" + "rect_" + d.id)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1);
          console.log(d, "====");
        })
        .on("contextmenu", function (d, i) {
          console.log(d);
          console.log(i);
          //取消默认的浏览器自带右键 很重要！！
          // e.preventDefault();

          //获取我们自定义的右键菜单
          var menu = document.querySelector("#menu");

          //根据事件对象中鼠标点击的位置，进行定位
          // menu.style.left = e.clientX + 'px';
          menu.style.left = d.px + "px";
          console.log(menu.style.left, "左");
          // menu.style.top = e.clientY + 'px';
          menu.style.top = d.py + "px";
          console.log(menu.style.top, "左");

          //改变自定义菜单的宽，让它显示出来
          menu.style.width = "125px";

          //在这里右键添加交互内容
          // e.preventDefault();
          // 执行代码块
          // alert(d.name)
          // this.showNodeMenu(d);
          console.log(d, "33");
          console.log(i, "2222");
          // console.log(this, "11111")
        })
        .on("mouseover", function (d, i) {
          console.log("放到人物头像");
          //影藏其它连线上文字
          edges_text.style("fill-opacity", function (edge) {
            if (edge.source === d || edge.target === d) {
              return 1;
            }
            if (edge.source !== d && edge.target !== d) {
              return 0;
            }
          });
          //其它节点亮度调低
          circle.style("opacity", function (edge) {
            var v = d.name;
            if (edge.name == v || (edge[v] != undefined && edge[v].name == v)) {
              return 1;
            } else {
              return 0.2;
            }
          });
          //其他连先亮度调低
          edges_path.style("opacity", function (edge) {
            if (edge.source === d || edge.target === d) {
              return 1;
            }
            if (edge.source !== d && edge.target !== d) {
              return 0.2;
            }
          });
          //其他节点文字亮度调低
          nodes_text.style("opacity", function (edge) {
            var v = d.name;
            if (edge.name == v || (edge[v] != undefined && edge[v].name == v)) {
              return 1;
            } else {
              return 0.2;
            }
          });
        })
        .on("mouseout", function (d, i) {
          //显示连线上的文字
          edges_text.style("fill-opacity", 1);
          edges_path.style("opacity", 1);
          circle.style("opacity", 1);
          nodes_text.style("opacity", 1);
          tooltip.style("opacity", 0.0);
        })
        .call(force.drag); // 拖拽单个节点带动整个图

      var tooltip = d3
        .select("body")
        .append("div") //选择文档中的body元素
        .attr("class", "tooltip")
        .attr("opacity", 0.0);

      // 节点文字设置
      var nodes_text = container
        .selectAll(".nodetext") //选择container中的所有.nodetext元素
        .data(nodes) //绑定数组
        .enter() //指定选择集的enter部分
        .append("text") // 为每一条连线创建文字区域
        .style("font-size", nodesFontSize + "px")
        .style("fill", "#ffffff") // 填充颜色viewport：可视区域
        .style("font-family", nodesFontType)
        .attr("x", function (d) {
          var name = d.name;
          //如果小于四个字符，不换行
          if (name.length < 4) {
            d3.select(this)
              .append("tspan")
              .attr("dx", -nodesFontSize * (name.length / 2)) // 偏移量
              .attr("dy", 5) // 偏移量
              .text(function () {
                return name;
              });
          } else if (name.length >= 4 && name.length <= 6) {
            var top = d.name.substring(0, 3);
            var bot = d.name.substring(3, name.length);

            d3.select(this)
              .append("tspan")
              .attr("dx", -nodesFontSize * 1.5) // 偏移量
              .attr("dy", -nodesFontSize * 0.5) // 偏移量
              .text(function () {
                return top;
              });

            d3.select(this)
              .append("tspan")
              .attr("dx", -((nodesFontSize * name.length) / 2)) // 偏移量
              .attr("dy", nodesFontSize) // 偏移量
              .text(function () {
                return bot;
              });
          } else if (name.length > 7) {
            var top = d.name.substring(0, 3);
            var mid = d.name.substring(3, 6);
            var bot = d.name.substring(6, name.length);

            d3.select(this)
              .append("tspan")
              .attr("dx", -nodesFontSize * 1.5) // 偏移量
              .attr("dy", -nodesFontSize * 0.5) // 偏移量
              .text(function () {
                return top;
              });

            d3.select(this)
              .append("tspan")
              .attr("dx", -nodesFontSize * 3) // 偏移量
              .attr("dy", nodesFontSize) // 偏移量
              .text(function () {
                return mid;
              });

            d3.select(this)
              .append("tspan")
              .attr("dx", -nodesFontSize * 2) // 偏移量
              .attr("dy", nodesFontSize) // 偏移量
              .text(function () {
                return "...";
              });
          }
        })
        // 右键关系文字
        .on("contextmenu", (d) => {
          // this.showNodeMenu(d);
          console.log(d.name, 4444);
          console.log(this, "右键关系文字");
        })

        .on("mouseover", function (d, i) {
          console.log("放到关系文字");
          //影藏其它连线上文字
          edges_text.style("fill-opacity", function (edge) {
            if (edge.source === d || edge.target === d) {
              return 1;
            }
            if (edge.source !== d && edge.target !== d) {
              return 0;
            }
          });
          //其他节点亮度调低
          circle.style("opacity", function (edge) {
            var v = d.name;
            if (edge.name == v || (edge[v] != undefined && edge[v].name == v)) {
              return 1;
            } else {
              return 0.2;
            }
          });
          //其他连线亮度调低
          edges_path.style("opacity", function (edge) {
            if (edge.source === d || edge.target === d) {
              return 1;
            }
            if (edge.source !== d && edge.target !== d) {
              return 0.2;
            }
          });
          //其他节点文字亮度调低
          nodes_text.style("opacity", function (edge) {
            var v = d.name;
            if (edge.name == v || (edge[v] != undefined && edge[v].name == v)) {
              return 1;
            } else {
              return 0.2;
            }
          });
          tooltip
            .html("<span>" + d.name + "</span>")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + 20 + "px")
            .style("display", "block")
            .style("opacity", 1.0);
        })
        .on("mouseout", function (d, i) {
          //显示连线上的文字
          edges_text.style("fill-opacity", 1);
          edges_path.style("opacity", 1);
          circle.style("opacity", 1);
          nodes_text.style("opacity", 1);
          tooltip.style("opacity", 0.0);
        })
        .call(force.drag); // 拖拽单个节点带动整个图

      //   拖动节点
      var drag = force
        .drag()
        .on("dragstart", function (d, i) {
          d.fixed = true; //拖拽开始后设定被拖拽对象为固定
          d3.event.sourceEvent.stopPropagation();
        })
        .on("dragend", function (d, i) {})
        .on("drag", function (d, i) {});

      //力学图运动开始时
      force.on("start", function () {});

      //力学图运动结束时
      force.on("end", function () {});

      //  力导向图布局 force 有一个监听事件 tick,  意为每进行到一个时刻，都要调用它的监听函数
      force.on("tick", function () {
        //对于每一个时间间隔
        edges_path.attr("d", function (d) {
          var tan = Math.abs(
            (d.target.y - d.source.y) / (d.target.x - d.source.x)
          ); //圆心连线tan值
          var x1 =
            d.target.x - d.source.x > 0
              ? Math.sqrt((d.sourceRadius * d.sourceRadius) / (tan * tan + 1)) +
                d.source.x
              : d.source.x -
                Math.sqrt((d.sourceRadius * d.sourceRadius) / (tan * tan + 1)); //起点x坐标
          var y1 =
            d.target.y - d.source.y > 0
              ? Math.sqrt(
                  (d.sourceRadius * d.sourceRadius * tan * tan) /
                    (tan * tan + 1)
                ) + d.source.y
              : d.source.y -
                Math.sqrt(
                  (d.sourceRadius * d.sourceRadius * tan * tan) /
                    (tan * tan + 1)
                ); //起点y坐标
          var x2 =
            d.target.x - d.source.x > 0
              ? d.target.x -
                Math.sqrt((d.targetRadius * d.targetRadius) / (1 + tan * tan))
              : d.target.x +
                Math.sqrt((d.targetRadius * d.targetRadius) / (1 + tan * tan)); //终点x坐标
          var y2 =
            d.target.y - d.source.y > 0
              ? d.target.y -
                Math.sqrt(
                  (d.targetRadius * d.targetRadius * tan * tan) /
                    (1 + tan * tan)
                )
              : d.target.y +
                Math.sqrt(
                  (d.targetRadius * d.targetRadius * tan * tan) /
                    (1 + tan * tan)
                ); //终点y坐标
          if (d.target.x - d.source.x == 0 || tan == 0) {
            //斜率无穷大的情况或为0时
            y1 =
              d.target.y - d.source.y > 0
                ? d.source.y + d.sourceRadius
                : d.source.y - d.sourceRadius;
            y2 =
              d.target.y - d.source.y > 0
                ? d.target.y - d.targetRadius
                : d.target.y + d.targetRadius;
          }
          // 防报错
          if (!x1 || !y1 || !x2 || !y2) {
            return;
          }
          if (d.linknum == 0) {
            //设置编号为0的连接线为直线，其他连接线会均分在两边
            d.x_start = x1;
            d.y_start = y1;
            d.x_end = x2;
            d.y_end = y2;
            return "M" + x1 + " " + y1 + " L " + x2 + " " + y2;
          }
          var a =
            d.sourceRadius > d.targetRadius
              ? (d.targetRadius * d.linknum) / 3
              : (d.sourceRadius * d.linknum) / 3;
          var xm =
            d.target.x - d.source.x > 0
              ? d.source.x +
                Math.sqrt(
                  (d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan)
                )
              : d.source.x -
                Math.sqrt(
                  (d.sourceRadius * d.sourceRadius - a * a) / (1 + tan * tan)
                );
          var ym =
            d.target.y - d.source.y > 0
              ? d.source.y +
                Math.sqrt(
                  ((d.sourceRadius * d.sourceRadius - a * a) * tan * tan) /
                    (1 + tan * tan)
                )
              : d.source.y -
                Math.sqrt(
                  ((d.sourceRadius * d.sourceRadius - a * a) * tan * tan) /
                    (1 + tan * tan)
                );
          var xn =
            d.target.x - d.source.x > 0
              ? d.target.x -
                Math.sqrt(
                  (d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan)
                )
              : d.target.x +
                Math.sqrt(
                  (d.targetRadius * d.targetRadius - a * a) / (1 + tan * tan)
                );
          var yn =
            d.target.y - d.source.y > 0
              ? d.target.y -
                Math.sqrt(
                  ((d.targetRadius * d.targetRadius - a * a) * tan * tan) /
                    (1 + tan * tan)
                )
              : d.target.y +
                Math.sqrt(
                  ((d.targetRadius * d.targetRadius - a * a) * tan * tan) /
                    (1 + tan * tan)
                );
          if (d.target.x - d.source.x == 0 || tan == 0) {
            //斜率无穷大或为0时
            ym =
              d.target.y - d.source.y > 0
                ? d.source.y +
                  Math.sqrt(d.sourceRadius * d.sourceRadius - a * a)
                : d.source.y -
                  Math.sqrt(d.sourceRadius * d.sourceRadius - a * a);
            yn =
              d.target.y - d.source.y > 0
                ? d.target.y -
                  Math.sqrt(d.targetRadius * d.targetRadius - a * a)
                : d.target.y +
                  Math.sqrt(d.targetRadius * d.targetRadius - a * a);
          }

          var k = (x1 - x2) / (y2 - y1); //连线垂线的斜率
          var dx = Math.sqrt((a * a) / (1 + k * k)); //相对垂点x轴距离
          var dy = Math.sqrt((a * a * k * k) / (1 + k * k)); //相对垂点y轴距离
          if (y2 - y1 == 0) {
            dx = 0;
            dy = Math.sqrt(a * a);
          }
          if (a > 0) {
            var xs = k > 0 ? xm - dx : xm + dx;
            var ys = ym - dy;
            var xt = k > 0 ? xn - dx : xn + dx;
            var yt = yn - dy;
          } else {
            var xs = k > 0 ? xm + dx : xm - dx;
            var ys = ym + dy;
            var xt = k > 0 ? xn + dx : xn - dx;
            var yt = yn + dy;
          }
          //记录连线起始和终止坐标，用于定位线上文字
          d.x_start = xs;
          d.y_start = ys;
          d.x_end = xt;
          d.y_end = yt;
          return "M" + xs + " " + ys + " L " + xt + " " + yt;
        });

        //更新连接线上文字的位置
        edges_text.attr("transform", function (d) {
          // 防止报错
          if (!d.x_start || !d.y_start || !d.x_end || !d.y_end) {
            return;
          }
          return (
            "translate(" +
            (d.x_start + d.x_end) / 2 +
            "," +
            (+d.y_start + +d.y_end) / 2 +
            ")" +
            " rotate(" +
            (Math.atan((d.y_end - d.y_start) / (d.x_end - d.x_start)) * 180) /
              Math.PI +
            ")"
          );
        });

        //更新结点图片和文字
        circle.attr("cx", function (d) {
          return d.x;
        });
        circle.attr("cy", function (d) {
          return d.y;
        });

        nodes_text.attr("x", function (d) {
          return d.x;
        });
        nodes_text.attr("y", function (d) {
          return d.y;
        });
      });
    }

    // 分配編號
    function setLinkNumber(group) {
      console.log(group, "8999999");
      if (group.length == 0) return;
      if (group.length == 1) {
        group[0].linknum = 0;
        return;
      }
      var maxLinkNumber =
        group.length % 2 == 0 ? group.length / 2 : (group.length - 1) / 2;
      if (group.length % 2 == 0) {
        var startLinkNum = -maxLinkNumber + 0.5;
        for (var i = 0; i < group.length; i++) {
          group[i].linknum = startLinkNum++;
        }
      } else {
        var startLinkNum = -maxLinkNumber;
        for (var i = 0; i < group.length; i++) {
          group[i].linknum = startLinkNum++;
        }
      }
    }
  },
  methods: {
    // circleColor(d) {
    //   if (d.sex === "M") {
    //     return "blue";
    //   } else {
    //     return "pink";
    //   }
    // },
    // linkColor(d) {
    //   if (d.type === "A") {
    //     return "green";
    //   } else {
    //     return "red";
    //   }
    // },
  },
};
</script>
<style scoped>
svg {
  border: 1px solid #ccc;
}
</style>
<style>
.tooltip {
  font-family: SimHei;
  font-size: 12px;
  position: fixed;
  background: #fff;
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
}
/* .links line {
  stroke: #999;
  stroke-opacity: 0.6;
}
.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
} */
</style>