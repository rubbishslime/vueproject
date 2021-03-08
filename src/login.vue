<template>
  <div>
    <Card header="" class="login-card">
      <p slot="title" >请先登录</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="username">
            <Input type="text" v-model="formInline.username" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click.prevent="handleSubmit()">登录</Button>
          <Button type="primary" @click.prevent="register()" style="margin-left: 40px">注册</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.$store.state.username = '';
    sessionStorage.clear();
  },
  methods: {
    handleSubmit() {
      if (this.formInline.password.length < 6) {
        console.log('fail')
      } else{
        this.$axios.get('/login', {
          params: {
            username: this.formInline.username,
            password: this.formInline.password
          }
        })
            .then(res => {
              if (res.data.statusCode === 200) {
                this.$store.state.username = this.formInline.username;
                this.$store.state.password = this.formInline.password;
                this.$store.state.age = res.data.data[0].age;
                this.$store.state.job = res.data.data[0].job;
                this.$store.state.id = res.data.data[0].id;
                this.$store.state.grade = res.data.data[0].grade;
                this.$store.state.phone = res.data.data[0].phone;
                this.$store.state.gender = res.data.data[0].gender;
                this.$store.state.select = res.data.data[0].corporation;
                this.$store.state.corporation = res.data.data[0].corporation;
                console.log(this.$store.state)
                this.$router.push('/home')
              }
              if (res.data.statusCode === 0) {
                this.$Message.error('密码错误或用户名不存在')
              }
            })
            .catch(err => {
              console.log(err)
            })
    }
    },
    register() {
      this.$axios.get('/login/register', {
        params: {
          username: this.formInline.username,
          password: this.formInline.password
        }
      }).then(res => {
        if (res.data.statusCode === 200){
          this.$Message.success('注册成功');
        }else{
          if (this.formInline.password.length < 6){
            this.$Message.error('密码不能低于6位')
          }
          else {
            this.$Message.error('用户名已存在')
          }
        }
      })
    }
  }
};
</script>
<style>
.login-card{
  width: 25rem;
  margin:10rem auto;
}
</style>