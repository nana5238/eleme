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
				<p class="support" v-if="seller.supports" >
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</p>
			</div>
			<div class="support-count" v-if="seller.supports" @click="detailShow=true">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right icon"></i>
			</div>
		</div>
		<div class="bull-w" @click="detailShow=true">
			<span class="title"></span><span class="text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right icon"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detail-w clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}{{seller.score}}</h1>
						<div class="star-w">
							<star :size="48" :score="seller.score"></star>	
						</div>	
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="detailShow=false">
					<i class="icon icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascripy">
	import star from 'components/star/star'
	
	export default {
		props:{
			seller:{
				type:Object,
			},
		},
		data(){
			return{
				detailShow:false,
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components:{
			star
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.header{
	color:#fff;
	position: relative;
	background-color: rgba(7,17,27,0.5);
	overflow: hidden;
}
.content-w{
	position: relative;
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
				background-image: url(brand@2x.png);
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
				display: inline-block;
				width: 12px;
				height: 12px;
				margin-right: 4px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
				vertical-align: top;
				&.decrease{
					background-image: url(decrease_1@2x.png);
				}
				&.discount{
					background-image: url(discount_1@2x.png);
				}
				&.guarantee{
					background-image: url(guarantee_1@2x.png);
				}
				&.invoice{
					background-image: url(invoice_1@2x.png);
				}
				&.special{
					background-image: url(special_1@2x.png);
				}
			}
			.text{
				font-size: 10px;
				line-height: 12px;
			}
		}
	}
	.support-count{
		position: absolute;
		right: 12px;
		bottom:14px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius:14px;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
		.count{
			vertical-align: top;
			font-size: 10px;
		}
		.icon{
			line-height: 24px;
			font-size: 10px;
			margin-left: 2px;
		}
	}
}
.bull-w{
	height: 28px;
	line-height: 28px;
	padding: 0 22px 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	position: relative;
	background-color: rgba(7,17,27,0.2);
	.title{
		display: inline-block;
		vertical-align: top;
		margin-top: 8px;
		background-image: url(bulletin@2x.png) ;
		background-repeat: no-repeat;
		background-size: 22px 12px;
		width: 22px;
		height: 12px;
		display: inline-block;
	}
	.text{
		vertical-align: top;
		font-size: 10px;
		margin: 0 4px ;
	}
	.icon{
		position: absolute;
		font-size: 10px;
		right: 12px;
		top: 8px;
	}
}
.background{
	position: absolute;
	top:0;
	left:0;
	width: 100%;
	height: 100%;
	z-index:-1;
	filter: blur(10px);

}
.detail{
	position: fixed;
	z-index:100;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(7,17,27,0.8);
	transition:all 0.5s; 
	background-filter:blur(10px); 
	&.fade-enter-active, &.fade-leave-active{
		opacity: 1;
		background-color: rgba(7,17,27,0.8);
	}
	&.fade-enter, &.fade-leave-to{
		opacity: 0;
		background-color: rgba(7,17,27,0);
	}
	.detail-w{
		min-height: 100%;
		width: 100%;
		.detail-main{
			margin-top: 64px;
			padding-bottom: 64px;
			.name{
				line-height: 16px;
				text-align: center;
				font-size: 16px;
				font-weight: 700;
			}
			.star-w{
				margin-top: 18px;
				padding: 2px 0;
				text-align: center;
			}
			.title{
				display: flex;
				width: 80%;
				margin:28px auto 24px auto;
				.line{
					flex:1;
					position: relative;
					top:-6px;
					border-bottom: 1px solid rgba(255,255,255,.2);
				}
				.text{
					padding: 0 12px;
					font-size: 14px;
					font-weight: 700;
				}
			}
			.supports{
				width: 80%;
				margin: 0 auto;

				.support-item{
					padding: 0 12px;
					margin-bottom: 12px;
					font-size: 0;
					&:last-child{
						margin-bottom: 0;
					}
					.icon{
						display: inline-block;
						width: 16px;
						height: 16px;
						vertical-align: top;
						margin-right: 6px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						&.decrease{
							background-image: url(decrease_2@2x.png);
						}
						&.discount{
							background-image: url(discount_2@2x.png);
						}
						&.guarantee{
							background-image: url(guarantee_2@2x.png);
						}
						&.invoice{
							background-image: url(invoice_2@2x.png);
						}
						&.special{
							background-image: url(special_2@2x.png);
						}
					}
					
					.text{
						line-height: 16px;
						font-size: 12px;
					}
				}
			}
			.bulletin{
				width: 80%;
				margin:0 auto;
				.content{
					padding: 0 12px;
					line-height: 24px;
					font-size: 12px;
				}
			}
		}
		
	}
	.detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin:-64px auto 0 auto;
		clear: both;
		font-size: 32px;
		.icon{

		}
	}
	
}
</style>
