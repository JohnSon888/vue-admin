<template>
	<div class="showbox" :class="{'showb':flag}">
		<orderHover v-if='flag1&&flag'></orderHover>
		<goodsHover v-if='flag2&&flag'></goodsHover>
		<clientHover v-if='flag3&&flag'></clientHover>
		<moneyHover v-if='flag4&&flag'></moneyHover>
		<marketingHover v-if='flag5&&flag'></marketingHover>
		<statementHover v-if='flag6&&flag'></statementHover>
	</div>
</template>
<script type="text/javascript">

import orderHover from './orderHover'
import goodsHover from './goodsHover'
import clientHover from './clientHover'
import moneyHover from './moneyHover.vue'
import marketingHover from './marketingHover'
import statementHover from './statementHover'
	export default {
		props:['flag','index'],
		data(){
			return{
	            flag1:false,
	            flag2:false,
	            flag3:false,
	            flag4:false,
	            flag5:false,
	            flag6:false,
			}
		},
		created(){
			var num = this.index+1
            this['flag'+num]=true;
		},
		components:{
	        orderHover,
	        goodsHover,
	        clientHover,
	        moneyHover,
	        marketingHover,
	        statementHover,
		}

	}
</script>
<style type="text/css" scoped>
	.showb {
		display: none;
	}
	.showbox {display: inline;}
</style>