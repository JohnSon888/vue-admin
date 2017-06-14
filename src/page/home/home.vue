<template>
	<div class="home">
		<div class="container">
			<topBar></topBar>
			<leftNav></leftNav>
		</div>
	</div>
</template>
<script>
  import TopBar from '@/components/common/topBar.vue'
  import LeftNav from '@/components/common/leftNav.vue'
  export default {
  	name:'home',
  	components:{
		TopBar,
		LeftNav
  	},
  	data(){
  		return{
  			app: 'vue-admin'
  		}
  	},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style type="text/css" scoped>
	.left-nav{
		height: calc(100% - 44px);
		min-height: 600px;
		position: relative;
		background: #fff;
		width: 12.5%;
		text-align: center;
	}
	.el-menu{
		background: #fff;
	}
	.el-menu-item{
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
	}
	.app-center{
		text-align: center;
		font-size: 16px;
	    height: 70px;
	    line-height: 70px;
        border-top: 1px solid #f5f5f5;
        padding-top: 30px;
	}
	.slide-logo {
	    position: absolute;
	    height: 70px;
	    width: 70px;
	    bottom: 20px;
	    left: 50%;
	    margin-left: -35px; 
	    overflow: hidden;
	}
	.slide-logo .icon{
	    font-size: 20px;
	    color: #03b8cc;
	}
</style>