<template>
  <div>
    <panel  :list="sortList" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<!-- <i18n>
Switch the type:
  zh-CN: 切换样式
List of content with image:
  zh-CN: 图文组合列表
More:
  zh-CN: 查看更多
</i18n> -->

<script>
import { Panel, Group, Radio } from 'vux'


export default {
  components: {
    Panel,
    Group,
    Radio
  },
  mounted(){
    // this.lists.push({src:'',title:this.$route.params.topic,fallbackSrc:'',desc:this.$route.params.content,url:'',
    // meta:{
    //   source: '来源信息',
    //   date: '1998',
    //   other: '0'
    // }})
  },
  methods: {
    getNowFormatDate (time) {
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    onImgError (item, $event) {
      console.log(item, $event)
    },
    sortByKey (array, key){
      return array.sort(function(a,b){
        let x = a[key].other
        let y = b[key].other
        return ((x>y)?-1:((x<y)?1:0))
      })
    }
  },
  data () {
    return {
      type: '5',
      rawList:[],
      lists: []
    }
  },
  created () {
    this.$axios.get('/posts/queryPost').then((res) => {
      this.rawList = res.data
      console.log(this.rawList)
      let i = 0
      this.lists = new Array()
      res.data.forEach(element => {
        //console.log(element)
        this.lists.push ({
          src: '',
          title: '【' + element.p_class + '】'+element.p_title,
          desc: element.p_desc,
          url: '/Tiezi/Tiezi/'+element.p_id+'/'+element.u_id+'/'+element.u_name+'/'+element.p_title+'/'+element.p_createtime+'/'+element.p_pay+'/'+element.p_job+'/'+element.p_position+'/'+element.p_desc+'/'+element.p_count,
          meta: {
            source: element.u_name,
            date: this.getNowFormatDate(element.p_createtime),
            other: '人气:'+element.p_count
          },
          timeStamp: element.p_createtime,
          hot: element.p_count
        })
      });
    })      
  },
  computed: {
    sortList () {
      return this.sortByKey(this.lists,'timeStamp')
    }
  },
}
</script>