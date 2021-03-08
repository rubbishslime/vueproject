<template>
<div>
  <div>校园资讯</div>
  <div class="bbs-box">
  <table border v-for="(item,index) in tabledata" class="bbsbox-li">
    <div class="bbsbox-title">{{ item.title }}</div>
    <div class="bbsbox-content">{{ item.content }}</div>
    <div class="bbsbox-info">{{item.name}}{{item.date}}</div>
  </table>
</div></div>
</template>

<script>
export default {
  name: "information",
  data(){
    return{
      tabledata: [],
      nowTime: new Date(), // 当前时间
    }
  },
  mounted() {
    this.getdata()
  },
  methods:{
    getdata() {
      this.$axios
          .get('/information',{
          })
          .then(res => {
            this.tabledata = res.data;
          })
    }
},
  filters: {
    formatDate(nowTime) {
      var moment = require("moment");
      return moment(nowTime).format("YYYY-MM-DD");
    }
  },
}
</script>

<style scoped>
.bbs-box{
  float: left;
  margin-top: 10px;
  width: 600px;
  /*border-style: solid;*/

}
.bbsbox-li{
  height: 100px;
  position: relative;
  height: auto;
  width: 600px;
}
.bbsbox-title {
  font-size: 18px;
  line-height: 180%;
  padding: 0 0 5px 5px;
  font-weight: 700;
}
.bbsbox-content {
  color: #888;
  font-size: 14px;
  word-break:break-all;
  line-height: 180%;
  padding: 0 0 5px 5px;
  max-width: 500px;
}
.bbsbox-info {
  margin: 4px 0 0 5px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: #ccc;
}
</style>