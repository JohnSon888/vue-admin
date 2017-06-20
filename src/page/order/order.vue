<template>
    <div class="order">
        <div class="content-wrap">
            <el-row class="header-wrap">
                <el-col :span="2" class="order-menu">
                    <el-dropdown trigger="click" menu-align="start" @command="handleCommand">
                        <span class="el-dropdown-link">
                            全部订单<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0">全部订单</el-dropdown-item>
                            <el-dropdown-item command="-3">待处理订单</el-dropdown-item>
                            <el-dropdown-item command="-2">未完成订单</el-dropdown-item>
                            <el-dropdown-item command="6">已完成订单</el-dropdown-item>
                            <el-dropdown-item command="-1">已作废订单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请选择日期" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="text" @click="advanceFormVisible">高级搜索</el-button>
                </el-col>
                <el-col :span="5" :offset="7">
                    <el-button :plain="true" type="success">导入</el-button>
                    <el-button :plain="true" type="warning">新增</el-button>
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
                            <p v-if="scope.row.deliverStatusName == '已发货'"  class="deliverStatus">物流信息</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dispalyStatus" label="状态" width="120" sortable>
                        <template scope="scope">
                            <span v-bind:class="[scope.row.dispalyStatus == '已完成' ? '' : 'dispalyActive']">{{scope.row.dispalyStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentStatus" label="付款状态" width="120" row-class-name="ssss">
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
            <el-form ref="form" :model="form" label-width="80px">
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="订货单号">
                        <el-input v-model="form.name" placeholder="请输入订货单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="下单时间">
                            <el-date-picker type="datetimerange" placeholder="选择时间范围" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="客户名称">
                            <el-input v-model="form.name" placeholder="请输入客户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户级别">
                            <el-select v-model="form.region" placeholder="全部">
                                <el-option label="张三" value="张三"></el-option>
                                <el-option label="李四" value="李四"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="收货信息">
                        <el-input v-model="form.name" placeholder="收货人/收货电话/客户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="归属部门">
                            <el-select v-model="form.region" placeholder="全部">
                                <el-option label="张三" value="张三"></el-option>
                                <el-option label="李四" value="李四"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="商品信息">
                        <el-input v-model="form.name" placeholder="输入商品名称/编码/条形码/关键字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="订单状态">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="全选" name="type"></el-checkbox>
                        <el-checkbox label="待订单审核" name="type"></el-checkbox>
                        <el-checkbox label="待财务审核" name="type"></el-checkbox>
                        <el-checkbox label="待出库审核" name="type"></el-checkbox>
                        <el-checkbox label="待发货确认" name="type"></el-checkbox>
                        <el-checkbox label="待收货确认" name="type"></el-checkbox>
                        <el-checkbox label="已完成" name="type"></el-checkbox>
                        <el-checkbox label="已作废" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="付款状态">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="全选" name="type"></el-checkbox>
                        <el-checkbox label="未付款" name="type"></el-checkbox>
                        <el-checkbox label="待付款审核" name="type"></el-checkbox>
                        <el-checkbox label="部分付款" name="type"></el-checkbox>
                        <el-checkbox label="已付款" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="订单标签">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="不限"></el-radio>
                        <el-radio label="特价单"></el-radio>
                        <el-radio label="非特价单"></el-radio>
                        <el-radio label="秒杀订单"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <template>
                    <el-row class="btn-options">
                        <el-col>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                            <el-button>取消</el-button>
                            <el-button type="text">清空</el-button>
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
            dialogTableVisible:false,
            currentPage: 1,
            pageSize:0,
            totalCount:0,
            invoiceType:'',
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            orderDatas: []
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
            this.currentPage = val;
            // this.offset = (val - 1)*this.limit;
            // this.getResturants()
        },
        handleCommand(command) {
            console.log(this);
            this.$message('click on item ' + command);
        },
        onSubmit() {
            console.log('submit!');
        },
        advanceFormVisible() {
            this.dialogTableVisible = true;
        }

    },
    created(){
        axios.get('/static/jsonList/orderList.json').then(response=>{
           const responseData = response.data.data;
           // 列表数据渲染
           this.orderDatas=responseData.items;
           this.orderDatas.forEach(item => {
                if(item.invoiceType == '2'){
                    item.invoiceType = "增值税发票";
                }else{
                    item.invoiceType = "";
                }
            })
           // 分页数据渲染
           this.currentPage = responseData.currentPage;
           this.pageSize = responseData.pageSize;
           this.totalCount = responseData.totalCount;
           
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        })
        // axios.get('http://corp.dinghuo123.com/v2/order/list?currentPage=1&pageSize=30')
        // .then(response=>{
        //    console.log(response);
        //    this.orderDatas=response.data.items;
        // })
        // .catch(error=>{
        //     console.log(error);
        //     alert('网络错误，不能访问');
        // })
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
.el-dropdown-menu{
    margin:0;
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
.dispalyActive{
    color: rgb(249, 107, 107);
}
/* 高级搜索弹框*/
.advanceForm-dialog{
}
.advanceForm-dialog .el-select{
    width: 100%;
}
.advanceForm-dialog .btn-options{
    margin-left: 10px;
}
.advanceForm-dialog .title label{
    font-size: 20px;
}
</style>
