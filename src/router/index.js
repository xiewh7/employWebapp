import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Home from '@/components/Home'
import MustFind from '@/components/Find/MustFind'
import Find from '@/components/Find/Find'
import My from '@/components/My'
import Post from '@/components/Post'
import FindByPeople from '@/components/Find/FindByPeople'
import FindByComment from '@/components/Find/FindByComment'
// const about = resolve => require(['@/components/about'], resolve)
const Login = resolve => require(['@/components/Login'], resolve)
//const About = resolve => require(['@/components/About'], resolve)
import Tab from '@/components/Tab'
import Tiezi from '@/components/Tiezi/Tiezi'
import Register from '@/components/Register'
import Chat from '@/components/Chat/Chat'
import Mymsg from '@/components/MyPart/Mymsg'
import MyResume from '@/components/MyPart/MyResume'
import Pipei from '@/components/Pipei/Pipei'
import Chart from '@/components/Chart/chart'
import MyEmploy from '@/components/MyPart/MyEmploy'
import EmployChart from '@/components/Chart/EmployChart'
import EmployOther from '@/components/MyPart/EmployOther'
import UpdateChart from '@/components/Chart/UpdateChart'
import Myfile from '@/components/MyPart/Myfile'
import changePassword from '@/components/MyPart/changePassword'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  	{
  		path:'/',
      	name:'About',
      	component:About

  	},{
  		path:'/Register',
      	name:'Register',
      	component:Register
  	},
  	{
  		path:'/Tab',
  		name:'Tab',
  		component:Tab,
  		redirect:'/Home',
  		children:[{
  			path:'/Home',
  			name:'Home',
  			component:Home
  		},{
  			path:'/Find',
  			name:'Find',
  			component:Find,
  			children:[{
		  		path:'/Find/MustFind',
		  		name:'MustFind',
		  		component:MustFind	
  			},{
		  		path:'/Find/FindByPeople',
		  		name:'FindByPeople',
		  		component:FindByPeople	
  			},{
		  		path:'/Find/FindByComment',
		  		name:'FindByComment',
		  		component:FindByComment	
  			}]
  		},{
        path:'/My',
        name:'My',
        component:My
      },{
        path:'/Post',
        name:'Post',
        component:Post
      },{
				path:'/Pipei',
				name:'Pipei',
				component:Pipei
			}]
  	},{
			path:'/Tiezi/Tiezi/:p_id/:u_id/:u_name/:p_title/:p_createtime/:p_pay/:p_job/:p_position/:p_desc/:p_count',
			name:'Tiezi',
			component:Tiezi
		},{
			path:'/Chat',
			name:'Chat',
			component:Chat
		},{
			path:'/Mymsg',
			name:'Mymsg',
			component:Mymsg
		},{
			path:'/MyResume',
			name:'MyResume',
			component:MyResume
		},{
			path:'/MyChart',
			name:'MyChart',
			component:Chart
		},{
			path:'/MyEmploy',
			name:'MyEmploy',
			component:MyEmploy
		},{
			path:'/EmployChart',
			name:'EmployChart',
			component:EmployChart
		},{
			path:'/EmployOther',
			name:'EmployOther',
			component:EmployOther
		},{
			path:'/UpdateChart',
			name:'UpdateChart',
			component:UpdateChart
		},{
			path:'/Myfile',
			name:'Myfile',
			component:Myfile
		},{
			path:'/changePassword',
			name:'changePassword',
			component:changePassword
		}
		
  	
    // {
    //   path: '/',
    //   name: 'Tab',
    //   component: Tab,
    //   redirect:'/About',
    //   children:[{
    //   	path:'/About',
    //   	name:'About',
    //   	component:About

    //   }]
    // }
  ]
})
