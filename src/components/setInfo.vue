<template>
  <div class="message-box-wrapper">
    <div class="message-box">
      <div class="message-box-content">
        <h1 >修改用户信息</h1>
        <Form inline :label-width="80" class="username">
        <FormItem label="用户名">
          <label><Input v-model="formValidate.username" style="width:200px"/>
          </label>
        </FormItem>
          <FormItem label="密码">
          <label>
            <Input v-model="formValidate.password" style="width:200px"/>
          </label>
        </FormItem>
        </Form>
        <Form inline :label-width="80">
        <FormItem label="电话号码">
          <label>
            <Input v-model="formValidate.phone" style="width:200px"/>
          </label>
        </FormItem>
        <FormItem label="年级">
          <label>
            <Input v-model="formValidate.grade" style="width: 200px"/>
          </label>
        </FormItem>
        </Form>
        <Form inline :label-width="80">
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
        </Form>
        <Form inline :label-width="80">
          <FormItem label="所属社团">
            <label>
              <Input v-model="formValidate.corporation" style="width:200px"/>
            </label>
          </FormItem>
          <FormItem label="职务">
            <label>
              <Input v-model="formValidate.job" style="width: 200px"/>
            </label>
          </FormItem>
        </Form>
        <Form inline :label-width="80">
        <FormItem>
          <Button type="primary" @click="set()">修改</Button>
          <Button @click="changeShow()" style="margin-left: 8px">取消</Button>
        </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setInfo",
  data(){
    return {
      formValidate: {
      }
    }
  },
  props:{
    dataList:{
    }
  },
  methods: {
    changeShow() {
      this.$emit("change",false);
    },
    set(){
      this.$axios.get('/users/update',{
        params: {
          name: this.formValidate.username,
          gender: this.formValidate.gender,
          age: this.formValidate.age,
          password: this.formValidate.password,
          id: this.formValidate.id,
          grade: this.formValidate.grade,
          phone: this.formValidate.phone,
          job: this.formValidate.job,
          corporation: this.formValidate.corporation
        }
      }).then(res=>{
            this.$Message.success('修改成功');
            this.$emit("change",false);
          }
      )
    }
  },
  mounted() {
    this.formValidate = this.dataList
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
  width: 800px;
  height: 400px;
  background: #ffffff;
}
.message-box-content {
  padding: 30px 20px;
  margin: 0 auto;
  width: 100%;
}
.username {
  margin-top: 30px;
}
</style>