<template>
  <div>
      <x-header>简历<a slot="right" @click="saveResume()">保存</a></x-header>
    <group>
      <toast v-model="show1" :time="800" type="success" is-show-mask :text="toastText"></toast>
      <x-input title="姓名" placeholder="输入姓名" :required="true"  v-model="name" ></x-input>
      <datetime v-model="birthday" title="生日" :min-year=1980 ></datetime>
      <popup-radio title="性别" :options="options" v-model="option"></popup-radio>
      <x-input title="专业" placeholder="输入专业" :required="true"  v-model="major" ></x-input>
      <x-input title="学历" placeholder="输入本科等" :required="true"  v-model="degree" ></x-input>
      <x-input title="电话" v-model="phone" keyboard="number" is-type="china-mobile" placeholder="输入联系电话" :required="true"  ></x-input>
      <x-input title="希望月薪" placeholder="输入数字（￥）" :required="true"  v-model="pay" ></x-input>
      <x-input title="希望职位" placeholder="输入职位" :required="true"  v-model="job" ></x-input>
      <x-input title="希望工作地点" placeholder="输入工作地点" :required="true"  v-model="position" ></x-input>
      <x-textarea title="自我介绍（要求）"  placeholder="输入内容"  v-model="desc" style="height:100%"></x-textarea>
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
      pay: 0,
      job: '',
      position: '',
      birthday: '',
      major: '',
      phone:'',
      degree: '',
      option: '男',
      options: ['男','女'],
      show1:false,
      toastText:'',
      desc:''
    }
    
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    saveResume(){
      var readyData=this.$qs.stringify({
            'id': store.fetchId(),
            'birthday': this.birthday,
            'major': this.major,
            'pay':this.pay,
            'job': this.job,
            'position': this.position,
            'sex': this.option,
            'phone': this.phone,
            'name': this.name,
            'degree': this.degree,
            'desc': this.desc
        });  
        this.$axios.post('/resume/replaceResume',readyData).then((res) => {
            //console.log(res)
            this.show1=true
            this.toastText='保存成功'
        }).catch((err) => {return err})
      //this.$router.push({ name:'MustFind',params:{topic:this.topic,content:this.content}})

    }
  },
  mounted () {
      this.$axios.get('/resume/queryResume',{params: {u_id: store.fetchId()}}).then((res) => {
          //console.log(res.data[0].r_birthday)
           if (res.data.length !== 0){
               this.name = res.data[0].r_name
               this.pay = res.data[0].r_pay
               this.birthday = res.data[0].r_birthday
               this.job = res.data[0].r_job
               this.option = res.data[0].r_sex
               this.phone = res.data[0].r_phone
               this.position = res.data[0].r_position
               this.degree = res.data[0].r_degree
               this.major = res.data[0].r_major
               this.desc = res.data[0].r_desc
           }
        })
  }
}
</script>