<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6" style="margin: 20px">
        <div class="input-group">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">搜索</button>
          </span>
          <input
            type="text"
            v-model="text"
            class="form-control"
            placeholder="Search for..."
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
        <ul class="list-group">
          <li class="list-group-item" v-for="item in searchResult">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      info: ["苹果", "香蕉", "平安果", "猕猴桃", "桃子"],
    };
  },

  computed: {
    searchResult() {
      var list = [];
      var _this = this;
      this.info.map(function (item) {
        if (item.indexOf(_this.text) > -1) {
          return list.push(item);
        }
      });
      return list;
    },
  },
};
</script>
<style scoped lang="less">
</style>



    


