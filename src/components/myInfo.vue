<template>
  <div class="message-box-wrapper">
    <div class="message-box">
  <Form class="message-box-content back" :label-width="80" style="width: 50%">
    <h1>修改个人信息</h1>
    <FormItem label="用户名">
      <label>
        <Input v-model="formValidate.username" style="width:200px"/>
      </label>
    </FormItem>
    <FormItem label="密码">
      <label>
        <Input v-model="formValidate.password" style="width:200px"/>
      </label>
    </FormItem>
    <FormItem label="电话号码">
      <label>
        <Input v-model="formValidate.phone" class="max-width:200px"/>
      </label>
    </FormItem>
      <FormItem label="年级">
        <label>
          <Input v-model="formValidate.grade" style="width: 200px"/>
        </label>
      </FormItem>
    <FormItem label="年龄">
        <label>
          <Input v-model="formValidate.age" style="width: 50px"/>
        </label>
      </FormItem>
    <FormItem label="性别">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="男">男</Radio>
        <Radio label="女">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="set()">修改</Button>
      <Button @click="changeShow()" style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>

    </div>
  </div>
</template>

<script>
export default {
  name: "myInfo",
  methods: {
    changeShow() {
      this.$emit("change",false);
    },
    set(){
      this.$axios.get('/setinfo',{
        params: {
          name: this.formValidate.username,
          gender: this.formValidate.gender,
          age: this.formValidate.age,
          password: this.formValidate.password,
          id: this.formValidate.id,
          grade: this.formValidate.grade,
          phone: this.formValidate.phone
        }
      }).then(res=>{
            console.log(this.formValidate)
                this.$store.state.username = this.formValidate.username
                this.$store.state.password = this.formValidate.password
                this.$store.state.age = this.formValidate.age
                this.$store.state.grade = this.formValidate.grade
                this.$store.state.phone = this.formValidate.phone
                this.$store.state.gender = this.formValidate.gender
            this.$Message.success('修改成功');
            console.log(this.formValidate)
            this.$emit("change",false);
      }
      )
    }
  },
  mounted() {
    this.formValidate = this.$store.state
  },
  data() {
      return {
        formValidate: []
        }
      }

}
</script>

<style scoped>
.message-box-wrapper {
  position: fixed;
  z-index: 30000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, .3)
}

.message-box-wrapper::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}

.message-box {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 600px;
  height: 500px;
  background: #ffffff;
}
.message-box-content {
  padding: 30px 20px;
  margin: 0 auto;
}
</style>