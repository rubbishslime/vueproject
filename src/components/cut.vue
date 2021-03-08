<template>
  <div>
    <Table border :columns="columns" :data="tabledata"></Table>
  </div>
</template>

<script>
export default {
  name: "cut",
  data() {
    return {
      tabledata: [],
      columns: [
        {
          title: '社团名称',
          key: 'name',
          width: 150
        },
        {
          title: '简介',
          key: 'introduce'
        },
        {
          title: '社长',
          key: 'president',
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
  methods: {
    delete(index) {
      this.$axios.get('/cut',{
        params:{
          id: this.tabledata[index].id
        }
      }).then(res =>{
        this.$axios.get('/square').then(res=>{
          this.tabledata = res.data
          this.$Message.success('删除成功');
        })
      })
    }
  },
  mounted() {
    this.$axios.get('/square').then(res=>{
      this.tabledata = res.data
    })
  }
}
</script>

<style scoped>

</style>