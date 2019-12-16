<template>
	<div class="push">
		<keep-alive>
		<tab :line-width="2" custom-bar-width="60px" >
	      <tab-item :selected="isAct === 'MustFind'" @on-item-click="onTab('MustFind')">按发布时间</tab-item>
	      <tab-item :selected="isAct === 'FindByPeople'" @on-item-click="onTab('FindByPeople')">按人气</tab-item>
	      <!-- <tab-item :selected="isAct === 'FindByComment'" @on-item-click="onTab('FindByComment')">按评论数</tab-item> -->
	    </tab>
		</keep-alive>
		<view-box ref="viewBox">
			<router-view></router-view>
		</view-box>
	</div>
</template>

<script>
	import { Tab, TabItem, ViewBox } from 'vux'
// import func from './vue-temp/vue-editor-bridge';
// import { isatty } from 'tty';
	export default {
		name: 'push',
		data() {
			return {
				isAct:'MustFind'
			}
		},
		created () {
			if (this.$route.query.act !== 'undefined') {
				let act = this.$route.query.act
				if (act === 'MustFind') this.isAct = 'MustFind'
				if (act === 'FindByPeople') this.isAct = 'FindByPeople'
				if (act === 'FindByComment') this.isAct = 'FindByComment'
			}
		},
		watch :{
			'$route': function (to, from) {
				if (to.query.act !== 'undefined') {
					let act =to.query.act
					if (act === 'MustFind') this.isAct = 'MustFind'
					if (act === 'FindByPeople') this.isAct = 'FindByPeople'
					if (act === 'FindByComment') this.isAct = 'FindByComment'
				}
			}
		},
		mounted () {
			// this.nextTick(() => {
			// 	if (this.$router.name === 'MustFind') this.selected = 0
			// 	else if (this.$router.name === 'FindBypeople') this.selected = 1
			// 	else if (this.$router.name === 'FindByComment') this.selected = 2
			// })
		},
		components: {
			Tab,
			TabItem,
			ViewBox
		},
		methods: {
			onTab (isAct) {
				this.$router.push({
					name: isAct,
					query: {
						act: isAct
					}
				})
			}
			// toMustPush(){
			// 	this.selected = 0
			// 	this.$router.push({
			// 		path:'/Find/MustFind'
			// 	})
			// },
			// FindByPeople(){
			// 	this.selected = 1
			// 	this.$router.push({
			// 		path:'/Find/FindBypeople'
			// 	})
			// },
			// FindByComment(){
			// 	this.selected = 2
			// 	this.$router.push({
			// 		path:'/Find/FindByComment'
			// 	})
			// },
		}
	}
</script>

<style scoped lang="less">
	
</style>