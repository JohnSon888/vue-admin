<template>
	<div class="home-wrap" name="home">
		<div class="container">
			<topBar></topBar>
			<el-row class="content-wrap" :gutter="20">
				<el-col :span="3" class="left-nav">
					<leftNav></leftNav>
				</el-col>
				<el-col :span="21">
					<breadCrumb></breadCrumb>
					<router-view></router-view>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
  import TopBar from '@/components/common/topBar.vue'
  import LeftNav from '@/components/common/leftNav.vue'
  import BreadCrumb from '@/components/common/breadCrumb.vue'
  export default {
  	name:'home',
  	components:{
		TopBar,
		LeftNav,
		BreadCrumb
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
	.home-wrap{
		height: 100%;
	}
	.container{
		height: 100%;
	}
	.content-wrap{
		padding: 20px;
		padding-top: 10px;
		height: 100%;	
	}
	.left-nav{
		height: 100%;
		background: #fff;
	}
	.el-col{
		height: 100%;
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