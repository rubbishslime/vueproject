<template>
  <div>
  <div class="bbs-box">
<table border v-for="(item,index) in tabledata" class="bbsbox-li">
  <div class="bbsbox-title">{{ item.title }}</div>
  <div class="bbsbox-content">{{ item.content }}</div>
  <div class="bbsbox-info">{{item.spokesman}}{{item.date}}</div>
</table>
    </div>
    <div class="send-box">
      <div class="font">标题：</div>
      <div>
    <label>
      <Input class="send" v-model="value" type="textarea" :rows="1" placeholder="请输入" />
    </label>
      </div></div>
    <div class="send-box">
      <div class="font">内容：</div>
      <div>
    <label>
      <Input class="send" v-model="value2" type="textarea" :rows="4" placeholder="请输入" />
    </label>
      </div></div>
    <div class="a"><Button type="primary" class="b" @click="sendData">发表</Button></div>
  </div>
</template>

<script>
export default {
  name: "forum",
  data()
  {
    return {
      tabledata: [],
      value:'',
      value2:'',
      value3:''
    }
  },
  methods:{
    getData() {
      this.$axios
          .get('/forum',{
          })
          .then(res => {
            this.tabledata = res.data;
          })
    },
    sendData() {
      if(this.value === '' || this.value2 === '' ||this.$store.state.username === ''){
        this.$Message.error('标题或内容不能为空')
        console.log('fail')
      }
      else {
        this.$axios.get('/forum/send', {
          params: {
            title: this.value,
            content: this.value2,
            spokesman: this.$store.state.username,
            date: this.$moment().format('MMMM Do YYYY, h:mm:ss a')
          }
        }).then(res =>{
            this.$Message.success('发表成功');
              this.$axios
                  .get('/forum',{
                  })
                  .then(res => {
                    this.tabledata = res.data;
                  })
      }
        )
      }
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
  width: 800px;
  border: 1px solid #d7dde4;

}
.bbsbox-li{
  height: 100px;
  position: relative;
  height: auto;
  width: 800px;
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
.send-box{
  width: 700px;
  margin: 0 auto;
  display: flex;
}
.send {
  width: 500px;
  margin-top: 20px;

}
.a{
  width: 300px;
  margin: 0 auto;
}
.b{
  margin-top: 25px;
  width: 100px;
}
.font{
  margin-top: 20px;
  font-size: 14px;
}
</style>