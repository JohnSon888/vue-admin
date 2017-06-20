<template>
    <div class="goods-wrap">
        <div class="content-wrap">
            <el-row class="header-wrap">
                <el-col :span="2" class="order-menu">
                    <el-dropdown trigger="click" menu-align="start">
                        <span class="el-dropdown-link">
                            全部分类<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>全部分类</el-dropdown-item>
                            <el-dropdown-item>数码相机</el-dropdown-item>
                            <el-dropdown-item>智能手机</el-dropdown-item>
                            <el-dropdown-item>数码配件</el-dropdown-item>
                            <el-dropdown-item>通用</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="2" class="order-menu">
                    <el-dropdown trigger="click" menu-align="start">
                        <span class="el-dropdown-link">
                            全部状态<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>全部状态</el-dropdown-item>
                            <el-dropdown-item>上架</el-dropdown-item>
                            <el-dropdown-item>下架</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入商品名称/编码/规格/关键字/条形码" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="text">高级搜索</el-button>
                </el-col>
                <el-col :span="6" :offset="4">
                    <el-button :plain="true" type="success">导出</el-button>
                    <el-button :plain="true" type="success">导入</el-button>
                    <el-button class="add">新增</el-button>
                </el-col>
            </el-row>
            <el-row class="tbody-wrap">
                <el-table ref="multipleTable" :data="tableDatas" border tooltip-effect="dark" style="width:100%" height='400'>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="imgSrc" label="商品图片" width="100">
                        <template scope="scope">
                            <img :src="scope.row.mainImg.imgUrl_60">
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="商品编码" width="160" sortable>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" width="280" sortable>
                    </el-table-column>
                    <el-table-column prop="spec" label="商品规格" width="240">
                    </el-table-column>
                    <el-table-column prop="productUnitName" label="单位" width="80">
                    </el-table-column>
                    <el-table-column prop="marketPrice" label="市场价" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="costPrice" label="参考成本价" width="120">
                    </el-table-column>
                    <el-table-column prop="productBrandName" label="品牌" width="120">
                    </el-table-column>
                    <el-table-column prop="inventoryCount" label="库存数量" width="120">
                    </el-table-column>
                    <el-table-column prop="prepareCount" label="预购" width="150">
                    </el-table-column>
                    <el-table-column prop="prepareCount" label="库存成本" width="120">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="130">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="50" fixed="right">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row class="pagination-wrap">
                <el-col :span="8" :push="16">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
            return {
                input2: '',
                currentPage: 0,
                pageSize:0,
                totalCount:0,
                tableDatas: []
            }
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        created() {
            axios.get('/static/jsonList/goodsList.json').then(response => {
                    const responseData = response.data.data;
                    // 列表数据渲染
                    this.tableDatas = responseData.items;
                    this.tableDatas.forEach(item => {
                            if (item.status == '0') {
                                item.status = "上架";
                            } else {
                                item.status = "下架";
                            }
                        })
                        // 分页数据渲染
                    this.currentPage = responseData.currentPage;
                    this.pageSize = responseData.pageSize;
                    this.totalCount = responseData.totalCount;

                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        }
}
</script>
<style type="text/css" scoped>
.goods-wrap {
    position: relative;
    background: #fff;
    height: 100%;
    padding: 0 20px;
}

.header-wrap {
    background: #fff;
    height: 50px;
    line-height: 50px;
}

.order-menu {
    position: relative;
}

.el-dropdown {
    /*height: 150px;*/
}

.el-dropdown-menu {
    margin: 0;
}

.el-button {
    min-width: 86px;
    border-radius: 20px;
}

.el-button--text {
    color: #93a6b7;
}
.add{
    color: #fff;
    background: #13c19f;
}
.pagination-wrap {
    text-align: right;
    padding-top: 10px;
}

img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
</style>
