<template>
	<div>
		<div class="goods">
			<div class="menu-w" ref="menu">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex == index}"  @click="selectMenu(index,$event)">
						
						<span class="text">
							<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-w"  ref="food">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item" @click="selectFood(food)">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc"food>{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}</span>
										<span>好评率{{food.rating}}</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-w">
										<cartcontrol :food="food" v-on:cart-add="drop"></cartcontrol>	
									</div>
									
								</div>
							</li>
						</ul>
						
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
		</div>
		<food :food="selectedFood" ref="foods"></food>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import shopCart from 'components/shopcart/shopcart'
	import cartcontrol from 'components/cartcontrol/cartcontrol'
	import food from 'components/food/food'
	export default{
		props:{
	    	seller:{
	    		type:Object,
	    	}
	    },
	    components:{
	    	shopcart:shopCart,
	    	cartcontrol:cartcontrol,
	    	food,
	    },
		data(){
	     	return{
	     	  	goods:[],
	     	  	listHeight:[],
	     	  	scrollY:0, //滚动到的高度
	     	  	selectedFood:{},
	     	}
	    },
	    created(){
	    	this.classMap = ['decrease','discount','special','invoice','guarantee']
	      	this.$http.get('/api/goods').then(
	      	  	(res) => {
	      	  	  	res = res.body;
	      	  	  	this.goods = res.data;
	      	  	  	this.$nextTick(() => {
	      	  	  		this.initScroll();
	      	  	  		this.calculateHeight();
	      	  	  	})
	      	  	}
	      	)
	    },
	    computed:{
	    	//取到当前滚动到listHeight的索引，通过scrollY 去判断所属区域
	    	currentIndex(){
	    		for(let i =0;i < this.listHeight.length;i++){
	    			let height1 = this.listHeight[i];
	    			let height2 = this.listHeight[i+1];
	    			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
	    				return i;
	    			}
	    		}
	    		return 0;
	    	},
	    	selectFoods(){
	    		let foods = [];
	    		this.goods.forEach((good)=>{
	    			good.foods.forEach((food)=>{
	    				if(food.count){
	    					foods.push(food);
	    				}
	    			})
	    		})
	    		return foods;
	    	},
	    },
	    methods:{
	    	//引用BScroll
	    	initScroll(){
	    		this.menuScroll = new BScroll(this.$refs.menu,{
	    			click:true
	    		});
	    		this.foodScroll = new BScroll(this.$refs.food,{
	    			click:true,
	    			probeType:3,
	    		});
	    		//滚动事件，取到scrollY的值；
	    		this.foodScroll.on('scroll',(pos)=>{
	    			this.scrollY = Math.abs(Math.round(pos.y));
	    		})
	    	},
	    	//取到内容区所有模块的高度this.listHeight
	    	calculateHeight(){
	    		let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
	    		let height = 0;
	    		this.listHeight.push(height) ;
	    		for(let i = 0; i < foodList.length;i++){
	    			let item =  foodList[i];
	    			height += item.clientHeight;
	    			this.listHeight.push(height) ;
	    		}
	    	},
	    	//点击直接滚动到对应的dom元素
	    	selectMenu(index,event){
	    		if(!event._constructed){
	    			return;
	    		}
	    		let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
	    		let el = foodList[index];
	    		this.foodScroll.scrollToElement(el,300);
	    	
	    	},
	    	drop(target){

	    		//体验优化，异步执行下落动画
	    		this.$nextTick(() =>{
	    			this.$refs.shopcart.drop(target);
	    		})
	    	},
	    	selectFood(food){
	    		this.selectedFood = food;
	    		this.$refs.foods.show(food);
	    	}
	    },
	};
</script>

<style scoped lang="scss" type="text/css">
.goods{
	display: flex;
	position: absolute;
	top:174px;
	bottom:46px;
	width: 100%;
	overflow: hidden;
	.menu-w{
		flex:0  0 80px;
		width: 80px;
		background: #F3F5F7;
		.menu-item{
			display: table;
			height: 54px;
			width: 56px;
			line-height: 14px;
			padding: 0 12px;
			&.current{
				position: relative;
				z-index:10;
				background-color: #fff;
				font-weight: 700;
				margin-top: -1px;
				.text{
					border:none;
				}

			}
			.icon{
				display: inline-block;
				width: 12px;
				height: 12px;
				margin-right: 2px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
				vertical-align: top;
				&.decrease{
					background-image: url(decrease_3@2x.png);
				}
				&.discount{
					background-image: url(discount_3@2x.png);
				}
				&.guarantee{
					background-image: url(guarantee_3@2x.png);
				}
				&.invoice{
					background-image: url(invoice_3@2x.png);
				}
				&.special{
					background-image: url(special_3@2x.png);
				}
			}
			.text{
				display: table-cell;
				font-size: 12px;
				width: 56px;
				vertical-align: middle;
				border-bottom: 1px solid rgba(7,17,27,.1);
			}
		}
	}
	.foods-w{
		flex:1;

		.title{
			padding-left: 14px;
			height: 26px;
			line-height: 26px;
			border-left:2px solid #d9dde1;
			font-size: 12px;
			color:rgb(147,153,159);
			background-color: #f3f5f7;
		}
		.food-item{
			display: flex;
			margin: 18px;
			padding-bottom: 18px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			position: relative;
			&:last-child{
				border-bottom:0;
				margin-bottom: 0;
			}
			.icon{
				flex:0 0 57px;
				margin-right: 10px;

			}
			.content{
				flex:1;
				.name{
					margin:2px 0 8px 0;
					height: 14px;
					line-height: 14px;
					font-size: 14px;
					color:rgb(7,17,27);
				}
				.desc,.extra{
					font-size: 10px;
					line-height: 10px;
					color:rgb(147,153,159);
				}
				.desc{
					margin-bottom: 8px;
				}
				.extra{
					.count{
						margin-right: 12px;
						line-height: 12px;
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
					right: 0;
					bottom: 12px;
				}
			}
		}

		
	}

}
</style>