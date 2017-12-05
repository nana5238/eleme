<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCount">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>	
		<div class="cart-count" v-show="food.count > 0"> {{food.count}}</div>
		<div class="cart-add " @click.stop.prevent="addCount">
			<span  class="inner icon-add_circle"></span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue';
	export default{

		props:{
			food:{
				type:Object,

			}
		},
		created(){
			
		},
		methods:{
			addCount(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count ++;
				}
				this.$emit('cart-add',event.target)
			},
			decreaseCount(){
				if(this.food.count > 0){
					this.food.count --;
				}
			}
		}
	}
</script>
<style scoped lang="scss" type="text/css">
	.cartcontrol{
		font-size: 0;
		.cart-decrease,.cart-add{
			display: inline-block;
			padding: 6px;
			.inner{
				font-size: 24px;
				line-height: 24px;
				color:rgb(0,160,220);
				display: inline-block;
			}
		}
		.cart-decrease{
			transition: all 0.4s linear;
			&.move-enter-active,&.move-leave-active{
				opacity: 1;
				transform: translate3d(0,0,0);
			}
			&.move-enter,&.move-leave-to{
				opacity: 0;
				transform: translate3d(24px,0,0);
			}
			.inner{
				transition:  all 0.4s linear;
				&.move-enter-active,&.move-leave-active{
					transform: rotate(0);
				}
				&.move-enter,&.move-leave-to{
					transform: rotate(180);
				}
			}
		}
		.cart-count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			padding-top: 6px;
			line-height: 24px;
			text-align: center;
			font-size:10px;
			color:rgb(147,153,159);

		}
		.cart-add{
			display: inline-block;
			

		}
	}
</style>