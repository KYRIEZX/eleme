<template>
    <div class="home">
        <div class="header">
            <div class="address_map" @click="toAddress">
                <i class="glyphicon glyphicon-map-marker">
                    <span>{{address}}</span><i class="glyphicon glyphicon-chevron-down"></i>
                </i>
            </div>
            <div class="search_wrap">
              <div class="shop_search">
                <i class="glyphicon glyphicon-search"></i>
                搜索商家 商家名称
              </div>
            </div>
        </div>
        <div id="container">
          <!-- 轮播 -->
          <mt-swipe :auto="4000" class="swiper">
            <mt-swipe-item v-for="(img,index) in swipeImgs" :key=index>
              <img :src="img" alt="_blank">
            </mt-swipe-item>
          </mt-swipe>
          <!-- 分类 -->
          <mt-swipe :auto="0" class="entries">
            <mt-swipe-item v-for="(entry,i) in entries" :key=i>
              <div class="foodentry" v-for="(item,index) in entry" :key="index">
                <div class="img_wrap">
                  <img :src="item.image" alt="No">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 推荐商家 -->
        <div class="shoplist-title">推荐商家</div>
        <filterV :filterData="filterData"></filterV>
    </div> 
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import filterV from "../components/filterview"
export default {
    name:'home',
    components:{
      filterV
    },
    data(){
      return{
        swipeImgs:[],
        entries:[],
        filterData:null
      }
    },
    computed:{
        address(){
            return this.$store.getters.address
        },
        city(){
          return this.$store.getters.location.addressComponent.city
        }
    },
    methods:{
        toAddress(){
            this.$router.push({name:"address",params:{city:this.city}})
        },
        getData(){
          this.$axios.get('/api/profile/shopping').then(res=>{
             this.swipeImgs=res.data.swipeImgs;
             this.entries=res.data.entries;
          })
          this.$axios.get('/api/profile/filter').then(res=>{
            console.log(res.data)
            this.filterData=res.data
          })
        }
    },
    created(){
      this.getData();
    }
}
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 15px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  
  
}
.search_wrap .shop_search {
  margin-top: 10px;
  background: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search_wrap{
  position:sticky;
  top:0px;
  z-index:999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  margin-top:10px;
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>
