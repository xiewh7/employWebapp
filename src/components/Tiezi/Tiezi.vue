<template>
  <div>
    <x-header >查看帖子</x-header>
    <divider>{{$route.params.p_title}}</divider>
	   <card >
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{$route.params.p_pay}}</span>
          <br/>
          月薪
        </div>
        <div class="vux-1px-r">
          <span>{{$route.params.p_job}}</span>
          <br/>
          职位
        </div>
        <div class="vux-1px-r">
          <span>{{$route.params.p_position}}</span>
          <br/>
          地点
        </div>
        <div>
          <span>无</span>
          <br/>
          备注
        </div>
      </div>
    </card>

    <br>
    <divider>帖子详情</divider>
     <card  >
    </card>
    <card>
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">{{getNowFormatDate($route.params.p_createtime)}}</p>
        <p style="font-size:14px;line-height:1.2;">{{$route.params.p_desc}}</p>
      </div>
    </card>
    <tabbar slot="bottom" style="position: fixed;">
      <tabbar-item :selected="selected == 'chat'" @on-item-click="toChat">
				<img slot="icon" src="@/assets/msg.png">
				<span slot="label">私信</span>
			</tabbar-item>
			<tabbar-item :selected="selected == 'sendJianli'" @on-item-click="sendResume">
				<img slot="icon" src="@/assets/jianli.png">
				<span slot="label">投递简历</span>
			</tabbar-item>
    </tabbar>
    <!-- <div class="comment" style="position:absolute;bottom:0px;width:100%;height:80%;background:black">
      <group label-width="5em" title="Align-items">
        <cell primary="content" title="default" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
        <cell title="flex-start" align-items="flex-start" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
      </group>

    </div> -->
    <group>
      <toast v-model="show1" :time="800" type="success" is-show-mask :text="toastText"></toast>
    </group>
  </div>
</template>

<script>
import {Toast,Tabbar, TabbarItem,Cell,Group,Sticky, XHeader, Actionsheet,
    ButtonTab,
    ButtonTabItem,Divider, Card } from 'vux'
import store from '@/store/LocalStore'

export default {
  components: {
    Toast,
    Tabbar,
    TabbarItem,
    Cell,
    Group,
    Sticky,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    Card,
    Divider
  },
  created (){
    let ele = this.$route.params.p_id
    //ele = JSON.stringify(ele)
    let record = store.fetchCount()
    if (record.indexOf(ele) === -1){
      record.push(ele)
      store.saveCount(record)
      var readyData=this.$qs.stringify({
            'p_id': this.$route.params.p_id
        }); 
      this.$axios.post('/posts/updatePostCount',readyData).then((res) => {
            console.log(res)
      }).catch((err) => {return err})
    }
      
      this.$axios.get('/resume/queryResume',{params: {u_id: store.fetchId()}}).then((res) => {
           let resume = {}
           if (res.data.length !== 0){
               resume = res.data[0]
           }
           this.content = '您好，我是' + resume.r_name + ',是一个出生于'+resume.r_birthday+'的' +resume.r_sex+'生,学历专业为'+resume.r_degree+'的'+ resume.r_major+',希望在'
                    +resume.r_position+'成为一名月薪为'+resume.r_pay+'左右的'+resume.r_job+',以下是我的具体经历等：'+resume.r_desc+'。'+'谢谢您的阅读，我的联系电话为'+resume.r_phone
           this.readyData=this.$qs.stringify({
            'ac_id': this.$route.params.u_id,
            'id':store.fetchId(),
            'p_id':this.$route.params.p_id,
            'content': this.content,
            'createtime': new Date().getTime()/1000,
            'read': 0
            }); 
            this.data1=this.$qs.stringify({
            'u_accept_id': this.$route.params.u_id,
            'u_id':store.fetchId()
            }); 
            console.log(this.readyData)
        })
  },
  data () {
    return {
      selected: '',
      content:'',
      readyData:null,
      data1:null,
      toastText:'',
      type:'warn',
      show1:false

    }
  },
  methods:{
    sendResume () {
      this.$axios.post('/chats/addChat',this.readyData).then((res) => {
              console.log(res)
          }).catch((err) => {return err})
      this.$axios.post('/employ/addEmploy',this.data1).then((res) => {
              console.log(res)
              this.toastText = '投递成功'
              this.type= 'success'
              this.show1 = true
          }).catch((err) => {return err})
      
    },
    getNowFormatDate (time) {   
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    backFind () {
        this.$router.back()
    },
    toChat () {
      this.$router.push({
					name: 'Chat',
					query: {
            u_id: store.fetchId(),
            u_accept_id: this.$route.params.u_id,
            p_id: this.$route.params.p_id
					}
				})
    }
  },
  props:['pay']
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>