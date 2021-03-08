<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import Bus from "../bus.js"
export default {
  name: "examine",
  data() {
    return {
      columns: [
        {
          title: '用户id',
          key: 'userid',
          width: 150
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '电话号码',
          key: 'phone'
        },
        {
          title: '年级',
          key: 'grade'
        },        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.adopt(params.row.userid)
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row.userid)
                  }
                }
              }, '拒绝')
            ]);
          }
        }
      ],
      data: [],
      userid: ''
    }
  },
  created() {
    let _this = this
    Bus.$on('send', (data) => {
          console.log(this.data)
          this.$axios.get('/examine', {
            params: {
              corporation: this.$store.state.select
            }
          }).then(res => {
            this.data = res.data
            console.log(this.data)
          })
        })
    this.$axios.get('/examine',{
      params: {
        corporation: this.$store.state.select
      }
    }).then(res =>{
      this.data = res.data
      console.log(this.data)
    })
  },
  methods:{
    adopt(event){
      this.userid = event
      this.$axios.get('/examine/adopt',{
        params: {
          userid: this.userid,
          corporation: this.$store.state.select
        }
      }).then(res =>{
        console.log(this.data)
        this.$store.state.corporation = this.$store.state.select
        this.$Message.success('已通过');
        this.$axios.get('/examine',{
          params: {
            corporation: this.$store.state.select
          }
        }).then(res =>{
          this.data = res.data
          console.log(this.data)
        })
      })
    },
    delete(event2){
      this.userid = event2
      this.$axios.get('/examine/refuse',{
        params: {
          userid: this.userid,
          corporation: this.$store.state.select
        }
      }).then(res=>{
        console.log(this.data)
        this.$Message.success('已拒绝');
        this.$axios.get('/examine',{
          params: {
            corporation: this.$store.state.select
          }
        }).then(res =>{
          this.data = res.data
          console.log(this.data)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>