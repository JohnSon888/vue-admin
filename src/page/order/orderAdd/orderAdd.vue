<template>
    <div class="order">
        <div class="content-wrap">
            <el-row class="header-wrap">
                <el-col :span="1">
                    <p>客户</p>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="输入名称/编码/联系人/手机" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                    </el-input>
                </el-col>
            </el-row>
            <el-row class="tbody-wrap">
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
            </el-form>
            <el-row class="btn-options">
                <el-button :plain="true" type="success">保存</el-button>
                <el-button :plain="true" type="success">取消</el-button>
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
                url: '',
                textarea: '',
                fileList: [],
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

            handleIconClick(ev) {

            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            submitForm(formName) {

            },
            resetForm(formName) {

            },
            cancelForm() {

            },
            getOrderList(url) {
                axios.get(url).then(response => {


                })
                .catch(error => {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
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
.header-wrap{
    padding-top: 10px;
    margin-bottom: 20px;
}
.header-wrap p{
    height: 36px;
    line-height: 36px;
}
.el-upload__tip {
    display: inline-block;
    margin-top: 0px;
}

.el-form {
    width: 80%;
}

.el-button {
    min-width: 86px;
    border-radius: 20px;
}

.btn-options {
    margin-top: 50px;
    padding: 20px 10px;
    box-shadow: 0px -4px 2px #f5f5f5;
}
</style>
