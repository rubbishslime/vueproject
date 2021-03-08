<template>
  <div>
    <div class="send-box">
      <div class="font">社团名称：</div>
      <div>
        <label>
          <Input class="send" v-model="value" type="textarea" :rows="1" placeholder="请输入" />
        </label>
      </div></div>
    <div class="send-box">
      <div class="font">社长：</div>
      <div>
        <label>
          <Input class="send" v-model="value3" type="textarea" :rows="1" placeholder="请输入" />
        </label>
      </div></div>
    <div class="send-box">
      <div class="font">简介：</div>
      <div>
        <label>
          <Input class="send" v-model="value2" type="textarea" :rows="4" placeholder="请输入" />
        </label>
      </div></div>
    <div class="a"><Button type="primary" class="b" @click="sendData">创建</Button></div>
  </div>
</template>

<script>
export default {
  name: "add",
  data()
  {
    return {
      value:'',
      value3:'',
      value2:''
    }
  },
  methods: {
    sendData() {
      if (this.value === '' || this.value2 === ''|| this.value3 === '') {
        this.$Message.error('内容不能为空')
        console.log('fail')
      } else {
        this.$axios.get('/corporation/send', {
          params: {
            name: this.value,
            introduce: this.value2,
            president: this.value3,
          }
        }).then(res => {
              this.$Message.success('创建成功');
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