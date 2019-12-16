<template>
	<div class="timeline-demo">
    <x-header>设计流程</x-header>
    <toast v-model="show1" :time="800" :type="Ttype" is-show-mask :text="toastText"></toast>
		<timeline class="timechart" style="">
			<timeline-item v-for="(item, index) in content" :key="index" :biao-ji="index">
				<h4 :class="[index === $route.query.e_recent ? 'recent' : '']">{{item}}</h4>
				<p :class="[index === $route.query.e_recent ? 'recent' : '']"></p>
			</timeline-item>
		</timeline>
    <group>
        <x-textarea :max="200" placeholder="点击下面内容需要发送的内容" style="height:100px;" v-model="msg"></x-textarea>
        <x-button type="primary" @click.native="saveChart(1)">下一步</x-button>
        <x-button type="warn" @click.native="saveChart(-1)">审批不通过</x-button>
    </group>
	</div>
</template>

<script>
import {XTextarea,XHeader,Toast,XNumber,Group,XInput, Timeline, TimelineItem, XButton } from 'vux'
import store from '@/store/LocalStore'

export default {
  components: {
    XTextarea,
    XHeader,
    Toast,
    XNumber,
    Group,
    XInput,
    Timeline,
    TimelineItem,
    XButton
  },
  data () {
    return {
      count: 3,
      content:['投递简历','第2步','第3步'],
      show1:false,
      toastText:'',
      e_recent:0,
      msg:'',
      pass:0,
      Ttype:'success'
    }
  },
  watch:{
      'count':function(){
          if(this.count < this.content.length) this.content.pop()
          for(let i = 0;i < this.count;i++){
              if(i >= this.content.length){
                  let index = i + 1
                  this.content.push('第'+ index +'步')
              }
          }
      }
  },
  methods: {
      sendMsg () {
            var readyData=this.$qs.stringify({
                    'ac_id': this.$route.query.u_id,
                    'id':store.fetchId(),
                    'p_id':-1,
                    'content': this.msg,
                    'createtime': new Date().getTime()/1000,
                    'read': 0
                });  
                this.$axios.post('/chats/addChat',readyData).then((res) => {
                    console.log(res)
                }).catch((err) => {return err})
    },
      saveChart (flag) {
            if(this.pass === -1){
                this.Ttype='warn'
                this.show1=true
                this.toastText='已经审批'
                return
            }
            let readyData = ''
            if (flag === 1)
            {
                this.$route.query.e_recent = parseInt(this.$route.query.e_recent) + 1
                this.e_recent = this.$route.query.e_recent
            }
            else this.e_recent = this.$route.query.e_recent
            //console.log(str.split('|'))
            if (flag === 1){
                readyData=this.$qs.stringify({
                    'u_id': this.$route.query.u_id,
                    'u_accept_id': store.fetchId(),
                    'e_recent': this.e_recent,
                    'e_pass':0
                });  
            }
            else{
               readyData=this.$qs.stringify({
                    'u_id': this.$route.query.u_id,
                    'u_accept_id': store.fetchId(),
                    'e_recent': this.e_recent,
                    'e_pass':-1
                });  
                let div = document.querySelectorAll('.recent')
                //console.log(div)
                div[0].style.color = '#ff0000'
                this.pass = -1
            }
            this.$axios.post('/employ/updateEmploy',readyData).then((res) => {
                //console.log(res)
                this.Ttype='success'
                this.show1=true
                this.toastText='操作成功'
            }).catch((err) => {return err})
          //发送信息
          if (this.msg !== ''){
              this.sendMsg()
          }
    }
  },
  mounted () {
      this.$axios.get('/chart/queryChart',{params: {u_id: store.fetchId()}}).then((res) => {
          this.content=[]
          
           if (res.data.length !== 0){
               let str = res.data[0].ch_content.split('|')
                for (let i = 0;i < str.length; i++ )
                {
                    this.content[i] = str[i]
                }
           }
           this.count = this.content.length
        }).then(() => {
            let div = document.querySelectorAll('li')
            //console.log(div[1].getAttribute('biao-ji'))
            div.forEach((ele)=>{
                if (ele.getAttribute('biao-ji') < this.$route.query.e_recent)
                {
                    let target = ele.children[0]
                    console.log(target)
                    target.classList.remove("vux-timeline-item-head")
                    target.classList.add('vux-timeline-item-head-first')
                    target.children[0].style.display = 'inline'
                }
            })
        })
        this.$axios.get('/employ/queryEmploy',{params: {u_accept_id: store.fetchId(),u_id: this.$route.query.u_id }}).then((res) => {
            if (res.data[0] !== null){
                this.pass = res.data[0].e_pass
                if(res.data[0].e_pass !== 0){
                    let div = document.querySelectorAll('.recent')
                    div[0].style.color = '#ff0000'
                }
                else{
                    let div1 = document.querySelectorAll('li')
                    div1.forEach((ele)=>{
                        if (ele.getAttribute('biao-ji') === this.$route.query.e_recent)
                        {
                            let target = ele.children[0]
                            console.log(target)
                            target.classList.remove("vux-timeline-item-head")
                            target.classList.add('vux-timeline-item-head-first')
                            target.children[0].style.display = 'inline'
                        }
                    })
                }
            }
        })

    
  }
}
</script>

<style lang="less">
.timeline-demo {
	p {
		color: #888;
		font-size: 0.8rem;
	}
	h4 {
		color: #666;
		font-weight: normal;
	}
	.recent {
		color: rgb(4, 190, 2)
    }
    .vux-timeline > ul > li {
    margin-bottom: -20px;
    }
    
}
</style>