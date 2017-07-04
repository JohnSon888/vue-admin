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
                                        <label class="status">{{responseData.dispalyStatus}}</label>
                                        <label class="orderId">订单号：{{responseData.orderNum}}</label>
                                        <label class="customerName">客户名称：{{responseData.customerName}}【{{responseData.customerTypeName}}】</label>
                                        <label class="buseness">业务员：</label>
                                    </el-col>
                                    <el-col style="text-align: right;margin-right: 20px;">
                                        <span>排序：</span>
                                        <el-radio class="radio" v-model="radio" label="1">按下单顺序</el-radio>
                                        <el-radio class="radio" v-model="radio" label="2">按商品编码</el-radio>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-table ref="multipleTable" :data="orderDatas" border tooltip-effect="dark" style="width:100%" height='400' show-summary>
                                        <el-table-column prop="productCode" label="序号" width="80">
                                            <template scope="scope">
                                                <span class="orderId"></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="productImageUrl" label="主图" width="120">
                                            <template scope="scope">
                                                <img :src="scope.row.productImageUrl" style="width:80px;height:80px;vertical-align: middle;">
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="productCode" label="商品编码" width="140">
                                        </el-table-column>
                                        <el-table-column prop="productName" label="商品名称" width="180">
                                        </el-table-column>
                                        <el-table-column prop="description" label="规格" width="130">
                                        </el-table-column>
                                        <el-table-column prop="mainCount" label="数量" width="130">
                                        </el-table-column>
                                        <el-table-column prop="mainUnitName" label="单位" width="130">
                                        </el-table-column>
                                        <el-table-column prop="mainUnitName" label="商品参数" width="130">
                                        </el-table-column>
                                        <el-table-column prop="mainPrice" label="单价" width="130">
                                        </el-table-column>
                                        <el-table-column prop="totalWeight" label="重量小计" width="180">
                                        </el-table-column>
                                        <el-table-column prop="money" label="金额小计" width="180">
                                        </el-table-column>
                                        <el-table-column prop="productRemark" label="备注" width="240">
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
                                        <label>客户名称 : {{responseData.customerName}}</label>
                                        <label>收货人 :{{responseData.contact}}</label>
                                        <label>联系方式 :{{responseData.mobile}}</label>
                                        <label>收货地址 :{{responseData.addressLabel}}</label>
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item label="交货日期" prop="deliveryDate" width="50%">
                                                <el-date-picker type="date" placeholder="请选择日期" v-model="form.deliveryDate" style="width: 100%;" disabled></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="20">
                                            <el-form-item label="发票信息" prop="billInfo">
                                                <label>({{responseData.invoiceType}})</label>
                                                <label>发票抬头 :{{responseData.invoice}}</label>
                                                <label>发票内容 :{{responseData.invoiceContent}}</label>
                                                <label>开户银行 :{{responseData.bank}}</label>
                                                <label>开户账号 :{{responseData.bankAccount}}</label>
                                                <label>纳税人识别号 :{{responseData.taxNum}}</label>
                                                <label>地址 :{{responseData.invoiceAddress}}</label>
                                                <label>电话 :{{responseData.invoiceMobile}}</label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-form-item label="备注说明" prop="mark">
                                        <template scope>
                                            <i class="el-icon-plus" @click="addRemark"></i>
                                            <div>
                                                <p v-for="item in responseData.remarks">{{item.content}} ({{item.operator}}/{{item.companyName}} {{item.createTime}})</p>
                                            </div>
                                        </template>
                                    </el-form-item>
                                    <el-form-item label="附件信息" prop="upload">
                                        <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                                            <el-button slot="trigger" size="small" type="primary">添加附件</el-button>
                                            <div slot="tip" class="el-upload__tip">（附件最大20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、BMP、GIF、RAR、ZIP）</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="操作日志" prop="mark">
                                        <i class="el-icon-arrow-down" @click="tableShow" v-show="downVisible"></i>
                                        <i class="el-icon-arrow-up" @click="tableHide" v-show="operatorVisible"></i>
                                    </el-form-item>
                                </el-form>
                                <transition name="slide">
                                <el-table ref="multipleTable" :data="operatorLogs" border tooltip-effect="dark" style="width:100%" v-show="operatorVisible">
                                    <el-table-column prop="companyName" label="公司名称" >
                                    </el-table-column>
                                    <el-table-column prop="operatorName" label="操作人" >
                                    </el-table-column>
                                    <el-table-column prop="createTime" label="时间" >
                                    </el-table-column>
                                    <el-table-column prop="operationTypeName" label="操作类别" >
                                    </el-table-column>
                                    <el-table-column prop="content" label="操作日志" >
                                    </el-table-column>
                                </el-table>
                                </transition>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane label="出库发货记录" name="second">
                        <el-table ref="multipleTable" :data="orderDatas1" border tooltip-effect="dark" style="width:100%" height='123' show-summary>
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
                        <el-table ref="multipleTable" :data="orderDatas2" border tooltip-effect="dark" style="width:100%" height='123' show-summary>
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
                responseData: {},
                operatorVisible: false,
                downVisible: true,
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
                orderDatas: [],
                operatorLogs: []
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            tableShow(e){
                this.operatorVisible = true;
                this.downVisible = false;
            },
            tableHide(e){
                this.operatorVisible = false;
                this.downVisible = true;
            },
            addRemark() {
                const h = this.$createElement;
                console.log(h);
                this.$msgbox({
                    title: '添加备注',
                    message: h('p', null, [
                        h('textarea', {
                            style: 'width:99%;height:200px;'
                        }),
                        h('p', {
                                style: 'text-align:right'
                            },
                            '备注信息最多支持250字'
                        )
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            this.responseData.remarks.unshift({
                                companyName: "qia",
                                content: "这是一条测试",
                                createTime: "2017-06-13 16:38:26",
                                operator: "hx"
                            });
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 1000);
                        } else {
                            done();
                        }
                    }
                }).then(({
                    value
                }) => {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }

        },
        created() {
            axios.get('/static/jsonList/orderDetail.json').then(response => {
                    // 列表数据渲染
                    const data = response.data.data;
                    this.responseData = data;
                    this.orderDatas = data.detail;
                    this.operatorLogs = data.logs;
                    this.orderDatas.forEach(item => {
                        if (item.productRemark == '') {
                            item.productRemark = "无";
                        }
                        item.productImageUrl = 'https://oss.dinghuo123.com/images/productImage/' + item.productImageUrl;

                    })
                    if (this.responseData.invoiceType == '2') {
                        this.responseData.invoiceType = '增值税发票';
                    }

                    this.form.deliveryDate = this.responseData.deliveryDate;
                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
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
.slide-enter-active, .slide-leave-active {
  transition: opacity .5s
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
