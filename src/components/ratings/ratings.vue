<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-l">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-r">
					<div class="score-w">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-w">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>	
					</div>
					<div class="delivery-w">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>	
					</div>

				</div>
			</div>
			<split></split>
			<ratingselect  :onlyContent="onlyContent" :selectType="selectType" :ratings="ratings" v-on:ratingtype='ratingSelectFun'  v-on:onlycontent='onlyContentSelectFun'></ratingselect>
			<div class="rating-w">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-w">
								<star :size='24' :score="rating.score"></star>
								<span class="delivery" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show='rating.recommend || rating.recommend.length'>
								<i class="icon icon-thumb_up" ></i>
								<span v-for = 'item in rating.recommend' class="commend">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import star from 'components/star/star'
	import split from 'components/split/split'
	import ratingselect from 'components/ratingselect/ratingselect'
	import {formatDate} from 'common/js/date'
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2; //全部

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split,
			ratingselect
		},
		data(){
			return{
				showFlag:false,
				selectType:ALL, //选择全部
				onlyContent:true, //只显示有内容的评价
				ratings:[],
			}
		},
		created(){
			this.$http.get('/api/ratings').then(
	      	  	(res) => {
	      	  	  	res = res.body;
	      	  	  	this.ratings = res.data;
	      	  	  	this.$nextTick(()=>{

		      	  	  	this.scroll = new BScroll(this.$refs.ratings,{
							click:true
						})
	      	  	  	})
	      	  	}
	      	)
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		methods:{
			ratingSelectFun(type){
				this.selectType = type;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			onlyContentSelectFun(){
				this.onlyContent = !this.onlyContent;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
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
		}
	};
</script>

<style scoped lang="scss" type="text/css">
.ratings{
	position: absolute;
	width: 100%;
	top: 174px;
	left: 0;
	bottom: 0;
	overflow: hidden;
	.overview{
		display: flex;
		padding:18px 0;
		.overview-l{
			@media only screen and (max-width:320px){
				flex:0 0 120px;
				width: 120px;
			}
			flex:0 0 137px;
			width: 137px;
			border-right: 1px solid rgba(7,17,27,.1);
			text-align: center;
			padding: 6px 0;
			.score{
				line-height: 28px;
				font-size: 24px;
				color:rgb(255,253,0);
				margin-bottom: 6px;
			}
			.title{
				line-height: 12px;
				font-size: 12px;
				color:rgb(7,17,27);
				margin-bottom: 8px;
			}
			.rank{
				line-height: 10px;
				font-size: 10px;
				color:rgb(147,153,159);
			
			}
		}
		.overview-r{
			flex:1;
			padding: 6px 0 6px 24px;
			@media only screen and (max-width:320px){
				padding-left: 6px;
			}
			.score-w{
				
				margin-bottom: 8px;
				font-size: 0;
				.title{
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
					color:rgb(7,17,27);
					line-height: 18px;
				}
				.star{
					display: inline-block;
					vertical-align: top;
					margin:  0 12px;
				}
				.score{
					display: inline-block;
					vertical-align: top;
					color:rgb(255,153,0);
					line-height: 18px;
					font-size: 12px;
				}
			}
			.delivery-w{
				font-size: 0;
				.title{
					font-size: 12px;
					color:rgb(7,17,27);
					line-height: 18px;
				}
				.delivery{
					font-size: 12px;
					color:rgb(147,153,159);
					margin-left: 12px;
				}
			}
		}
	}
	.rating-w{
		padding: 0 18px;
		.rating-item{
			display: flex;
			padding: 18px 0;
			border-bottom: 1px solid rgba(7,17,27,.1);
			.avatar{
				flex:0 0 28px;
				width: 28px;
				margin-right: 12px;
				img{
					border-radius: 50%;
				}

			}
			.content{
				flex:1;
				position: relative;
				.name{
					line-height: 12px;
					font-size: 10px;
					color:rgb(7,17,27);
					margin-bottom: 4px;
				}
				.star-w{
					font-size: 0;
					margin-bottom: 6px;
					.star{
						display: inline-block;
						vertical-align: top;
						margin-right: 6px;
					}
					.delivery{
						display: inline-block;
						vertical-align: top;
						color:rgb(147,153,159);
						font-size: 10px;
					}
				}
				.text{
					line-height: 18px;
					color:rgb(7,17,27);
					font-size: 12px;
					margin-bottom: 8px;
				}
				.recommend{
					line-height: 16px;
					font-size: 0;
					.icon,.commend{
						display: inline-block;
						margin: 0 8px 4px 0;
						font-size: 9px;
					}
					.icon{
						color:rgb(0,160,220);
					}
					.commend{
						padding:0 6px;
						border:1px solid rgba(7,17,27,.1);
						border-radius:1px;
						color:rgb(147,153,159);
						background-color: #fff;
					}
				}
				.time{
					font-size: 10px;
					line-height: 12px;
					color:rgb(147,153,159);
					position: absolute;
					top:0;
					right:0;
				}
			}
		}
	}
}
</style>