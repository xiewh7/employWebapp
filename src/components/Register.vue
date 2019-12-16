<template>
  <div class="Register" style="width: 100%">
    <!-- <img src="../assets/logo1.png" style = "width: 100px; margin: 0 auto"><br> -->
    <group>
        <x-input title="" type="text" placeholder="名字"  v-model="name" :max="5"  required></x-input>
        <x-input title="" name="mobile" placeholder="请输入手机号码" ref="mobile" v-model="mobile" keyboard="number" is-type="china-mobile" required></x-input>
        <x-input title="" type="password" placeholder="请输入密码" v-model="password" :min="6" :max="16" @on-change="change" required></x-input>
        <x-input title="" type="password" placeholder="请再次输入密码" v-model="passwordcopy" :min="6" :max="16"  required></x-input>
        <x-input title="" type="text" placeholder="所在大学（毕业本科/硕士）" v-model="school"  :max="16"  required></x-input>
        <popup-radio title="性别" :options="options" v-model="option"></popup-radio>
        <datetime v-model="birthday" title="生日" :min-year=1980 ></datetime>
    </group>
    <group>
      
    </group>
      <toast v-model="show1" :time="800" :type="type" is-show-mask :text="toastText"></toast>
      <box gap="10px 25px">
        <x-button type="primary" @click.native="handleRegister">注册</x-button>
        <x-button @click.native="back">返回</x-button>
      </box>
      
  </div>
</template>

<script>
  import {Datetime,PopupRadio, Toast, XInput,Box, Group, XButton } from 'vux'
  import Mymd5 from '@/md5/md5'
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        mobile:'',//用户账号
        password:'',//用户密码
        show1: false,//toast
        toastText: '',
        passwordcopy: '',
        school: '',
        options: ['男','女'],
        option: '男',
        birthday: '',
        type:'warn',
        exist:0
      }
    },
    components: {
        Datetime,
        PopupRadio,
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
      getUser () {
        this.$axios.get('/api/Login',{params: {account: this.mobile,
                                                password: '0'}}).then((res) => {

            if (res.data.status === 1){             
            } else if (res.data.status === -1){
              this.exist = 0
            } else {
              this.exist = 1
            }
          })
      },
      handleRegister(){
        this.getUser()
        if(!this.$refs.mobile.valid)
        {
          this.type = 'warn'
          this.toastText = '账号格式错误'
          this.show1 = true
        }
        else if(this.password !==this.passwordcopy)
        {
          console.log(this.password,this.passwordcopy)
          this.type = 'warn'
          this.toastText = '密码重复错误'
          this.show1 = true
        }
        else if(!(this.name && this.mobile && this.password && this.passwordcopy && this.school && this.birthday)){
          this.type = 'warn'
          this.toastText = '资料未完善'
          this.show1 = true
        }else if(this.exist === 1){
          this.type = 'warn'
          this.toastText = '账号已被注册'
          this.show1 = true
        }else{

          var readyData=this.$qs.stringify({
              'name': this.name,
              'mobile':this.mobile,//用户账号
              'password':this.$md5(this.password),//用户密码
              'school': this.school,
              'sex': this.option,
              'birthday': this.birthday
          });  
          this.$axios.post('/api/Register',readyData).then((res) => {
              console.log(res)
            if (res.data.status === 1){
              this.type = 'success'
              this.toastText = '注册成功'
              this.show1 = true
            } else {
              this.type = 'warn'
              this.toastText = '注册失败'
              this.show1 = true
            } 
          }).catch((err) => {return err})
        }
        // this.$router.push({
        //   path:'/Tab'
        // })
      },
      back () {
          this.$router.push({
              path:'/'
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
  .Register{
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