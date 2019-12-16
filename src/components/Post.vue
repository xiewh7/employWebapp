<template>
  <div>
      <x-header>发送帖子<a slot="right" @click="submitTiezi()">发送</a></x-header>
    <group>
      <x-input title="帖子主题" placeholder="输入主题" :required="true" ref="input02" v-model="topic" ></x-input>
      <popup-radio title="分类" :options="options" v-model="option"></popup-radio>
      <x-input title="月薪" placeholder="输入求职/招聘月薪" :required="true" ref="input03" v-model="pay" ></x-input>
      <x-input title="职位" placeholder="输入求职/招聘职位" :required="true" ref="input04" v-model="job" ></x-input>
      <x-input title="工作地点" placeholder="输入工作地点" :required="true" ref="input05" v-model="position" ></x-input>
      <x-textarea title="主要内容"  placeholder="输入内容" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')" v-model="content" style="height:100%"></x-textarea>
      <toast v-model="show1" :time="800" :type="type" is-show-mask :text="toastText"></toast>
      <!-- <x-button @click.native="submitTiezi()">submit</x-button> -->
    </group>
    <!-- md -->
  </div>
</template>



<script>
import {Toast,PopupRadio,XHeader, XTextarea, Group, XInput ,XButton} from 'vux'
import store from '@/store/LocalStore.js'

export default {
  components: {
    Toast,
    PopupRadio,
    XHeader,
    XTextarea,
    Group,
    XInput,
    XButton
  },
  data(){
    return{
      topic: '',
      pay: 0,
      job: '',
      position: '',
      content: '',
      u_name: '',
      count: 0,
      createtime:'',
      option: '求职',
      options: ['招聘','求职'],
      type:'warn',
      toastText:'',
      show1:false
    }
    
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    getNowFormatDate () {
      var date=new Date();
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    submitTiezi(){
      if(!(this.topic && this.pay !== 0 && this.position && this.content && this.job)){
        this.type = 'warn'
        this.toastText = '有空未填或月薪未改'
        this.show1 = true
      }else{
        var readyData=this.$qs.stringify({
              'id': store.fetchId(),
              'title': this.topic,
              'createtime':new Date().getTime()/1000,//用户账号
              'pay':this.pay,//用户密码
              'job': this.job,
              'position': this.position,
              'count': this.count,
              'desc': this.content,
              'name': store.fetchName(),
              'class': this.option
          });  
          this.$axios.post('/posts/addPost',readyData).then((res) => {
              console.log(res)
            if (res.data.status === 1){
              this.type = 'success'
              this.toastText = '发帖成功'
              this.show1 = true
            } else {
              this.type = 'warn'
              this.toastText = '发帖失败'
              this.show1 = true
            } 
          }).catch((err) => {return err})
      //this.$router.push({ name:'MustFind',params:{topic:this.topic,content:this.content}})
      }
    }
  }
}
</script>