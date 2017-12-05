<template>
	<div class="shopcart-box">
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-l">
					<div class="logo-w">
						<div class="logo" :class="{'highlight':totalCount > 0}">
							<i class="icon icon-shopping_cart"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight':totalCount > 0}">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>

				</div>
				<div class="content-r" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball-content">
				<div  v-for="ball in balls">
					<transition  name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
						<div v-show="ball.show" class="ball">
							<div class="inner innerhook"></div>
						</div>
					</transition>
				</div>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-w">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
					
				</div>
			</transition>
			
		</div>
		<transition name="fade">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
	</div>
	
</template>
<style scoped lang="scss" type="text/css">
.shopcart{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index:50;
	height: 48px;
}
.content{
	display: flex;
	background-color: #141d27;
	font-size: 0;
	color:rgba(255,255,255,.4);
	.content-l{
		flex:1;
		.logo-w{
			display: inline-block;
			position: relative;
			top:-10px;
			margin: 0 12px;
			padding: 6px;
			width: 56px;
			height: 56px;
			box-sizing: border-box;
			background-color: #141d27;
			vertical-align: top;
			border-radius: 50%;
			.logo{
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #2b333c;
				text-align: center;
				&.highlight{
					background-color:rgb(0,160,220);
					.icon{
						color:#fff;
					}
				}
				.icon{
					font-size: 24px;
					color:#80858a;
					line-height: 44px;
				}

			}
			.num{
				position: absolute;
				top: 0;
				right: 0;
				width: 24px;
				height: 16px;
				line-height: 16px;
				text-align: center;
				font-size:9px;
				color:#fff;
				border-radius:16px;
				font-weight: 700;
				background-color: rgb(240,20,20);
				box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
			}

		}
		.price{
			vertical-align: top;
			line-height: 24px;
			margin-top: 12px;
			display: inline-block;
			font-weight: 700;
			font-size: 16px;
			box-sizing:border-box;
			padding-right: 12px;
			border-right:1px solid rgba(255,255,255,.1);
			color:rgba(255,255,255,.4);
			&.highlight{
				color:#fff;
			};
		}
		.desc{
			display: inline-block;
			vertical-align: top;
			line-height: 24px;
			margin: 12px 0 0 12px;
			font-size: 10px;
		}
	}
	.content-r{
		flex:0 0 105px;
		width: 105px;
		.pay{
			font-size: 12px;
			height: 48px;
			line-height: 48px;
			text-align: center;
			font-weight: 700;
			background-color: #2b333b;
			&.no-enough{
				background-color: #2b333b;
			}
			&.enough{
				background-color: #00b43c;
				color:#fff;
			}
		}

	}
}
.ball-content{
	.ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index:200;
		transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
		.inner{
			width: 16px;
			height: 16px;
			background-color: rgb(0,160,220);
			border-radius: 50%;
			transition: all 0.4s linear;
		}
	}
}
.shopcart-list{
	position: absolute;
	left: 0;
	top: 0;
	z-index:-1;
	width: 100%;
	transition:all 0.5s;
	transform:translate3d(0,-100%,0);

	&.fold-enter,&.fold-leave-to{
		transform: translate3d(0,0,0);
	}
	.list-header{
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background-color: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,.1);
		.title{
			float: left;
			font-size: 14px;
			color:rgb(7,17,27);
		}
		.empty{
			float: right;
			font-size: 12px;
			color:rgb(0,160,220);
		}
	}
	.list-content{
		padding: 0 18px;
		max-height:217px; 
		overflow: hidden;
		background-color: #fff;
		.food{
			position: relative;
			padding: 12px 0;
			box-sizing:border-box;
			border-bottom: 1px solid rgba(7,17,27,.1);

			.name{
				line-height: 24px;
				font-size: 14px;
				color:rgb(7,17,27);
			}
			.price{
				position: absolute;
				right: 90px;
				bottom: 12px;
				line-height: 20px;
				color: rgb(240,20,20);
				font-size: 14px;
				font-weight: 700
			}
			.cartcontrol-w{
				position: absolute;
				right: 0;
				bottom: 6px;
			}
		}
	}
}

.list-mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index:40;
	background-filter: blur(10px);
	transition:all 0.5s;
	opacity: 1;
	background-color:rgba(7,17,27,.6);
	&.fold-enter,&.fold-leave-to{
		opacity: 0;
		background-color:rgba(7,17,27,0);
	}
}
</style>
<script type="text/ecmascript-6">
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import BScroll from 'better-scroll'
	export default{
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [
						{
							count:2,
							price:10,
						}
					];
				},
			},
			deliveryPrice:{
				type:Number,
				default:0,
			},
			minPrice:{
				type:Number,
				default:0,
			},
		},
		data(){
			return {
				balls:[
					{show:false},
					{show:false},
					{show:false},
					{show:false},
					{show:false},
				],
				dropballs:[],
				fold:true, //遮罩层
			}
		},
		computed:{
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc(){
			   	let Desc = '';
				if(this.totalPrice === 0){
					Desc = '￥'+this.minPrice+'元起送';
				}else if(this.totalPrice < this.minPrice){
					let cha = this.minPrice - this.totalPrice;
					Desc = '还差￥'+ cha+'元起送';
				}else{
					Desc = "去结算";
				}
				return Desc;
			},
			payClass(){
				if(this.totalPrice >= this.minPrice){
					return 'enough';
				}else{
					return 'no-enough';
				}
			},
			listShow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll = new BScroll(this.$refs.listContent,{
		    					click:true
		    				});
						}else{
							this.scroll.refresh();
						}
					})
				}
				return show;
			}
			
		},
		created(){
			
		},
		methods:{
			drop(el){
				console.log(el);
				for(let i =0;i < this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropballs.push(ball);
						return;
					}
				}
			},
			beforeEnter(el){
				let count = this.balls.length;
				while(count--){
					let ball = this.balls[count];
					if(ball.show){
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left-32;
						let y = -(window.innerHeight - rect.top -22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('innerhook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			enter(el,done){
				let rf = el.offsetHeight;
				this.$nextTick(()=>{
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('innerhook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend',done);
				})
			},
			afterEnter(el){
				let ball = this.dropballs.shift();
				if(ball){
					ball.show = false;
					el.style.display = 'none';
				}
			},
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			empty(){
				this.selectFoods.forEach((food)=>{
					food.count = 0;
				})	
			},
			hideList(){
				this.fold = true;
			},
			pay(){
				if(this.totalPrice < this.minPrice){
					return;
				}else{
					window.alert(`支付${this.totalPrice}`);
				}
			}
		},
		components:{
			cartcontrol,
		}

	}
</script>