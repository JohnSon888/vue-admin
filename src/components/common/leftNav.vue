<template>
<div class="left-nav">
	<el-row class="tac">
	  <el-col>
	    <el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
	      <router-link to="../../page/order"><el-menu-item index="1"><i class="el-icon-message"></i>订单</el-menu-item></router-link> 
	      <router-link to="../../page/goods"><el-menu-item index="2"><i class="el-icon-menu"></i>商品</el-menu-item></router-link> 
	      <router-link to="../../page/client"><el-menu-item index="3"><i class="el-icon-setting"></i>客户</el-menu-item></router-link> 
	      <router-link to="../../page/money"><el-menu-item index="4"><i class="el-icon-setting"></i>资金</el-menu-item></router-link> 
	      <router-link to="../../page/marketing"><el-menu-item index="5"><i class="el-icon-setting"></i>营销</el-menu-item></router-link> 
	      <router-link to="../../page/statement"><el-menu-item index="6"><i class="el-icon-setting"></i>报表</el-menu-item></router-link> 
	    </el-menu>
	  </el-col>
	</el-row>
	<el-row class="app-center">
	  <el-col>
	    <el-menu default-active="" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
	      <el-menu-item index="1"><i class="el-icon-message"></i>应用中心</el-menu-item>
	    </el-menu>
	  </el-col>
	</el-row>
	<router-link to="/"><div class="slide-logo"><i class="icon iconfont">易订货</i></div></router-link>
	<router-view></router-view>
</div>

</template>
<script>
  export default {
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