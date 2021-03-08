<template>
  <div>
    <div>社团活动</div>
    <div class="bbs-box">
      <table border v-for="item in tabledata" class="bbsbox-li">
        <div class="bbsbox-title">{{ item.title }}</div>
        <div class="bbsbox-content">{{ item.content }}</div>
        <div class="bbsbox-info">{{item.name}}{{item.date}}</div>
      </table>
    </div></div>
</template>

<script>
export default {
  name: "activity",
  data() {
    return {
      tabledata:[]
    }
  },
  methods:{
    getData() {
      this.$axios
          .get('/activity',{
          })
          .then(res => {
            this.tabledata = res.data;
          })
    }
  },
  mounted() {
    this.getData()
  }
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