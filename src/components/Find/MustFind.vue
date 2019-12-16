<template>
  <div>
    <panel  :list="sortList" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<script>
import { Panel, Group, Radio } from 'vux'

export default {
  components: {
    Panel,
    Group,
    Radio
  },
  computed: {
    sortList () {
      return this.sortByKey(this.lists,'timeStamp')
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
          title: '【' + element.p_class + '】'+element.p_title ,
          desc: element.p_desc,
          url: '/Tiezi/Tiezi/'+element.p_id+'/'+element.u_id+'/'+element.u_name+'/'+element.p_title+'/'+element.p_createtime+'/'+element.p_pay+'/'+element.p_job+'/'+element.p_position+'/'+element.p_desc+'/'+element.p_count,
          meta: {
            source: element.u_name,
            date: this.getNowFormatDate(element.p_createtime),
            other: '人气：'+element.p_count
          },
          timeStamp: element.p_createtime,
          hot: element.p_count
        })
      });
    })      
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
    sortByKey (array, key){
      return array.sort(function(a,b){
        let x = a[key]
        let y = b[key]
        return ((x>y)?-1:((x<y)?1:0))
      })
    },
    getNowFormatDate (time) {   
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    onImgError (item, $event) {
      console.log(item, $event)
    }
  },
  data () {
    return {
      type: '5',
      rawList:[],
      lists: [{
        src: '',
        title: '招聘会计',
        desc: '需要一年经验',
        url: '/Home',
        meta: {
          source: '来源信息',
          date: '1998',
          other: '3'
          
        }
      }, {
        src: '',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        //url: {
        //   path: '/component/radio',
        //   replace: false
        // },
        meta: {
          source: '来源信息',
          date: '1997',
          other: '2',
        }
      }],
      footer: {
        title:"查看更多",
        url: 'http://vux.li'
      }
    }
  }
}
</script>