<template>
  <div>
     <cell title="我的帐号" value="点击修改" :link="{path:'/Myfile'}" ></cell>
     <cell is-link :link="{path:'/Mymsg'}">
        <span slot="title" style="color:green;"><span style="vertical-align:middle;">我的信息</span> <badge v-show="showBarge" text="!"></badge></span>
      </cell>
      <cell title="我的简历" value="查看/修改" :link="{path:'/MyResume'}" ></cell>
      <!-- <cell title="我的帖子" value="查看" :link="{path:''}"></cell> -->
      <cell title="我的招聘" value="查看" :link="{path:'/MyEmploy'}"></cell>
      <cell title="招聘他人" value="查看" :link="{path:'/EmployOther'}"></cell>
      <cell title="设计我的招聘流程" value="查看" :link="{path:'/MyChart'}"></cell>
  </div>
</template>



<script>
import { XImg,Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
import store from '@/store/LocalStore'
export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    XImg,
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
  },
  methods: {
    onClick () {
      console.log('on click')
    },
    sortByKey (array, key){
      return array.sort(function(a,b){
        let x = a[key]
        let y = b[key]
        return ((x>y)?-1:((x<y)?1:0))
      })
    }
  },
  created () {
    this.$axios.get('/chats/queryChatformsg',{params: {u_id: store.fetchId() }}).then((res) => {
      let sortlist = this.sortByKey(res.data,'c_createtime')
            console.log(sortlist)
            sortlist.forEach(element => {
              if(element.c_read === 0)
              {
                this.showBarge = true
              }
            })
    })
  },
  data () {
    return {
      showBarge: false
    }
  }
}
</script>

<style scoped>
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>