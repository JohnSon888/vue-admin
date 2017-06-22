<template>
    <div class="order">
        <div class="content-wrap">
            <el-row class="header-wrap" v-show="search">
                <el-col :span="3" class="order-menu">
                    <el-dropdown trigger="click" menu-align="start" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{dropdownText}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部订单">全部订单11111</el-dropdown-item>
                            <el-dropdown-item command="待处理订单">待处理订单</el-dropdown-item>
                            <el-dropdown-item command="未完成订单">未完成订单</el-dropdown-item>
                            <el-dropdown-item command="已完成订单">已完成订单</el-dropdown-item>
                            <el-dropdown-item command="已作废订单">已作废订单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入订单号/客户名称" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="text" @click="advanceFormVisible">高级搜索</el-button>
                </el-col>
                <el-col :span="5" :offset="6">
                    <el-button :plain="true" type="success">导入</el-button>
                    <!-- <router-link to="../../page/order/orderAdd"><el-button :plain="true" type="success">新增</el-button></router-link> -->
                </el-col>
            </el-row>
            <el-row class="header-wrap" v-show="searchResult">
                <el-col :span="8">
                    <el-button type="text" @click="handleSearchResult">搜索结果</el-button>
                    <el-button type="text" @click="handleSearchClear">清除搜索</el-button>
                    <el-button type="text" @click="handleSearchContinue">继续搜索</el-button>
                </el-col>
            </el-row>
            <el-row class="tbody-wrap">
                <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='400'>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="orderNum" label="订单号" width="240">
                        <template scope="scope">
                            <span class="orderId">{{scope.row.orderNum}}</span>
                            <el-tag close-transition class="spec-tag" v-if="scope.row.isDiscountOrder == '1'">特价</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间" width="180" sortable>
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名称" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="actualMoney" label="金额" width="100">
                    </el-table-column>
                    <el-table-column prop="" label="出库/发货" width="150">
                        <template scope="scope">
                            <span>{{scope.row.outStorageStatusName}}/{{scope.row.deliverStatusName}}</span>
                            <p v-if="scope.row.deliverStatusName == '已发货'" class="deliverStatus">物流信息</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispalyStatus" label="状态" width="120" sortable>
                        <template scope="scope">
                            <span v-bind:class="[scope.row.dispalyStatus == '已完成' ? '' : 'dispalyActive']">{{scope.row.dispalyStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payStatus" label="付款状态" width="120">
                        <template scope="scope">
                            <span>{{scope.row.payStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="120">
                    </el-table-column>
                    <el-table-column prop="billType" label="发票类型" width="120">
                        <template scope="scope">
                            <span>{{scope.row.invoiceType}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deliveryDate" label="交货日期" width="180">
                    </el-table-column>
                    <el-table-column prop="contact" label="收货人" width="120">
                    </el-table-column>
                    <el-table-column prop="mobile" label="联系方式" width="130">
                    </el-table-column>
                    <el-table-column prop="fulladdress" label="收货地址" width="240">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="50" fixed="right">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row class="pagination-wrap">
                <el-col :span="8" :push="16">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="高级搜索" :visible.sync="dialogTableVisible" size="big" class="advanceForm-dialog">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="订货单号" prop="orderId">
                            <el-input v-model="form.orderId" placeholder="请输入订货单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="下单时间" prop="orderDate">
                            <!-- <el-date-picker type="datetimerange" placeholder="选择时间范围" v-model="form.orderDate" style="width: 100%;"></el-date-picker> -->
                            <el-date-picker type="date" placeholder="选择时间范围" v-model="form.orderDate" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="customerName">
                            <el-input v-model="form.customerName" placeholder="请输入客户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户级别" prop="customerLevel">
                            <el-select v-model="form.customerLevel" placeholder="全部">
                                <el-option label="张三" value="张三"></el-option>
                                <el-option label="李四" value="李四"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="收货信息" prop="deliveryInfo">
                            <el-input v-model="form.deliveryInfo" placeholder="收货人/收货电话/客户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="归属部门" prop="affiliationSection">
                            <el-select v-model="form.affiliationSection" placeholder="全部">
                                <el-option label="张三" value="张三"></el-option>
                                <el-option label="李四" value="李四"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="商品信息" prop="goodsInfo">
                            <el-input v-model="form.goodsInfo" placeholder="输入商品名称/编码/条形码/关键字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="订单状态" prop="checkedCities">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange"  style="display:inline-block;margin-left: 10px;">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="付款状态" prop="payStatus">
                    <el-checkbox-group v-model="form.payStatus">
                        <el-checkbox label="全选" name="type"></el-checkbox>
                        <el-checkbox label="未付款" name="type"></el-checkbox>
                        <el-checkbox label="待付款审核" name="type"></el-checkbox>
                        <el-checkbox label="部分付款" name="type"></el-checkbox>
                        <el-checkbox label="已付款" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="订单标签" prop="orderTags">
                    <el-radio-group v-model="form.orderTags">
                        <el-radio label="不限"></el-radio>
                        <el-radio label="特价单"></el-radio>
                        <el-radio label="非特价单"></el-radio>
                        <el-radio label="秒杀订单"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <template>
                    <el-row class="btn-options">
                        <el-col>
                            <el-button type="primary" @click="submitForm('form')">确定</el-button>
                            <el-button @click="cancelForm">取消</el-button>
                            <el-button type="text" @click="resetForm('form')">清空</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
            return {
                input2: '',
                dialogTableVisible: false,
                currentPage: 1,
                pageSize: 0,
                totalCount: 0,
                invoiceType: '',
                payStatus: '',
                dropdownText: '全部订单1111',
                url: '',
                checkAll: false,
                checkedCities: [],
                cities: ['待订单审核', '待财务审核', '待出库审核','待发货确认','待收货确认','已完成','已作废'],
                isIndeterminate: false,
                search:true,
                searchResult: false,
                form: {
                    orderId: '',
                    orderDate: '',
                    customerName: '',
                    customerLevel: '',
                    deliveryInfo: '',
                    affiliationSection: '',
                    goodsInfo: '',
                    checkedCities:[],
                    payStatus: [],
                    orderTags: ''
                },
                rules: {
                    orderId: [{
                        required: true,
                        message: '请输入订货单号',
                        trigger: 'blur'
                    }],
                    orderDate: [{
                        type: 'date',
                        message: '请选择下单时间',
                        trigger: 'change'
                    }],
                    customerName: [{
                        required: true,
                        message: '请输入客户名称',
                        trigger: 'blur'
                    }],
                    customerLevel: [{
                        required: true,
                        message: '请选择客户级别',
                        trigger: 'change'
                    }],
                    deliveryInfo: [{
                        required: true,
                        message: '请输入收货信息',
                        trigger: 'blur'
                    }],
                    affiliationSection: [{
                        required: true,
                        message: '请选择归属部门',
                        trigger: 'change'
                    }],
                    goodsInfo: [{
                        required: true,
                        message: '请输入商品信息',
                        trigger: 'blur'
                    }],
                    checkedCities: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个订单状态',
                        trigger: 'change'
                    }],
                    payStatus: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个付款状态',
                        trigger: 'change'
                    }],
                    orderTags: [{
                        required: true,
                        message: '请至少选择一个订单标签',
                        trigger: 'change'
                    }]
                },
                orderDatas: []
            }
        },
        methods: {
            formatter(row, column) {
                return row.address;
            },
            handleIconClick(ev) {
                this.getOrderList('/static/jsonList/searchOrderList.json');
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCheckAllChange(event) {
                this.checkedCities = event.target.checked ? this.cities : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                // this.offset = (val - 1)*this.limit;
                // this.getResturants()
            },
            handleSearchResult(){

            },
            handleSearchContinue(){
                this.search = true;
                this.searchResult = false;
                this.dialogTableVisible = true;
            },
            handleSearchClear(){
                this.search = true;
                this.searchResult = false;
                this.dialogTableVisible = false;
                this.getOrderList('/static/jsonList/orderList.json');
            },
            handleCommand(command) {
                this.dropdownText = command;

                if (command == '全部订单') {
                    this.url = '/static/jsonList/orderList.json';
                } else if (command == '待处理订单') {
                    this.url = '/static/jsonList/pendingOrderList.json';
                } else if (command == '未完成订单') {
                    this.url = '/static/jsonList/undoneOrderList.json';
                } else if (command == '已完成订单') {
                    this.url = '/static/jsonList/doneOrderList.json';
                } else if (command == '已作废订单') {
                    this.url = '/static/jsonList/voidedrderList.json';
                }
                this.getOrderList(this.url);
            },
            submitForm(formName) {
                // 表单验证
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogTableVisible = false;
                        this.search = false;
                        this.searchResult = true;
                        this.getOrderList('/static/jsonList/advanceOrderList.json');
                    } else {

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogTableVisible = false;
            },
            cancelForm() {
                this.dialogTableVisible = false;
                this.getOrderList('/static/jsonList/orderList.json');
            },
            advanceFormVisible() {
                this.dialogTableVisible = true;
            },
            getOrderList(url) {
                axios.get(url).then(response => {
                        const responseData = response.data.data;
                        // 列表数据渲染
                        this.orderDatas = responseData.items;
                        this.orderDatas.forEach(item => {
                                if (item.invoiceType == '2') {
                                    item.invoiceType = "增值税发票";
                                } else {
                                    item.invoiceType = "";
                                }

                                if (item.payStatus == '0') {
                                    item.payStatus = "未付款";
                                } else if (item.payStatus == '1') {
                                    item.payStatus = "已付款";
                                } else if (item.payStatus == '2') {
                                    item.payStatus = "部分付款";
                                } else if (item.payStatus == '3') {
                                    item.payStatus = "待付款审核";
                                }
                            })
                            // this.orderDatas.forEach(item => {

                        //  })
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

        },
        created() {
            this.getOrderList('/static/jsonList/orderList.json');
        }


}
</script>
<style type="text/css" scoped>
.order {
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

.pagination-wrap {
    text-align: right;
    padding-top: 10px;
}

.el-table__row.hover-row .orderId {
    color: #13c19f;
}

.el-table__row .deliverStatus:hover {
    color: #13c19f;
}

.el-tag {
    padding: 2px;
    margin-right: 2px;
    font-size: 12px;
    line-height: 1;
    font-family: simsun;
    color: #fff;
    display: inline;
    cursor: pointer;
    background-color: #f43b37;
    border-radius: 0;
    height: 20px;
}

.dispalyActive {
    color: rgb(249, 107, 107);
}


/* 高级搜索弹框*/

.advanceForm-dialog {}

.advanceForm-dialog .el-select {
    width: 100%;
}

.advanceForm-dialog .btn-options {
    margin-left: 10px;
}

.advanceForm-dialog .title label {
    font-size: 20px;
}
</style>
