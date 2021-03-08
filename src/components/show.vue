<template>
  <div>
    <Row class="flex" style="background:#eee;padding:20px">
      <Col span="11" class="a">
        <Card :bordered="false" class="a">
          <p slot="title">{{this.info.name}}</p>
          <p slot="extra">社长：{{this.info.president}}</p>
          <p class="b">{{this.info.introduce}}</p>
          <p>活动:</p>
          <div v-for="item in tabledata">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
          </div>
        </Card>
      </Col>
      <div class="button">
        <Button @click="post()" type="success" long v-if="this.$store.state.corporation === ''">提交申请</Button>
        <br><br>
        <Button type="error" long v-if="this.$store.state.corporation === this.info.name" @click="exit()">退出社团</Button></div>
    </Row>
  </div>
</template>

<script>
export default {
  name: "show",
  props: ['info'],
  data() {
    return {
      a:'',
      tabledata: []
    }
  },
  mounted() {
    this.getdata()
  },
  methods:{
    exit(){
      this.$axios.get('/square/exit',{
        params: {
          userid: this.$store.state.id
        }
      }).then(res=>{
        this.$store.state.corporation = ''
            this.$Message.success('退出成功')
      })
    },
    post(){
      this.$axios.get('/square/select',{
        params: {
          userid: this.$store.state.id,
          corporation: this.info.name
        }
      }).then(res=> {
        this.a = res.data
        console.log(this.a)
        if ( this.a != '') {
          this.$Message.error('无法重复提交')
        }else{
        this.$axios.get('/square/post', {
          params: {
            username: this.$store.state.username,
            userid: this.$store.state.id,
            grade: this.$store.state.grade,
            age: this.$store.state.age,
            phone: this.$store.state.phone,
            gender: this.$store.state.gender,
            corporation: this.info.name
          }
        }).then(res => {
          this.$Message.success('提交成功')
        })
      }
      })
    },
    getdata(){
      this.$axios.get('/activity/show',{
        params: {
          name:this.info.name
        }
      }).then(res=>{
        this.tabledata = res.data;
      })
}
  }
}
</script>

<style scoped>
.a{
  width: 800px;
}
.b{
  height: 250px;
}
.flex{
  display: flex;
}
.button{
  margin-top: 20px;
  margin-left: 20px;
}
</style>