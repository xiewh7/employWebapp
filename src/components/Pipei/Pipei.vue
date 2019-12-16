<template>
  <div>
    <divider>根据您的简历推荐</divider>
    <div v-for="item in sortList" :key="item.p_id" style="margin-top:10px;font-size:0.8rem" >
        <flexbox :gutter="2">
        <flexbox-item :span="3"><div class="flex-demo" style="line-height:60px;vertical-align:center">{{item.p_title}}</div></flexbox-item>
        <flexbox-item :span="2"><div class="flex-demo" style="line-height:60px;vertical-align:center">{{item.u_name}}</div></flexbox-item>
        <flexbox-item ><div class="flex-demo" style="line-height:60px;vertical-align:center">{{item.p_desc}}</div></flexbox-item>
        <flexbox-item :span="1"><div class="flex-demo" style="line-height:60px;vertical-align:center;background-color: #FF0000;"><router-link tag="div" :to="{path:'/Tiezi/Tiezi/'+item.p_id+'/'+item.u_id+'/'+item.u_name+'/'+item.p_title+'/'+item.p_createtime+'/'+item.p_pay+'/'+item.p_job+'/'+item.p_position+'/'+item.p_desc+'/'+item.p_count}">></router-link></div></flexbox-item>
        </flexbox>
    </div>
    <br>
  </div>
</template>



<script>
import { Flexbox, FlexboxItem, Divider } from 'vux'
import store from '@/store/LocalStore'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },
  data () {
      return{
          jianli :'',
          list:[],
          simmliarlist:[]
      }
      
  },
  created () {
      this.$axios.all([
          this.$axios.get('/resume/queryResume',{params: {u_id: store.fetchId()}}),
          this.$axios.get('/posts/queryPost')
      ]).then(this.$axios.spread( (res1,res2) => {
           if (res1.data.length !== 0){
               this.jianli = new Array()
               this.jianli = res1.data[0]
                //console.log(this.jianli)
           }
           this.list = new Array()
            res2.data.forEach(element => {
                if (element.p_class === '招聘'){
                    //this.list.push(element)
                    let Sim1 = this.SimForStr(element.p_job, this.jianli.r_job,element.p_job.length,this.jianli.r_job.length)
                    let Sim2 = this.SimForStr(element.p_position, this.jianli.r_position,element.p_position.length,this.jianli.r_position.length)
                    let Sim3 = this.SimForStr(element.p_desc, this.jianli.r_desc,element.p_desc.length,this.jianli.r_desc.length)
                    let Sim4 = this.SimForNum(element.p_pay, this.jianli.r_pay)
                    let ele = {
                        ...element,
                        sim: Sim1 + Sim2 + Sim3 + Sim4
                    }
                    this.list.push(ele)
                    //console.log(ele)
                }
            });
            //console.log(this.list)
            
        }))
        
        
  },
  computed: {
    sortList () {
      return this.sortByKey(this.list,'sim')
    }
  },
  methods:{
    
    sortByKey (array, key) {
        return array.sort(function(a,b){
            let x = a[key]
            let y = b[key]
            return ((x>y)?-1:((x<y)?1:0))
        })
    },
    SimForStr(str1,str2,len1,len2) {
            //建立数组，比字符长度大一个空间  
            let dif = new Array();  
            //赋初值。  
            for (let i = 0; i <= len1; i++) {
                dif[i] = new Array()
                    dif[i][0] = i
                for (let j = 0; j <= len2; j++) {
                    dif[0][j] = j
                }
            }
            //计算两个字符是否一样，计算左上的值
            var temp;  
            for (let i = 1; i <= len1; i++) {
                for (let j = 1; j <= len2; j++) {
                    if (str1[i-1] === str2[j-1]) {
                        temp = 0;  
                    } else {
                        temp = 1;  
                    }
                    //取三个值中最小的
                    dif[i][j] = Math.min(dif[i - 1][j - 1] + temp, dif[i][j - 1] + 1,  
                            dif[i - 1][j] + 1);  
                }
            }
            //计算相似度
            let similarity =1 -  dif[len1][len2] / Math.max(len1, len2);
            return similarity
    },
    SimForNum (num1, num2) {
        let dis = 0
        if (num1 < num2){
            dis = num2 - num1
        }
        else dis = num1 - num2
        return 1 - dis / Math.min(num1,num2)
    }


  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
  height: 60px;
}
</style>