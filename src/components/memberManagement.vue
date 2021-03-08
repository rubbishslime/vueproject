<template>
<div>
  <Table border :columns="columns" :data="data"></Table>
</div>
</template>

<script>
import Bus from "../bus.js"
export default {
  name: "memberManagement",
  data()
  {
    return {
      info:'',
      columns: [
        {
          title: 'id',
          key: 'id',
          width: 50
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
          title: '职务',
          key: 'job',
          width: 150,
          align: 'center',
        },
        {
          title: '更换职务',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Select', {
                props: {
                  size: 'small',
                  transfer: true,
                  placeholder: params.row.job,
                  value: params.row.job
                },
                on: {
                  'on-change': (event) => {
                    // this.change();
                    params.row.job = event
                    this.change(params.row.id,params.row.job)
                  }
                },
              },
                  this.jobList.map((obj)=>{
                    return h('Option', {
                      props: {value: obj.value}
                    });
                  })
              )
            ;
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row.id)
                  }
                }
              }, '踢出')
            ]);
          }
        }
      ],
      data: [],
      jobList: [{
        value: "成员",
        label: '成员'
      },
        {
          value: "社长",
          label: '社长'
        },
        {
          value: "副社长",
          label: '副社长'
        },
        {
          value: "秘书",
          label: '秘书'
        }
      ],
      data2: [],
      id: '',
      job:''
  }
  },
  created() {
    let _this = this
    Bus.$on('send', (data) => {
          console.log(this.data)
          this.$axios.get('/users', {
            params: {
              corporation: this.$store.state.select
            }
          }).then(res => {
            this.data = res.data
            console.log(this.data)
          })
        }
    )
    this.$axios.get('/users',{
      params: {
        corporation: this.$store.state.select
      }
    }).then(res =>{
      this.data = res.data
      console.log(this.data)
    })
  },
  mounted() {
  },
  methods:{
    delete(event) {
      this.id = event
      this.$axios.get('/users/delete',{
        params: {
          id: this.id
        }
      }).then(res=>{
        this.$Message.success('删除成功');
        this.getData()
        console.log(res)
      })
    },
    change(event,event2) {
      this.id = event
      this.job = event2
      this.$axios.get('/users/set',{
        params: {
          id: this.id,
          job: this.job
        }
      }).then(res=>{
        this.$Message.success('修改成功');
        console.log(res)
      })
    },
    getData() {
      this.$axios
          .get('/users',{
            params:{
              corporation: this.$store.state.select
            }
          })
          .then(res => {
            this.data = res.data;
          })
    }
  }
}
</script>

<style scoped>

</style>