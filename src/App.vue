<template>
  <div id="app">
      <v-header :seller="seller"></v-header>  
      <div class="tab" >
        <div class="tab-item border1"><router-link to="/goods">商品</router-link></div>  
        <div class="tab-item border1"><router-link to="/ratings">评论</router-link></div>  
        <div class="tab-item border1"><router-link to="/seller">商家</router-link></div>  
      </div> 
      <keep-alive> 
        <router-view :seller="seller"></router-view> 
      </keep-alive>

  </div>
</template>

<script>
  import header from 'components/header/header.vue' 
  import {urlParse} from 'common/js/util.js'
  export default {
    name: 'app',
    components:{
      'v-header':header,
    },

    data(){
      return{
        seller:{
        },
      }
    },
    created(){   
      this.$http.get('/api/seller').then(
        (res) => {
          res = res.body;
          this.seller = res.data;
          if(urlParse().id){
            this.seller.id = urlParse().id;
          }

        }
      )
    },
  }
</script>

<style scoped lang="scss" type="text/css">

.tab{
  display: flex;
  width: 100%;
  height: 40px;
  .tab-item{
    flex:1;
    position: relative;
    &:after {
      display:block;
      position: absolute;
      left: 0;
      bottom: 0;
      content:'';
      border-top: 1px solid #ccc;
      width: 100%;
    }
   
    a{
      display: block;
      width: 100%;
      text-align: center;
      line-height: 40px;
      
    }
    .active{
        color:rgb(240,40,40);
    }
  }
  .border1{
    &:after{
      transform: scaleY(0.5);
    }
  }
}
</style>
