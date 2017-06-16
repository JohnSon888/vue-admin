<template>
    <div class="breadcrumb-wrap">
        <el-row type="flex" justify="space-between">
            <el-col :span="4">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>订单</el-breadcrumb-item>
                    <el-breadcrumb-item>订货号</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="4" class="right-crumb">
                <el-button type="text">帮助</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<script>
 export default {
	data() {
	    return {
	    }  
    }
    
 }
</script>
<style type="text/css" scoped>
.breadcrumb-wrap{
	height: 30px;
	line-height: 30px;
}
.el-row{
	height: 100%;
}
.el-breadcrumb{
    line-height: 20px;
}
.right-crumb{
	text-align: right;
	padding:0 10px;
}
</style>

