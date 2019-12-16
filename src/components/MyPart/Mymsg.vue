<template>
  <div>
    <x-header >我的消息</x-header>
    <div style="margin: 10px;overflow: hidden; " v-for="item in list" :key="item.c_id" @click="toChat(item.u_accept_id,item.p_id)">
      <masker style="border-radius: 5px;"  :color="item.read==0?'#990000':'#1AAD19'" :opacity="0.8">
        <div class="m-img"></div>
        <div slot="content" class="m-title">
          {{item.title}}
          <br/>
          <span class="m-time">{{item.msg}}</span>
          <br/>
          <span class="m-time">{{item.time}}</span>
        </div>
      </masker>
    </div>
  </div>
</template>

<script>
import { XHeader, Masker } from 'vux'
import store from '@/store/LocalStore'
import { copyFile } from 'fs';

export default {
  components: {
    XHeader,
    Masker
  },
  data () {
    return {
        acnamelist:[],
        namelist:[],
        list: [{
            c_id:1,
            title: '???',
        }]
    }
  },
  mounted () {
      this.$axios.all([
          this.$axios.get('/chats/queryChatformsg',{params: {u_id: store.fetchId() }}),
          this.$axios.get('/api/getAllName')]).then(this.$axios.spread( (reschat,resname) => {
            let cntAll = 0
            let cntread = 0
            let idkeylist = new Array()
            let idList = new Array()
            this.list = new Array()
            let sortlist = this.sortByKey(reschat.data,'c_createtime')
            let namlist = resname.data
            let title = ''
            //console.log(sortlist)
            //console.log(resname.data)
            for (let i = 0;i < sortlist.length ; i++) {
                 for (let j = 0;j < namlist.length ; j++){
                     //console.log(sortlist[i].u_id)
                     //console.log(namlist[j].u_name)
                     
                     if (sortlist[i].u_id === namlist[j].u_id)
                     {
                         title = namlist[j].u_name
                         
                     }    
                };
                if (idList.indexOf(sortlist[i].u_id) === -1) {
                        idList.push(sortlist[i].u_id)
                        this.list.push({
                            c_id: sortlist[i].c_id,
                            msg: sortlist[i].c_content,
                            title: title,
                            time: this.getNowFormatDate(sortlist[i].c_createtime),
                            read: sortlist[i].c_read,
                            p_id: sortlist[i].p_id,
                            u_accept_id : sortlist[i].u_id
                        })
                        //break
                    }
               
            };
          }

      ))
    //   this.$axios.get('/chats/queryChatformsg',{params: {u_id: store.fetchId() }}).then((res) => {
    //         //console.log(res.data)
    //         let cntAll = 0
    //         let cntread = 0
    //         let idList = new Array()
    //         this.list = new Array()
    //         let sortlist = this.sortByKey(res.data,'c_createtime')
    //         //console.log(sortlist)
    //         sortlist.forEach(element => {
    //            if (idList.indexOf(element.u_id) === -1) {
    //                idList.push(element.u_id)
    //                this.list.push({
    //                    c_id: element.c_id,
    //                    msg: element.c_content,
    //                    title: element.u_id,
    //                    time: element.c_createtime,
    //                    read: element.c_read
    //                })
    //            }
    //         });
    //         //console.log(this.list)
            
            
    //     })
    //     this.getName()
    //     this.changeId()
  },
  methods: {
    getNowFormatDate (time) {   
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    toChat (u_accept_id,p_id) {
        // console.log(u_id)
        // console.log(u_accept_id)
        // console.log(u_id)
        this.$router.push({
					name: 'Chat',
					query: {
                        u_id: store.fetchId(),
                        u_accept_id: u_accept_id,
                        p_id: p_id
					}
		})
    }, 
    sortByKey (array, key){
      return array.sort(function(a,b){
        let x = a[key]
        let y = b[key]
        return ((x>y)?-1:((x<y)?1:0))
      })
    },
    getName () {
        this.$axios.get('/api/getAllName').then((res) => {
            this.namelist = res.data
            this.list.forEach(element1 => {
            this.namelist.forEach(element2 => {
            if (element2.u_id == element1.title) 
            {
                acnamelist.push(element2.u_name)
            }
            
            });
        });
            //console.log(this.namelist)
        })
    },
    changeId () {
        
        
    }
  }
}
</script>

<style lang="less">
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
</style>