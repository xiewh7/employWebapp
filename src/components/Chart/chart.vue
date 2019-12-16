<template>
	<div class="timeline-demo">
    <x-header>设计流程</x-header>
    <toast v-model="show1" :time="800" type="success" is-show-mask :text="toastText"></toast>
		<timeline style="">
			<timeline-item v-for="(item, index) in content" :key="index">
				<h4 :class="[index === 0 ? 'recent' : '']">{{item}}</h4>
				<p :class="[index === 0 ? 'recent' : '']"></p>
			</timeline-item>
		</timeline>
    <group>
    <x-input v-for="(item, index) in content" :key="index" type="text" :placeholder="'输入步骤'+index" v-model="content[index]"  required></x-input>
    </group>
    <group >
      <x-number v-model="count" title="步骤数" fillable :min="3" ></x-number>
    </group>
    <x-button type="primary" @click.native="saveChart">保存</x-button>
	</div>
</template>

<script>
import {XHeader,Toast,XNumber,Group,XInput, Timeline, TimelineItem, XButton } from 'vux'
import store from '@/store/LocalStore'

export default {
  components: {
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
      toastText:''
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
      saveChart () {
          let str = ''
          for (let i = 0;i < this.content.length; i++ )
          {
              str = str + this.content[i] 
              if(i !== this.content.length - 1) str = str + '|'
          }
          console.log(str.split('|'))
          var readyData=this.$qs.stringify({
            'id': store.fetchId(),
            'content': str
        });  
        this.$axios.post('/chart/replaceChart',readyData).then((res) => {
            //console.log(res)
            this.show1=true
            this.toastText='保存成功'
        }).catch((err) => {return err})
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