<template>
  <div class="layout">
    <myInfo v-if="show" @change="turn"></myInfo>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">社团管理系统</div>
          <div class="layout-nav">
            <Select class="select" v-model="model1" style="width:200px" v-if="this.$store.state.job === '管理员'" @on-change="onchange()">
              <Option v-for="item in list" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
            <MenuItem name="1" >
              <div @click="value2 = true">
                <Drawer :closable="false" width="256" v-model="value2">
                  <p :style="pStyle">{{ this.$store.state.username }}</p>
                  <div class="demo-drawer-profile">
                    <Row>
                      <Col span="12">
                        密码: {{this.$store.state.password}}
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        年级: {{this.$store.state.grade}}
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        年龄: {{this.$store.state.age}}
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        电话: {{this.$store.state.phone}}
                      </Col>
                    </Row>
                    <Row>
                      <Col span="12">
                        性别: {{this.$store.state.gender}}
                      </Col>
                    </Row>
                  </div>
                  <Divider />
                  <p :style="pStyle">所属社团：{{this.$store.state.corporation}}</p>
                  <div class="demo-drawer-profile">
                    <Row>
                      <Col span="12">
                        职务: {{this.$store.state.job}}
                      </Col>
                    </Row>
                  </div>
                  <Button @click="change" type="primary">修改个人信息</Button>
                </Drawer>
              <Icon type="ios-person" ></Icon>
                {{ $store.state.username }}
              </div>
            </MenuItem>
            <MenuItem name="2" >
              <div @click="showMessage()">
            <Icon type="ios-mail" />
              通知
              <Drawer title="通知" placement="right" :closable="false" v-model="value1">
                <div v-for="item in message">
                  <div><div>{{item.content}}</div><div>{{item.name}}{{item.date}}</div></div>
                </div>
              </Drawer>
              </div>
            </MenuItem>
            <MenuItem name="3">
            <Icon type="md-exit"  @click="exit()" />
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">

        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="" theme="light" width="auto" :ophomen-names="['0']">
                <MenuItem name="0-1" router-link to="/home">
                    <Icon type="ios-home"></Icon>
                    <span>广场</span>
                </MenuItem>
                <MenuItem name="0-2" router-link to="/home/information">
                  <Icon type="ios-information-circle" />
                    <span>校园资讯</span>
                </MenuItem>
                <MenuItem name="0-3" router-link to="/home/activity">
                  <Icon type="ios-happy" />
                    <span>社团活动</span>
                </MenuItem>
                <MenuItem name="0-4" router-link to="/home/forum">
                  <Icon type="ios-chatbubbles" />
                    <span>论坛</span>
                </MenuItem>
                <Submenu name="1" v-if="this.$store.state.job === '社长' || this.$store.state.job === '管理员'">
                  <template slot="title">
                    <Icon type="ios-apps"></Icon>
                    社团管理
                  </template>
                  <MenuItem name="1-1" router-link to="/home/corporationManagement">
                    社团介绍
                  </MenuItem>
                  <MenuItem name="1-2" router-link to="/home/activitiesManagement">
                    活动管理
                  </MenuItem>
                  <MenuItem name="1-3" router-link to="/home/addInfo">资讯发布</MenuItem>
                  <MenuItem name="1-7" router-link to="/home/addactivity">活动发布</MenuItem>
                  <MenuItem name="1-4"  router-link to="/home/addMessage">通知下发</MenuItem>
                  <MenuItem name="1-5" v-if="this.$store.state.job === '管理员'" router-link to="/home/add">新建社团</MenuItem>
                  <MenuItem name="1-6" v-if="this.$store.state.job === '管理员'" router-link to="/home/cut">删除社团</MenuItem>
                </Submenu>
                <Submenu name="2" v-if="this.$store.state.job === '社长' || this.$store.state.job === '管理员'">
                  <template slot="title">
                    <Icon type="ios-person"></Icon>
                    成员管理
                  </template>
                  <MenuItem name="2-1" router-link to="/home/memberManagement">
                    成员管理
                  </MenuItem>
                  <MenuItem name="2-3" v-if="this.$store.state.job === '管理员'" router-link to="/home/userManagement">
                    用户管理
                  </MenuItem>
                  <MenuItem name="2-2" router-link to="/home/examine">
                    招新审核</MenuItem>
                </Submenu>
                  <MenuItem name="3" v-if="this.$store.state.job === '管理员'" router-link to="/home/forumManagement">
                    <Icon type="ios-chatboxes"></Icon>
                    <span>论坛管理</span>
                  </MenuItem>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <div>
                <router-view/>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import myInfo from "@c/myInfo";
import Bus from "../bus.js"
export default {
  name: "index",
  data(){
    return{
      pStyle: {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.85)',
        lineHeight: '24px',
        display: 'block',
        marginBottom: '16px'
      },
      value2: false,
      value1: false,
      show: false,
      message: '',
      list: [
      ],
      model1: ''
    }
  },
  components: {
    myInfo
  },
  created() {
    this.name = this.message
    let _this = this
    Bus.$on('message', a => {
      this.$axios.get('/message',{
        params: {
          corporation: this.$store.state.corporation
        }
      }).then(res =>{
        this.message = res.data
      })
    })
    // this.showMessage()
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  mounted() {
  this.getData();
    },
  methods: {
    turn(){
      this.show = false
    },
    show(){
      this.value1 = true
    },
    showMessage(){
      this.$axios.get('/message',{
        params: {
          corporation: this.$store.state.corporation
        }
      }).then(res =>{
        this.message = res.data
        this.$store.state.staus = this.message
        this.value1 = true
      })
    },
    getData(){
      this.$axios.get('/select').then(res=>{
        this.list = res.data;
      })
    },
    onchange() {
      this.$store.state.select = this.model1;
      Bus.$emit('send', this.$store.state.select)
    },
    exit() {
      this.$store.state.username = '';
      sessionStorage.clear();
      this.$router.replace('/');
    },
    change() {
      this.show = true;
    }
  }
}
</script>

<style scoped>
.select{
  float: left;
  margin-top: 15px;
}
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo{
  width: 200px;
  font-size: x-large;
  color: white;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 5px;
  left: 20px;
}
.layout-nav{
  /*width: 420px;*/
  float: right;
}
.layout-footer-center{
  text-align: center;
}
.router-link-active{
  color: black;
}
.demo-drawer-profile{
  font-size: 14px;
}
.demo-drawer-profile .ivu-col{
  margin-bottom: 12px;
}
</style>