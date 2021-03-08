<template>
  <div>
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
    <div class="a"><Button type="primary" class="b" @click="sendData">发布</Button></div>
  </div>
</template>

<script>
export default {
  name: "addactivity",
  data()
{
  return {
    value:'',
    value2:''
  }
},
methods: {
  sendData() {
    if (this.value === '' || this.value2 === '' || this.$store.state.username === '') {
      this.$Message.error('标题或内容不能为空')
      console.log('fail')
    } else {
      this.$axios.get('/activity/send', {
        params: {
          title: this.value,
          content: this.value2,
          name: this.$store.state.select,
          date: this.$moment().format('MMMM Do YYYY, h:mm:ss a')
        }
      }).then(res => {
            this.$Message.success('发表成功');
            this.$router.push('/home/activity');
            console.log('res')
          }
      )
    }
  }
}
}
</script>

<style scoped>
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