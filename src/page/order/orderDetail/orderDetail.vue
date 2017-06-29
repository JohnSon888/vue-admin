<template>
    <div class="order orderDetail">
        <div class="content-wrap">
            <el-row class="header-wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="订单详情" name="first">
                        <template>
                            <div class="orderDetail-box1">
                                <el-row type="flex" justify="space-between" class="title-wrap">
                                    <el-col>
                                        <label class="status">待收货确认</label>
                                        <label class="orderId">订单号：</label>
                                        <label class="customerName">客户名称：</label>
                                        <label class="buseness">业务员：</label>
                                    </el-col>
                                    <el-col style="text-align: right;margin-right: 20px;">
                                        <span>排序：</span>
                                        <el-radio class="radio" v-model="radio" label="1">按下单顺序</el-radio>
                                        <el-radio class="radio" v-model="radio" label="2">按商品编码</el-radio>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='123' show-summary>
                                        <el-table-column prop="orderNum" label="序号" width="80">
                                            <template scope="scope">
                                                <span class="orderId">1</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="createTime" label="主图" width="140">
                                        </el-table-column>
                                        <el-table-column prop="customerName" label="商品编码" width="140">
                                        </el-table-column>
                                        <el-table-column prop="actualMoney" label="商品名称" width="180">
                                        </el-table-column>
                                        <el-table-column prop="freight" label="规格" width="130">
                                        </el-table-column>
                                        <el-table-column prop="dispalyStatus" label="数量" width="130">
                                        </el-table-column>
                                        <el-table-column prop="payStatus" label="单位" width="130">
                                        </el-table-column>
                                        <el-table-column prop="remark" label="单价" width="130">
                                        </el-table-column>
                                        <el-table-column prop="billType" label="小计" width="130">
                                        </el-table-column>
                                        <el-table-column prop="deliveryDate" label="重量" width="180">
                                        </el-table-column>
                                        <el-table-column prop="contact" label="备注" width="240">
                                        </el-table-column>
                                    </el-table>
                                    <el-row type="flex" justify="end" style="padding:10px 20px;border:1px solid #dfe6ec;border-top:0;width: 100%;text-align: right;">
                                        <el-col>
                                            <p class="">运费：</p>
                                            <p class="">应付金额：</p>
                                        </el-col>
                                        <el-col>
                                            <p>0.00</p>
                                            <p class="status">2000.00</p>
                                        </el-col>
                                    </el-row>
                                </el-row>
                                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                                    <el-form-item label="收货信息" prop="title">
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="交货日期" prop="deliveryDate" width="50%">
                                                <el-date-picker type="date" placeholder="请选择日期" v-model="form.deliveryDate" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="发票信息" prop="billInfo">
                                                <el-input v-model="form.billInfo" placeholder="不开发票" disabled></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-form-item label="备注说明" prop="mark">
                                        <el-input type="textarea" :rows="1" placeholder="" v-model="textarea">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="附件信息" prop="upload">
                                        <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                                            <el-button slot="trigger" size="small" type="primary">添加附件</el-button>
                                            <div slot="tip" class="el-upload__tip">（附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP）</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="操作日志" prop="mark">
                                        
                                    </el-form-item>
                                </el-form>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="出库发货记录" name="second">
                        <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='123' show-summary>
                            <el-table-column prop="orderNum" label="序号" width="80">
                                <template scope="scope">
                                    <span class="orderId">1</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createTime" label="主图" width="140">
                            </el-table-column>
                            <el-table-column prop="customerName" label="商品编码" width="140">
                            </el-table-column>
                            <el-table-column prop="actualMoney" label="商品名称" width="160">
                            </el-table-column>
                            <el-table-column prop="freight" label="规格" width="120">
                            </el-table-column>
                            <el-table-column prop="dispalyStatus" label="数量" width="120">
                            </el-table-column>
                            <el-table-column prop="payStatus" label="单位" width="120">
                            </el-table-column>
                            <el-table-column prop="remark" label="单价" width="120">
                            </el-table-column>
                            <el-table-column prop="billType" label="小计" width="120">
                            </el-table-column>
                            <el-table-column prop="deliveryDate" label="重量" width="200">
                            </el-table-column>
                            <el-table-column prop="contact" label="备注" width="240">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="收款记录" name="third">
                        <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='123' show-summary>
                            <el-table-column prop="orderNum" label="序号" width="80">
                                <template scope="scope">
                                    <span class="orderId">1</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createTime" label="主图" width="140">
                            </el-table-column>
                            <el-table-column prop="customerName" label="商品编码" width="140">
                            </el-table-column>
                            <el-table-column prop="actualMoney" label="商品名称" width="160">
                            </el-table-column>
                            <el-table-column prop="freight" label="规格" width="120">
                            </el-table-column>
                            <el-table-column prop="dispalyStatus" label="数量" width="120">
                            </el-table-column>
                            <el-table-column prop="payStatus" label="单位" width="120">
                            </el-table-column>
                            <el-table-column prop="remark" label="单价" width="120">
                            </el-table-column>
                            <el-table-column prop="billType" label="小计" width="120">
                            </el-table-column>
                            <el-table-column prop="deliveryDate" label="重量" width="200">
                            </el-table-column>
                            <el-table-column prop="contact" label="备注" width="240">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
            return {
                activeName: 'first',
                radio: '1',
                form: {
                    title: '',
                    deliveryDate: '',
                    billInfo: '',
                    mark: '',
                    upload: ''
                },
                rules: {
                    deliveryDate: [{
                        type: 'date',
                        message: '请选择下单时间',
                        trigger: 'change'
                    }]
                },
                orderDatas: [{
                    "orderNum": "",
                    "createTime": "",
                    "expireTime": "",
                    "productTypeCount": '',
                    "freight": '',
                    "weight": '',
                    "customerName": "",
                    "contact": "",
                    "outStorageStatusName": "",
                    "deliverStatusName": "",
                    "displayStatus": "",
                    "actualMoney": ""
                }]
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
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
    padding-top: 10px;
    margin-bottom: 20px;
}

.header-wrap p {
    height: 36px;
    line-height: 36px;
}

.title-wrap {
    padding: 5px 20px 15px;
}

.title-wrap label {
    margin-right: 20px;
}

.status {
    color: #f96b6b;
    font-size: 20px;
}
</style>
