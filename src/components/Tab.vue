<template>
	<div class="tab" style="height:100%;">
		<view-box ref="viewBox">
			<router-view></router-view>
		</view-box>
		<tabbar slot="bottom" style="position: fixed;">
			<tabbar-item :selected="selected == 'Home'" link="/Home">
				<img slot="icon" src="../assets/主页.png">
				<img slot="icon-active" src="../assets/主页.png">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item :selected="selected == 'Post'" link="/Post">
				<img slot="icon" src="../assets/发布土地.png">
				<img slot="icon-active" src="../assets/发布土地.png">
				<span slot="label">发帖</span>
			</tabbar-item>
			<tabbar-item :selected="selected == 'Find'" link="/Find/MustFind">
				<img class="plus-icon" slot="icon" src="../assets/握手.png">
				<span slot="label">发现</span>
			</tabbar-item>
			<tabbar-item :selected="selected == 'Pipei'" link="/Pipei">
				<img slot="icon" src="../assets/地域特色.png">
				<img slot="icon-active" src="../assets/地域特色.png">
				<span slot="label">优配</span>
			</tabbar-item>
			<tabbar-item :selected="selected == 'My'" link="/My">
				<img slot="icon" src="../assets/个人.png">
				<img slot="icon-active" src="../assets/个人.png">
				<span slot="label">我的</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
	import { ViewBox, Tabbar, TabbarItem } from 'vux'
	export default {
		name: 'tab',
		data() {
			return {
				selected: 'Home', //选项卡选中状态
			}
		},
		mounted() {
			let to = this.$route.name;
			//console.log(to)
			if(to == 'Home') {
				this.selected = 'Home';
			} else if(to == 'Post') {
				this.selected = 'Post';
			} else if(to == 'Find') {
				this.selected = 'Find';
			} else if(to == 'MustFind') {
				this.selected = 'Find';
			} else if(to == 'FindByPeople') {
				this.selected = 'Find';
			} else if(to == 'FindByComment') {
				this.selected = 'Find';
			} else if(to == 'PiPei') {
				this.selected = 'PiPei';
			} else if(to == 'My') {
				this.selected = 'My';
			}
		},
		watch: {
			
		},
		components: {
			ViewBox,
			Tabbar,
			TabbarItem
		}
	}
</script>

<style scoped>
	html,
	body {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
	}
	
	.weui-tabbar {
		background-color: #FFFFFF;
	}
	
	.plus-icon {
		position: absolute;
		top: -24px;
		left: -50%;
		width: 200%;
		height: 200%;
	}
</style>