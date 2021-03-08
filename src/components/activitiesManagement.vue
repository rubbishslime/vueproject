<template>
<div>
  <Table border :columns="columns" :data="tabledata"></Table>
</div>
</template>

<script>
import Bus from "@/bus";

export default {
  name: "activitiesManagement",
  data() {
    return {
      tabledata: [],
      columns: [
        {
          title: '标题',
          key: 'title',
          width: 150
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '社团',
          key: 'name',
          width: 150,
          align: 'center',
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
    }
  },
  created() {
    this.name = this.$store.state.select
    let _this = this
    // 用$on监听事件并接受数据
    Bus.$on('send', (data) => {
      _this.name = data
      this.$axios.get('/activity/show',{
        params: {
          name: this.$store.state.select
        }
      }).then(res=> {
        this.tabledata = res.data
      })
    })
    },
  methods: {
  delete(index) {
    this.$axios.get('/activity/delete',{
      params:{
        id: this.tabledata[index].id
      }
    }).then(res =>{
      this.$axios.get('/activity/show',{
        params: {
          name: this.$store.state.select
        }
          })
          .then(res => {
            this.$Message.success('删除成功');
            this.tabledata = res.data;
          })
    })
  }
  },
  mounted() {
    this.$axios.get('/activity/show',{
      params: {
        name: this.$store.state.corporation
      }
    }).then(res=> {
      this.tabledata = res.data
    })
  }
}
</script>

<style scoped>

</style>