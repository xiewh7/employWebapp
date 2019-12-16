<template>
  <div  class="content-talk messagebox" style="width:100%;height:100%;margin-left:0;margin-top:0;overflow-y: auto;">
      <x-header style="position:fixed;top:0px;width:100%;">{{u_accept_name}}</x-header>
      <ul  style="margin-top:60px;margin-bottom:100px;" >
      <li class="clearfix" v-for="(chat,index) in chats" 
      :key="chat.c_id_" v-bind:class="{'odd':id!=chat.u_id,'even':id==chat.u_id}" style="list-style-type:none;">
    <div style="width:100%;height:40px;padding:0px;" :class="{'righttime':id!=chat.u_id,'lefttime':id==chat.u_id}">
    <span class="timeblock" v-show="true" :id="index">
      <span v-show="id!=chat.u_id">对方</span>
      {{getNowFormatDate(chat.c_createtime)}}
      <span v-show="id==chat.u_id">你</span>
      </span>
    </div>
    <!-- <img v-bind:src="getUserimg" alt="" v-if="id!=chat.u_id">
    <img v-bind:src="meUserimg" alt="" v-else> -->
    <b></b>
    <div style="clear:both"></div>
    <div style="width:100%;padding:0px;height:auto">
        <p class="chatContent">{{chat.c_content}}</p>
    </div>
    <div style="clear:both"></div>
    </li>
    </ul>
    <div style="background:#cfcfcf;position:fixed;bottom:0;padding:10px;width:100%;height:auto;">
      <div style="float:left;width:70%;">
      <group>
        <x-textarea :max="60" placeholder="发送信息" style="height:40px;" v-model="content"></x-textarea>
      </group>
      </div>
      <div class="sendButton" @click="sendMsg" style="float:left;width:20%;background:rgb(26,173,25);height: 60px;margin-top: 20px;margin-left: 20px;border-radius:6px;">
        <p style="line-height30px;text-align:center;color:white">发送</p>
      </div>
    </div>
  </div>
</template>

<script>
import {XTextarea, Tabbar, TabbarItem,Cell,Group,Sticky, XHeader, Actionsheet,
    ButtonTab,
    ButtonTabItem,Divider, Card } from 'vux'

export default {
  components: {
    XTextarea,
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
  mounted () {
      var readyData=this.$qs.stringify({
            'u_id': this.$route.query.u_accept_id,
            'u_accept_id':this.$route.query.u_id
        });  
      this.$axios.post('/chats/updateChatRead',readyData).then((res) => {
            console.log(res)
      }).catch((err) => {return err})

      this.$axios.get('/chats/queryChat',{params: {u_id: this.$route.query.u_id,
                                              u_accept_id: this.$route.query.u_accept_id}}).then((res) => {
            //console.log(res.data)
            this.chats = res.data
            this.id = this.$route.query.u_id
            this.$nextTick(() => {            
              var scrollTop = document.querySelector('.messagebox')
              document.documentElement.scrollTop = scrollTop.scrollHeight 
            })
        })
      this.$axios.get('/api/getName',{params: {u_id: this.$route.query.u_accept_id}}).then((res) => {
            if(res) this.u_accept_name = res.data[0].u_name
            // console.log(this.u_accept_name)
        })
      
  },
  methods:{
    getNowFormatDate (time) {   
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    backFind () {
        this.$router.back()
    },
    sendMsg () {
      var readyData=this.$qs.stringify({
            'ac_id': this.$route.query.u_accept_id,
            'id':this.$route.query.u_id,
            'p_id':this.$route.query.p_id,
            'content': this.content,
            'createtime': new Date().getTime()/1000,
            'read': 0
        });  
        this.$axios.post('/chats/addChat',readyData).then((res) => {
            console.log(res)
        }).catch((err) => {return err})
        this.$router.go(0)
        this.$nextTick(() => {            
              var scrollTop = document.querySelector('.messagebox')
              document.documentElement.scrollTop = scrollTop.scrollHeight 
        })
    }
    
  },
  data () {
      return {
          chats: [
              {
                  c_id:0,
                  u_accept_id:1,
                  u_id:2,
                  c_content:'hellodasdsadsadsadsadsadadsaddasd',
                  c_createtime:142154651,
                  c_read:false
              },
              {
                  c_id:1,
                  u_accept_id:2,
                  u_id:1,
                  c_content:'hello',
                  c_createtime:142154651,
                  c_read:false
              },{
                  c_id:0,
                  u_accept_id:1,
                  u_id:2,
                  c_content:'hello',
                  c_createtime:142154651,
                  c_read:false
              },
          ],
          id:1,
          content: '',
          u_accept_name:''
      }
  }
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
.lefttime {
  margin-left: -30px;
}
.righttime {
  margin-left: 0px;
}
//.content-talk ul li.odd img{width:45px;height:45px;border-radius: 50%;float: left;background: url("@/assets/msg.png") no-repeat center center;background-size: 45px 45px;}
//.content-talk ul li.even img{width:45px;height:45px;border-radius: 50%;float: right;background: url("@/assets/msg.png") no-repeat center center;background-size: 45px 45px;}
.content-talk ul li.odd  p.chatContent{background: #00FFFF;float:left;margin-left: -20px;margin-top: 0px;max-width:60%;font-size: 14px;padding:10px;border-radius: 6px;word-wrap:break-word; 
word-break:normal;}
.content-talk ul li.odd b{width:8px;height:14px;display: inline-block;background: url("") no-repeat;background-size: 8px 14px;position: absolute;left:58px;top:8px;}
.content-talk ul li.even  p.chatContent{background: #FF00FF;float:right;margin-right: 10px;margin-top: 0px;max-width:60%;border-radius: 6px;font-size: 14px;padding:10px;word-wrap:break-word; 
word-break:normal;}
.content-talk ul li.even b{width:8px;height:14px;display: inline-block;background: url("") no-repeat;background-size: 8px 14px;position: absolute;right:58px;top:8px;}
.content-talk ul li.even .timeblock{font-size: 14px;padding:10px;float:right;margin-right: -30px;width:160px;}
.content-talk ul li.odd .timeblock{font-size: 14px;padding:10px;float:left;margin-left: -30px;width:170px;}
</style>