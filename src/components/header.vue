<template>
	<div class="header">
		<div class="content-w">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div> 
			<div class="content">
				<p class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</p>
				<p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
				<p class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</p>
			</div>
		</div>
		<div class="bull-w"></div>
	</div>
</template>

<script type="text/ecmascripy">
	export default {
		props:{
			seller:{
				type:Object,
			},
		},
		data(){

		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.header{
	color:#fff;
	background-color: #000;
}
.content-w{
	padding: 24px 12px 18px 24px;
	font-size: 0;
	.avatar{
		display: inline-block;
		vertical-align: top;
		img{
			border-radius: 2px;
		}
	}
	.content{
		display: inline-block;
		margin-left: 16px;
		.title{
			margin:2px 0 8px 0;
			.brand{
				vertical-align: top;
				width: 30px;
				height: 18px;
				display: inline-block;
				bg-image('brand');
				background-size: 30px 18px;
				background-repeat: no-repeat;
			}
			.name{
				margin-left: 6px;
				font-size: 16px;
				line-height: 18px;
				font-weight: bold;
			}
		}
		.desc{
			margin-bottom: 10px;
			line-height: 12px;
			font-size: 12px;

		}
		.support{
			.icon{
				vertical-align: top;
				display: inline-block;
				width: 12px;
				height: 12px;
				margin-right: 4px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
				&.decrease{
					bg-image('decrease_1');
				}
				&.discount{
					bg-image('discount_1');
				}
				&.guarantee{
					bg-image('guarantee_1');
				}
				&.invoice{
					bg-image('invoice_1');
				}
				&.special{
					bg-image('special_1');
				}
			}
			.text{
				font-size: 12px;
				line-height: 12px;
			}
		}
	}
}
</style>
