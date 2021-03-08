<template>
<div>
  <Table border :columns="columns7" :data="tabledata"></Table>
</div>
</template>

<script>
export default {
  name: "forumManagement",
  data() {
    return {
      columns7: [
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
          title: '发帖人',
          key: 'spokesman',
          width: 100,
          align: 'center',
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
                    this.delete(params.index)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      tabledata: []
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
    delete(index) {
      this.$axios.get('/forum/delete',{
        params:{
          id: this.tabledata[index].id
        }
      }).then(res =>{
        this.$axios
            .get('/forum',{
            })
            .then(res => {
              this.$Message.success('删除成功');
              this.tabledata = res.data;
            })
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>