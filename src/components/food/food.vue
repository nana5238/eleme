<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="foodlist">
			<div class="food-content" >
				<div class="img-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-w">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count == 0" @click.stop.prevent="addFirst">
							加入购物车
						</div>
					</transition>
				</div>
				<split  v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text" >{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :desc="desc" :onlyContent="onlyContent" :selectType="selectType" :ratings="food.ratings" @ratingtype='ratingSelectFun'  v-on:onlycontent='onlyContentSelectFun'></ratingselect>
					<div class="rating-w">
						<ul v-show="food.ratings && foodLength">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item" >
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" wideth="12" height="12" :src="rating.avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<i class="icon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"></i>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !foodLength">
							暂无评价
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</transition>
</template>
<style scoped lang="scss" type="text/css">
.food{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index:30;
	width: 100%;
	background-color: #fff;
	transition: all 0.2s linear;
	&.move-enter-active,&.move-leave-active{
		transform: translate3d(0,0,0);
	}
	&.move-enter,&.move-leave-to{
		transform: translate3d(100%,0,0);
	}
	.img-header{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
		img{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.back{
			position: absolute;
			top:10px;
			left: 0;
			.icon{
				display: block;
				padding: 10px;
				font-size: 20px;
				color:#fff;

			}
		}
	}
	.content{
		padding: 18px;
		position: relative;
		.title{
			line-height: 14px;
			margin-bottom: 8px;
			font-size: 14px;
			font-weight: 700;
			color:rgb(7,17,27);
		}
		.detail{
			margin-bottom: 18px;
			line-height: 10px;
			height: 10px;
			font-size: 0;
			.sell-count,.rating{
				font-size: 10px;
				color:rgb(147,153,159);
			}
			.sell-count{
				margin-right: 12px;
			}
		}
		.price{
			font-weight: 700;
			line-height: 24px;
			.now{
				margin-right: 18px;
				font-size: 14px;
				color:rgb(240,20,20);
			}
			.old{
				text-decoration: line-through;
				font-size: 10px;
				color:rgb(147,153,159);
			}
		}
		.cartcontrol-w{
			position: absolute;
			right: 12px;
			bottom: 12px;

		}
		.buy{
			position: absolute;
			right: 18px;
			bottom: 18px;
			z-index:10;
			height: 24px;
			line-height: 24px;
			text-align: center;
			padding: 0 12px;
			box-sizing: border-box;
			font-size: 10px;
			border-radius:12px;
			color: #fff;
			background-color: rgb(0,160,220);
			transition: all 0.2s linear;
			&.move-enter-active,&.move-leave-active{
				opacity: 1;
			}
			&.move-enter,&.move-leave-to{
				opacity: 0;
			}
		}
	}
	.info{
		padding: 18px;

		.title{
			line-height: 14px;
			margin-bottom: 6px;
			font-size: 14px;
			color: rgb(7,17,27);
		}
		.text{
			color: rgb(77,85,93);
			font-size: 12px;
			line-height: 24px;
			padding: 0 8px;
		}
	}
	.rating{
		padding-top: 18px;
		.title{
			line-height: 14px;
			margin-left: 18px;
			font-size: 14px;
			color: rgb(7,17,27);

		}
		.rating-w{
			padding: 0 18px;
			.rating-item{
				position: relative;
				padding: 16px 0;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.user{
					position: absolute;
					right: 0;
					top: 16px;
					font-size: 0;
					line-height: 12px;
					.name{
						display: inline-block;
						vertical-align: top;
						font-size: 10px;
						color:rgb(147,153,159);
						margin-right: 6px;
					}
					.avatar{
						border-radius:50%;
					}
				}
				.time{
					line-height: 12px;
					font-size: 10px;
					color:rgb(147,153,159);
					margin-bottom: 6px;

				}
				.text{
					line-height: 16px;
					font-size: 12px;
					color:rgb(7,17,27);
					.icon{
						line-height: 16px;
						margin-right: 4px;
						font-size: 12px;
					}
					.icon-thumb_up{
						color:rgb(0,160,220);
					}
					.icon-thumb_down{
						color:rgb(147,153,159);
					}
				}
			}
		}
	}
	.no-rating{
		padding: 16px 0;
		font-size: 12px;
		color:rgb(147,153,159);
	}

}

</style>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import {formatDate} from 'common/js/date'
import Vue from 'vue';


const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2; //全部

export default{
	props:{
		food:{
			type:Object,
		},
	},
	components:{
		cartcontrol,
		split,
		ratingselect
	},
	data(){
		return{
			showFlag:false,
			selectType:ALL, //选择全部
			onlyContent:true, //只显示有内容的评价
			desc:{
				all:'全部',
				positive:'推荐',
				negative:'吐槽',
			},
			foodLength:0,

		}
	},
	filters:{
		formatDate(time){
			let date = new Date(time);
			return formatDate(date,'yyyy-MM-dd hh:mm');
		}
	},
	methods:{
		show(food){
			this.showFlag = true;
			this.selectType = ALL;
			this.onlyContent = true;
			this.food = food;
			this.foodLength = food.ratings.length;
			console.log(this.foodLength);
			this.$nextTick(()=>{
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.foodlist,{
						click:true
					})
				}else{
					this.scroll.refresh();
				}
			})
		},
		hide(){
			this.showFlag = false;
		},
		addFirst(){
			this.$emit('cart-add',event.target);
			Vue.set(this.food,'count',1);
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false;
			}

			if(this.selectType === ALL){
				return true;
			}else{
				return type === this.selectType;
			}	
		},
		ratingSelectFun(type){
			this.selectType = type;
			this.$nextTick(()=>{
				this.scroll.refresh();
			})
		},
		onlyContentSelectFun(flag){
			this.onlyContent = !this.onlyContent;
			this.$nextTick(()=>{
				this.scroll.refresh();
			})
		}
	},

}
</script>