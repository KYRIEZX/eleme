<template>
  <div class="area" v-if="city_info" ref="area_scroll">
      <div class="scroll_wrap">
          <div class="hot_wrap citylist">
              <div class="title">热门城市</div>
              <ul class="hot_city">
                  <li v-for="(item,index) in city_info.hotCities" :key="index" @click="$emit('selectCity',item)">{{item.name}}</li>
              </ul>   
          </div>
          <div class="city_wrap">
              <div class="city_content citylist" v-for="(item,index) in keys" :key="index">
                  <div class="title">{{item}}</div>
                  <ul>
                      <li v-for="(city,index) in city_info[item]" :key="index" @click="$emit('selectCity',item)">{{city.name}}</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="area_keys">
          <ul>
              <li @click="selectKey(0)">#</li>
              <li @click="selectKey(index+1)" v-for="(item,index) in keys" :key="index">{{item}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Alphabat',
    data(){
        return {
            scroll:null
        }
    },
    props:{
        keys:Array,
        city_info:Object 
    },
    methods:{
        initScroll(){// 实例化scroll滚动工具
             this.scroll=new BScroll(this.$refs.area_scroll,{
                 click:true
             })
        },
        selectKey(i){//右侧下表索引
             //console.log(this.$refs.area_scroll.getElementsByClassName("citylist"))
             //根据下标滚动到相应位置
             const citylist=this.$refs.area_scroll.getElementsByClassName("citylist");
             let el=citylist[i]
             this.scroll.scrollToElement(el,300)
        }
    }
}
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.scroll_wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  list-style-type: none;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  list-style-type: none;
}
.area_keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
.area_keys li{
    list-style-type: none;
}
</style>
