<template>
    <nav class="header-warp clearfix">
        <div class="left-item show">
            <img src="https://res.dinghuo123.com/dist/ydhv2/img/logo126.ce877849c5367c489c9e471a510b977e.png" alt="qia" v-show="imgVisible">
            <i class="icon iconfont icon-liebiao" @click="toggleSideBar" :class="{'active':!sidebar.opened}"></i>
        </div>
        <div class="right-item right">
            <ul class="clearfix">
                <li class="left sub-item" @mouseenter="menuShow('geren')" @mouseleave="menuHide('geren')">
                    <i class="icon iconfont icon-geren"></i>
                    <ul class="dropdown-menu" v-show="gerenVisible">
                        <li class="dropdown-menu-item">账号助手</li>
                        <li class="dropdown-menu-item">账号信息</li>
                        <li class="dropdown-menu-item">服务购买</li>
                        <li class="dropdown-menu-item">退出</li>
                    </ul>
                </li>
                <li class="left sub-item" @mouseenter="menuShow('kefu')" @mouseleave="menuHide('kefu')">
                    <i class="icon iconfont icon-kefu"></i>
                    <ul class="dropdown-menu" v-show="kefuVisible">
                        <li class="dropdown-menu-item">评价小易</li>
                        <li class="dropdown-menu-item">在线客服</li>
                        <li class="dropdown-menu-item">400-23225235</li>
                    </ul>
                </li>
                <li class="left sub-item" @mouseenter="menuShow('shezhi')" @mouseleave="menuHide('shezhi')">
                    <i class="icon iconfont icon-shezhi"></i>
                    <el-menu class="el-menu-vertical-demo setting" @open="handleOpen" @close="handleClose" v-show="shezhiVisible">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>基础资料</template>
                            <router-link to="../../page/setting">
                                <el-menu-item index="1-1">公司信息</el-menu-item>
                            </router-link>
                            <el-menu-item index="1-2">部门与员工</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>辅助资料</template>
                            <el-menu-item index="1-1">商品分类</el-menu-item>
                            <el-menu-item index="1-2">商品品牌</el-menu-item>
                            <el-menu-item index="1-2">计量单位</el-menu-item>
                            <el-menu-item index="1-2">客户级别</el-menu-item>
                            <el-menu-item index="1-2">客户归属区域</el-menu-item>
                            <el-menu-item index="1-2">通知分类</el-menu-item>
                            <el-menu-item index="1-2">仓库</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                            <el-menu-item index="1-1">系统参数设置</el-menu-item>
                            <el-menu-item index="1-2">订单审核部门变更</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="4"><i class="el-icon-menu"></i>操作日志</el-menu-item>
                    </el-menu>
                </li>
                <li class="left sub-item">
                    <i class="icon iconfont icon-tixing"></i>
                    <el-badge :value="8" :max="99" class="badge-item">
                    </el-badge>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script type="text/javascript">
import {
    mapGetters
} from 'vuex';
export default {
    data() {
            return {
                gerenVisible: false,
                kefuVisible: false,
                shezhiVisible: false,
                imgVisible: true
            }
        },
        computed: {
            /*
                当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
                为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
             */
            ...mapGetters([
                'sidebar'
            ])
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            menuShow(param) {
                if (param == 'geren') {
                    this.gerenVisible = true;
                } else if (param == 'kefu') {
                    this.kefuVisible = true;
                } else {
                    this.shezhiVisible = true;
                }
            },
            menuHide(param) {
                if (param == 'geren') {
                    this.gerenVisible = false;
                } else if (param == 'kefu') {
                    this.kefuVisible = false;
                } else {
                    this.shezhiVisible = false;
                }
            },
            toggleSideBar() {
                this.imgVisible = !this.imgVisible;
                this.$store.dispatch('ToggleSideBar')
            },
        }

}
</script>
<style type="text/css" scoped>
.header-warp {
    width: 100%;
    background-color: #03b8cc;
}

.container {
    width: 1200px;
    margin: 0 auto;
}

.iconfont {
    font-size: 23px;
    color: #fff;
}

.icon-liebiao {
    font-size: 34px;
    line-height: 40px;
    width: 44px;
    height: 44px;
    display: inline-block;
    vertical-align: bottom;
    margin-left: 60px;
}

.left-item {
    float: left;
}

.right-item {
    width: 300px;
    height: 44px;
    line-height: 44px;
}

.right-item .sub-item {
    float: left;
    width: 25%;
    text-align: center;
    position: relative;
}

.right-item .sub-item:hover {
    background: #03a1b3;
}

.setting {
    position: absolute;
    z-index: 33;
    width: 155px;
    right: 0px;
    top: 48px;
}

.dropdown-menu {
    transform-origin: center top 0px;
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
    padding: 6px 0;
    z-index: 2004;
    position: absolute;
    top: 43px;
    left: 0;
    min-width: 100px;
    background: #fff;
}

.dropdown-menu-item {
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
}

.badge-item {
    position: absolute;
    left: 35px;
    top: -3px;
}

.icon-liebiao {
    transition: all 0.5s ease-in-out;
}

.icon-liebiao.active {
    /*transition: all 0.5s ease-in-out; */  
}
</style>
