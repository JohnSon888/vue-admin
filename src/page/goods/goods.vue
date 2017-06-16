<template>
    <div class="goods-wrap">
        <div class="content-wrap">
            <el-row class="header-wrap">
                <el-col :span="2" class="order-menu">
                    <el-dropdown trigger="click">
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
                    <el-dropdown trigger="click">
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
                    <el-button :plain="true" type="warning">新增</el-button>
                </el-col>
            </el-row>
            <el-row class="tbody-wrap">
                <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='400'>
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="orderId" label="订单号" width="200">
                    </el-table-column>
                    <el-table-column prop="orderTime" label="下单时间" width="150" sortable>
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名称" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="money" label="金额" width="120">
                    </el-table-column>
                    <el-table-column prop="deliveroods" label="出库/发货" width="120">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width="120" sortable>
                    </el-table-column>
                    <el-table-column prop="paymentStatus" label="付款状态" width="120" row-class-name="ssss">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" width="120">
                    </el-table-column>
                    <el-table-column prop="billType" label="发票类型" width="120">
                    </el-table-column>
                    <el-table-column prop="deliveryDate" label="交货日期" width="150">
                    </el-table-column>
                    <el-table-column prop="consignee" label="收货人" width="120">
                    </el-table-column>
                    <el-table-column prop="contact" label="联系方式" width="130">
                    </el-table-column>
                    <el-table-column prop="address" label="收货地址" width="240">
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="50" fixed="right">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row class="pagination-wrap">
                <el-col :span="8" :push="16">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100,200,300,400]"
                      :page-size="30"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="7">
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
                currentPage4: 4,
                orderDatas: [{
                    orderId: 'DH-O-20170614-129361',
                    orderTime: '2017-06-14 23:06',
                    customerName: 'rrewrew',
                    money: '3321.00',
                    deliveroods: '备货中/待发货',
                    status: '待出库审核',
                    paymentStatus: '未付款',
                    remark: '是一个测试',
                    billType: '增值税发票',
                    deliveryDate: '2017-06-18 00:00',
                    consignee: 'rdewrew',
                    contact: '13355555555',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    orderId: 'DH-O-20170614-129361',
                    orderTime: '2017-02-14 23:06',
                    customerName: 'rrewrew',
                    money: '332.00',
                    deliveroods: '备货中/待发货',
                    status: '待出库审核',
                    paymentStatus: '未付款',
                    remark: '是一个测试',
                    billType: '增值税发票',
                    deliveryDate: '2017-06-18 00:00',
                    consignee: 'rdewrew',
                    contact: '13355555555',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    orderId: 'DH-O-20170614-129361',
                    orderTime: '2017-03-14 23:06',
                    customerName: 'rrewrew',
                    money: '31.00',
                    deliveroods: '备货中/待发货',
                    status: '待出库审核',
                    paymentStatus: '未付款',
                    remark: '是一个测试',
                    billType: '增值税发票',
                    deliveryDate: '2017-06-18 00:00',
                    consignee: 'rdewrew',
                    contact: '13355555555',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    orderId: 'DH-O-20170614-129361',
                    orderTime: '2017-04-14 23:06',
                    customerName: 'rrewrew',
                    money: '3313.00',
                    deliveroods: '备货中/待发货',
                    status: '待出库审核',
                    paymentStatus: '未付款',
                    remark: '是一个测试',
                    billType: '增值税发票',
                    deliveryDate: '2017-06-18 00:00',
                    consignee: 'rdewrew',
                    contact: '13355555555',
                    address: '上海市普陀区金沙江路 1518 弄'
                }]
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
        }
      //   ,
      //   created(){
      //     axios.get('http://corp.dinghuo123.com/v2/order/list?currentPage=1&pageSize=30')
      //     .then(response=>{
      //        console.log(response);
      //        this.orderDatas=response.data.items;
      //     })
      //     .catch(error=>{
      //         console.log(error);
      //         alert('网络错误，不能访问');
      //     })
      // }
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

.el-button {
    min-width: 86px;
    border-radius: 20px;
}

.el-button--text {
    color: #93a6b7;
}
.pagination-wrap{
    text-align: right;
    padding-top:10px;
}
</style>
