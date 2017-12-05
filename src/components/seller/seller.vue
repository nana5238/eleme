<template>
	<div class="seller" ref="seller">
		<div class="sell-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}{{seller.id}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>	
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.serviceScore}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>	
				<div class="favorite" @click="toogleFavorite">
					<span class="icon icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>	
			<div class="bulletin">
				<h1 class="title">公告与活动{{seller.id}}</h1>
				<div class="content-w">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>	
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-w" ref="picw">
					<ul class="pic-box" ref="picbox">
						<li class="pic-list" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>	
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>			
		</div>
	</div>
</template>
<script>
	import star from 'components/star/star'
	import split from 'components/split/split'
	import {saveToLocal,loadFromLocal} from 'common/js/store'
	import BScroll from 'better-scroll'
	import Vue from 'vue';
	export default{
		props:{
			seller:{
				type:Object,
			}
		},
		data(){
			return {
				favorite:(()=>{
					console.log(this.$refs.valid);
					return loadFromLocal(this.seller.id,'favorite',false)
				})(),
			}
		},

		computed:{
			favoriteText(){
				if(!this.favorite){
					return '收藏';
				}else{
					return '已收藏';
				}
			}
		},
		components:{
			star,
			split
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},

		mounted(){

			setTimeout(() => {
				console.log(this.seller.id);
				Vue.set(this.seller,'id',this.seller.id)
		      	this._initScroll();
		      	this._initPics();
		    }, 1000)
		},
		methods:{
			_initScroll(){
				if(!this.scoll){
					this.scoll = new BScroll(this.$refs.seller,{
						click:true,
					})
				}else{
					this.scoll.refresh();
				}
			},
			_initPics(){
				if(this.seller.pics){
					let picwidth = 120;
					let picmargin = 6;
					let width =(picwidth+picmargin)*this.seller.pics.length -picmargin;
					this.$refs.picbox.style.width = width + 'px';
					this.$nextTick(()=>{
						if(!this.picScroll){

							this.picScroll = new BScroll(this.$refs.picw,{
								scrollX:true,
								eventPassthrough:'vertical'
							})
						}else{
							this.picScroll.refresh();
						}
					})

				}
			},
			toogleFavorite(){
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id,'favorite',this.favorite);
			}

		}
	};
</script>

<style scoped lang="scss" type="text/css">
.seller{
	position: absolute;
	width: 100%;
	top: 174px;
	left: 0;
	bottom: 0;
	overflow: hidden;
	.overview{
		padding: 18px;
		position: relative;
		.title{
			margin-bottom: 8px;
			line-height: 14px;
			color:rgb(7,17,27);
			font-size: 14px;
		}
		.desc{
			padding-bottom: 18px;
			font-size: 0;
			border-bottom: 1px solid rgba(7,17,27,.1);
			.star{
				display: inline-block;
				vertical-align: top;
				margin-right: 8px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				margin-right: 12px;
				line-height: 18px;
				font-size: 10px;
				color:rgb(77,85,93);
			}
		}
		.remark{
			display: flex;
			padding-top: 18px;
			.block{
				flex:1;
				text-align: center;
				border-right: 1px solid rgba(7,17,27,.1);
				&:last-child{
					border-right:0;
				}
				h2{
					margin-bottom: 4px;
					line-height: 10px;
					font-size: 10px;
					color:rgb(147,153,159);
				}
				.content{
					line-height: 24px;
					font-size: 10px;
					color:rgb(7,17,27);
					.stress{
						font-size: 24px;
					}
				}
			}
		}
		.favorite{
			position: absolute;
			right: 11px;
			top: 18px;
			text-align: center;
			width: 50px;
			.icon{
				display: block;
				color:#d4d6d9;
				line-height: 24px;
				font-size: 24px;
				margin-bottom: 4px;
				&.active{
					color:rgb(240,20,20);
				}
			}
			.text{
				color:rgb(77,85,93);
				line-height: 10px;
				font-size: 10px;
			}	
		}
	}
	.bulletin{
		padding: 18px 18px 0 18px;
		.title{
			margin-bottom: 8px;
			line-height: 14px;
			color:rgb(7,17,27);
			font-size: 14px;
		}
		.content-w{
			padding:0 12px 16px; 
			border-bottom: 1px solid rgba(7,17,27,.1);
			p{
				line-height: 24px;
				font-size: 12px;
				color:rgb(240,20,20);
			}
		}
		.supports{
			.support-item{
				padding: 16px 12px;
				font-size: 0;
				border-bottom: 1px solid rgba(7,17,27,.1);
				&:last-child{
					border:none;
				}
				.icon{
					display: inline-block;
					width: 16px;
					height: 16px;
					margin-right: 6px;
					background-size: 16px 16px;
					background-repeat: no-repeat;
					vertical-align: top;
					&.decrease{
						background-image: url(decrease_4@2x.png);
					}
					&.discount{
						background-image: url(discount_4@2x.png);
					}
					&.guarantee{
						background-image: url(guarantee_4@2x.png);
					}
					&.invoice{
						background-image: url(invoice_4@2x.png);
					}
					&.special{
						background-image: url(special_4@2x.png);
					}
				}
				.text{
					font-size: 12px;
					line-height: 16px;
					color:rgb(7,17,27);
				}
			}
		}
	}
	.pics{
		padding: 18px;
		.title{
			margin-bottom: 12px;
			line-height: 14px;
			color:rgb(7,17,27);
			font-size: 14px;
		}
		.pic-w{
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			.pic-box{
				font-size: 0;

				.pic-list{
					display: inline-block;
					margin-right: 6px;
					width: 120px;
					height: 90px;
					&:last-child{
						margin-right:0;
					}
				}
			}
		}
	}
	.info{
		padding:18px 18px 0;
		color:rgb(7,17,27);
		.title{
			padding-bottom: 12px;
			line-height: 14px;
			
			font-size: 14px;
			border-bottom: 1px solid rgba(7,17,27,.1);
		}
		ul{
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				font-size: 12px;
				border-bottom: 1px solid rgba(7,17,27,.1);
				&:last-child{
					border:none;
				}
			}
		}
	}
	
}
</style>