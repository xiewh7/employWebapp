<template>
	<div class="timeline-demo">
    <x-header>招聘流程</x-header>
		<timeline style="">
			<timeline-item v-for="(item, index) in content" :key="index" :biao-ji="index">
				<h4 :class="[index === $route.query.e_recent ? 'recent' : '']">{{item}}</h4>
				<p :class="[index === $route.query.e_recent ? 'recent' : '']"></p>
			</timeline-item>
		</timeline>
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
      
  },
  mounted () {
      this.$axios.get('/chart/queryChart',{params: {u_id: this.$route.query.u_id}}).then((res) => {
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
                if (ele.getAttribute('biao-ji') <= this.$route.query.e_recent)
                {
                    let target = ele.children[0]
                    console.log(target)
                    target.classList.remove("vux-timeline-item-head")
                    target.classList.add('vux-timeline-item-head-first')
                    target.children[0].style.display = 'inline'
                }
            })
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
    .vue-timeline-item >div{

    }
}
</style>