<template>
  <div>
    <setInfo v-if="show" @change="turn" :dataList="appData"></setInfo>
    <div>
    <Table border :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
import setInfo from "@c/setInfo";
export default {
  name: "userManagement",
  components: {setInfo},
  data() {
    return {
      data:[],
      appData: '',
      show: false,
      id: '',
      columns: [
        {
          title: 'id',
          key: 'id',
          width: 70
        },
        {
          title: '用户名',
          key: 'username',
          width: 100
        },
        {
          title: '密码',
          key: 'password',
          width: 150
        },
        {
          title: '电话号码',
          key: 'phone',
          width: 150
        },
        {
          title: '年级',
          key: 'grade',
          width: 70
        },
        {
          title: '年龄',
          key: 'age',
          width: 70
        },
        {
          title: '性别',
          key: 'gender',
          width: 70
        },
        {
          title: '所属社团',
          key: 'corporation',
          width: 150,
          align: 'center',
        },        {
          title: '职务',
          key: 'job',
          width: 150,
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                    this.change(params.row)
                  }
                }
              }, '修改信息'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods:{
    remove(event) {
      this.id = event
      this.$axios.get('/users/deleteUsers',{
        params:{
          id: this.id
        }
      }).then( res=> {
        this.$Message.success('删除成功')
        this.getData();
      })
    },
    turn(){
      this.show = false
      this.$axios.get('./users/select'
      ).then(res => {
        this.data = res.data
      })
    },
    change(event) {
      this.show = true;
      this.appData = event;
    },
    getData() {
      this.$axios.get('./users/select'
      ).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>