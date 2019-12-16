<template>
  <div>
      <x-header>我的账号信息<a slot="right" @click="saveUser()">保存</a></x-header>
    <group>
      <toast v-model="show1" :time="800" :type="type" is-show-mask :text="toastText"></toast>
      <x-input title="" type="text" placeholder="名字"  v-model="name" :max="5"  required></x-input>
        <x-input title="" name="mobile" placeholder="请输入手机号码" ref="mobile" v-model="mobile" keyboard="number" is-type="china-mobile" required disabled></x-input>
        <x-input title="" type="text" placeholder="所在大学（毕业本科/硕士）" v-model="school"  :max="16"  required></x-input>
        <popup-radio title="性别" :options="options" v-model="option"></popup-radio>
        <datetime v-model="birthday" title="生日" :min-year=1980 ></datetime>
    </group>
    <!-- md -->
  </div>
</template>



<script>
import {Toast,Datetime,PopupRadio,XHeader, XTextarea, Group, XInput ,XButton} from 'vux'
import store from '@/store/LocalStore.js'

export default {
  components: {
    Toast,
    Datetime,
    PopupRadio,
    XHeader,
    XTextarea,
    Group,
    XInput,
    XButton
  },
  data(){
    return{
      name: store.fetchName(),
      mobile:'',
      school:'',
      birthday: '',
      option: '男',
      options: ['男','女'],
      show1:false,
      toastText:'',
      type:'warn'
    }
    
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    saveUser(){
      if(this.birthday === '' || this.name === '' || this.school === '')
      {
          this.toastText = '资料未完善'
          this.show1 = true
          this.type = 'warn'
      }else{
        var readyData=this.$qs.stringify({
                'id': store.fetchId(),
                'birthday': this.birthday,
                'sex': this.option,
                'name': this.name,
                'school':this.school
            
            });  
            this.$axios.post('/api/replaceUser',readyData).then((res) => {
                //console.log(res)
                this.show1=true
                this.toastText='保存成功'
                this.type = 'success'
            }).catch((err) => {return err})
      }
      //this.$router.push({ name:'MustFind',params:{topic:this.topic,content:this.content}})

    }
  },
  mounted () {
      this.$axios.get('/api/queryUserforfile',{params: {u_id: store.fetchId()}}).then((res) => {
          console.log(res)
           if (res.data.length !== 0){
               this.mobile = res.data[0].u_account
               this.school = res.data[0].u_school
               this.birthday = res.data[0].u_birthday
               this.option = res.data[0].u_sex
           }
        })
  }
}
</script>