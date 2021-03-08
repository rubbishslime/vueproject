<template>
<div>
  <Form label-position="top">
    社团名称：  {{name}}
    <FormItem label="社团介绍：">
      <label>
        <Input v-model="value" type="textarea"></Input>
      </label>
    </FormItem>
  </Form>
  <div class="a"><Button type="primary" class="b" @click="set()">修改</Button></div>
</div>
</template>

<script>
import Bus from "../bus.js"
export default {
  name: "corporationManagement",
  data () {
    return {
      title: '',
      value: '',
      name: ''
    }
  },
  created() {
    this.name = this.$store.state.select
    let _this = this
    // 用$on监听事件并接受数据
    Bus.$on('send', (data) => {
        _this.name = data
      this.$axios.get('/corporation',{
        params: {
          name: this.$store.state.select
        }
      }).then(res=>{
        this.value = res.data[0].introduce
      })
    })
    this.$axios.get('/corporation',{
      params: {
        name: this.$store.state.select
      }
    }).then(res=>{
      this.value = res.data[0].introduce
    })
  },

  methods:{
    set() {
      this.$axios.get('/introduce',{
        params:{
          name: this.$store.state.select,
          introduce: this.value
        }
      }).then(res => {
        this.$Message.success('修改成功');
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.a{
  width: 300px;
  margin: 0 auto;
}
.b{
  margin-top: 25px;
  width: 100px;
}
</style>