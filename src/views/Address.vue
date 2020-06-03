<template>
  <div class="address">
    <div>
      <hhh :isLeft="true" title="选择收货地址"/>
    </div>
      <div class="city_search">
        <span class="city" @click="$router.push('/city')">{{city}}
        <i class="glyphicon glyphicon-chevron-down"></i>
        </span>
        <i class="glyphicon glyphicon-search"></i>
        <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
      </div>
      <loc :address="addr" @select="selectAddress"></loc>
      <div class="area">
        <ul class="area_list" v-for="(item,index) in areaList" :key="index" @click="selectAddress(item)">
          <li>
            <h4>{{item.name}}</h4>
            <p>{{item.district}}{{item.address}}</p>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import hhh from "../components/HeadBar";
import loc from "../components/Location";

export default {
    name:"Address",
    data(){
      return {
        city:'',
        search_val:'',
        areaList:[]
      }
    },
    components:{
      hhh,
      loc
    },
    beforeRouteEnter(to,from,next){
      //console.log(to)
      //从之前页面中获取数据 
      next(vm=>{
         vm.city=to.params.city;
      })
    },
    computed:{
      addr(){
        return this.$store.getters.location.formattedAddress;
      }
    },
    watch:{
      search_val(){
        this.searchPlace()
      }
    },
    methods:{
      searchPlace(){
        const self=this
        AMap.plugin('AMap.Autocomplete', function(){
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city
        }
        var autoComplete= new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.areaList=result.tips
        })
      })
      },
      selectAddress(item){
          if(item){
            this.$store.dispatch("setAddress",item.district+item.address+item.name)
          }
          else{
            this.$store.dispatch("setAddress",this.addr)
          }
          this.$router.push('/home')
      },
    }
    
}
</script> 

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
  list-style-type: none;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;

}
</style>

</style>