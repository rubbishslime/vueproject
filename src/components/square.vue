<template>
  <div>
    <Icon size="24" type="md-arrow-back" @click="showData()" v-if="!show"> </Icon>
    <show v-if="!show" :info="tabledata[this.number]"/>
    <Row v-if="show">
      <Col span="11" v-for="(item,index) in tabledata" >
        <div @click="showData(index)">
        <Card>
          <p slot="title">{{item.name}}</p>
          <p>{{ item.introduce }}</p>
        </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import show from '@c/show'
export default {
  components: {
    show
  },
  name: "square",
  data() {
    return {
      show: true,
      number: '',
      tabledata: []
    }
  },

  methods:{
    getData() {
      this.$axios
          .get('/square',{
          })
          .then(res => {
            this.tabledata = res.data;
          })
    },
    showData(index) {
      this.show = !this.show;
      this.number = index
    }
    },
    mounted() {
    this.getData()
    }
}
</script>

<style scoped>
.ivu-row {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
}
.ivu-col-span{
  display: block;
  width: 30%;
}
.ivu-card-bordered {
  border: 1px solid #dcdee2;
  border-color: #e8eaec;
}
.ivu-card-head {
  border-bottom: 1px solid #e8eaec;
  padding: 14px 16px;
  line-height: 1;
}
.ivu-card-body {
  padding: 16px;
}
.font{
  font-size: 12px;
}
</style>