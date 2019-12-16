<template>
  <div class="login" style="width: 100%;">
    <!-- <img src="../assets/logo1.png" style = "width: 100px; margin: 0 auto"><br> -->
    <group>
        <x-input title="" name="mobile" placeholder="请输入手机号码" v-model="mobile" keyboard="number" ref="mobile" is-type="china-mobile" required></x-input>
        <x-input title="" type="password" placeholder="请输入密码" v-model="password" :min="6" :max="16" @on-change="change" required></x-input>
      </group>
      <p><span class="forget-pass" @click="changePassword">忘记密码?</span></p>
      <toast v-model="show1" :time="800" type="warn" is-show-mask :text="toastText"></toast>
      <box gap="10px 25px">
        <x-button type="primary" @click.native="handleLogin">登录</x-button>
        <x-button @click.native="register">注册</x-button>
      </box>
      <!-- <p><span class="to-regist">还没有账号？快去注册</span></p> -->
  </div>
</template>

<script>
  import {Toast, XInput,Box, Group, XButton } from 'vux'
  import store from '@/store/LocalStore.js'
  export default {
    name: 'login',
    data() {
      return {
        mobile:'',//用户账号
        password:'',//用户密码
        show1: false,//toast
        toastText: ''
      }
    },
    components: {
        Toast,
        XInput,
        XButton,
        Group,
        Box
    },
    methods:{
      change (val) {
          console.log('on change', val)
      },
      changePassword(){
        this.$router.push({
          path:'/changePassword'
        })
      },
      handleLogin(){
        if(!this.$refs.mobile.valid)
        {
          this.toastText = '账号格式错误'
          this.show1 = true
        }else{
         
         
          this.$axios.get('/api/Login',{params: {account: this.mobile,
                                                password: this.$md5(this.password)}}).then((res) => {
             console.log(res.data.status)                                       
            if (res.data.status === 1){
              store.saveName(res.data.u_name)
              store.saveId(res.data.u_id)
              console.log(res.data.u_name)
              this.$router.push({
                path:'/Tab'
              })
               
            } else if (res.data.status === -1){
              this.toastText = '用户不存在'
              this.show1 = true
              console.log("用户不存在")
            } else {
              this.toastText = '密码不正确'
              this.show1 = true
              console.log("密码不正确")
            }
          })
        }
        // this.$router.push({
        //   path:'/Tab'
        // })
      },
      register () {
        this.$router.push({
              path:'/Register'
            })
      }
    },
    created:function(){
      
    }
  }
</script>

<style scoped lang="less">
  @color666:#666666;
  @color393a31:#393a31;
  .input-box{
    background-color: #FFFFFF;
  }
  .login{
    >p:first-of-type{
      padding: 20px 15px 40px;
      float: right;
      color: @color666;
      font-size:14px;
    }
    >p:last-of-type{
      width: 100%;
      text-align: center;
      color: @color393a31;
      font-size:14px;
      position: absolute;
      bottom: 25px;
    }
  }
  .icon-wx{
    width: 18px;
    height: 14px;
    margin-right: 6px;
  }
</style>