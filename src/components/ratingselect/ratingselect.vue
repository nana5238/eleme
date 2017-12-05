<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0)" class="block positive"  :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toogle" class="switch" :class="{'on':onlyContent}">
			<span class="icon icon-check_circle" ></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
	
</template>

<style scoped lang="scss" type="text/css">
.ratingselect{

	.rating-type{
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,.1);
		font-size: 0;

		.block{
			display: inline-block;
			padding: 8px 12px;
			margin-right: 8px;
			border-radius: 1px;
			color:rgb(77,85,93);
			font-size: 12px;
			line-height: 16px;
			&.active{
				color: #fff;
			}
			.count{
				font-size: 8px;
				margin-left: 2px;
			}
			&.positive{
				background-color: rgba(0,160,220,.2);
				&.active{
					background-color: rgb(0,160,220);
				}
			}
			&.negative{
				background-color: rgba(77,85,93,.2);
				&.active{
					background-color: rgb(77,85,93);
				}
			}

		}
	}
	.switch{
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7,17,27,.1);
		color:rgb(147,153,159);
		font-size: 0;
		&.on{
			.icon{
				color:#00c850;
			}
		}
		.icon{
			display: inline-block;
			vertical-align: top;
			font-size: 24px;
			margin-right: 4px;

		}	
		.text{
			display: inline-block;
			vertical-align: top;
			font-size: 12px;
		}
	}
}
</style>
<script>
	const POSITIVE = 0; //积极的
	const NEGATIVE = 1;  //消极的
	const ALL = 2; //全部

	export default{
		props:{

			ratings:{
				type:Array,
				default(){
					return [];
				}
			}, //评论列表数组
			selectType:{
				type:Number,
				default:ALL,
			}, //选择类型 默认全部
			onlyContent:{
				type:Boolean,
				default:true,
			}, //只看有内容的评价
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意',
					};
				}
			}, //按钮描述

		},

		computed:{
			positives(){
				return this.ratings.filter((rating) => {
					return  rating.rateType === POSITIVE;
				})
			},
			negatives(){
				return this.ratings.filter((rating) => {
					return  rating.rateType === NEGATIVE;
				})
			}
		},

		methods:{
			select(type){
				this.$emit('ratingtype',type);
			},
			toogle(){
				this.$emit('onlycontent');
			}
		}
	}
</script>