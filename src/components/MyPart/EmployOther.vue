<template>
  <div>
    <x-header >收到的招聘</x-header>
    <div style="margin: 10px;overflow: hidden; font-size:1.5rem" v-for="item in list" :key="item.e_id" @click="toChart(item.u_id,item.e_recent)">
      <masker style="border-radius: 5px;"  color="#1AAD19" :opacity="0.8">
        <div class="m-img"></div>
        <div slot="content" class="m-title">
          {{item.title}}
          <br/>
          <span class="m-time">处于招聘第{{item.e_recent+1}}步</span>
          <br/>
          <!-- <span class="m-time">{{item.time}}</span> -->
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
            e_id:1,
            title: '???',
        }]
    }
  },
  mounted () {
      this.$axios.all([
          this.$axios.get('/employ/queryEmploy',{params: {u_accept_id: store.fetchId() }}),
          this.$axios.get('/api/getAllName')]).then(this.$axios.spread( (resemploy,resname) => {
            console.log(resemploy)
            let cntAll = 0
            let cntread = 0
            let idkeylist = new Array()
            let idList = new Array()
            this.list = new Array()
            let sortlist = resemploy.data
            let namlist = resname.data
            let title = ''
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
                            e_id: sortlist[i].e_id,
                            e_recent:sortlist[i].e_recent,
                            title: title,
                            u_id : sortlist[i].u_id
                        })
                        //break
                    }
               
            };
          }

      ))
  },
  methods: {
    getNowFormatDate (time) {   
      return new Date(parseInt(time) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
    },
    toChart (u_id,e_recent) {
        // console.log(u_id)
        // console.log(u_accept_id)
        // console.log(u_id)
        this.$router.push({
					name: 'UpdateChart',
					query: {
                        u_id: u_id,
                        e_recent:e_recent
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