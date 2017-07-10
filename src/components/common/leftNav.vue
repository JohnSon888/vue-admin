<template>
    <div class="left-menu-wrap">
        <el-menu default-active="activeIndex" class="el-menu-vertical-demo"  @select="handleSelect">
        <router-link v-for="(item,index) in dataList" :to="item.path" :key="item.path">
            <el-menu-item @mouseenter.native="mouseen(index)" @mouseleave.native='mouseou(index)'  :index="comp(index+1)" ><i :class="item.icon"></i>{{item.value}}
            <showBox :index="index" :flag="flagList[index]"></showBox>
            </el-menu-item>
        </router-link>
            <template>
                <div class="app-center">
                    <el-menu default-active="" class="el-menu-vertical-demo">
                        <el-menu-item index="7"><i class="el-icon-message"></i>应用中心</el-menu-item>
                    </el-menu>
                </div>
            </template>
            <template>
                <router-link to="/" class="slide-logo">
                    <div><i class="icon iconfont">易订货</i></div>
                </router-link>
            </template>
        </el-menu>
    </div>
</template>
<script>
import showBox from '../navListHover/showbox'
export default {
    data(){
        return {
            dataList:[
               {
                path:'/page/order',
                icon:'el-icon-message',
                value:'订单'
               },
               {
                path:'/page/goods',
                icon:'el-icon-menu',
                value:'商品'
               },
               {
                path:'/page/client',
                icon:'el-icon-setting',
                value:'客户'
               },
               {
                path:'/page/money',
                icon:'el-icon-setting',
                value:'资金'
               },
               {
                path:'/page/marketing',
                icon:'el-icon-setting',
                value:'营销'
               },
               {
                path:'/page/statement',
                icon:'el-icon-setting',
                value:'报表'
               }
            ],
            flagList:{}
        }
    },
    activeIndex:'1',
    props: ['choosed'],
    components:{
        showBox
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(this.$route.path);
        },
        mouseen(arg){
            // vue不建议这种直接改变子组件属性的操作，下次注意修改
            // this.$refs['page'+arg][0]._props.flag = true
            this.$set(this.flagList,arg,true)
        },
        mouseou(arg){
            this.flagList[arg] = 0
        },
        comp:function(e){
            return e.toString();
        }


    },
    computed:{
    }
}
</script>
<style type="text/css" scoped>
.showhover {
        display:none;
    }
.left-menu-wrap{
	background: #fff;
	height: 100%;
    padding: 10px 0;
}
.el-menu {
    background: #fff;
    position: relative;
    height: 100%;
}

.el-menu-item {
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
}

.app-center {
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

.slide-logo .icon {
    font-size: 20px;
    color: #03b8cc;
}
.el-menu-item:hover{
  color: #fff;
  background-color: #03b8cc;
}
.el-menu-item.is-active{
  color: #fff;
  background-color: #03b8cc;
}
</style>
