<template>
  <div class="city">
      <div class="search_wrap">
          <div class="search">
              <i class="glyphicon glyphicon-search"></i>
              <input type="text" placeholder="输入城市名" v-model="city_val">
          </div>
          <button @click="$router.push({name:'address',params:{city:city}})">取消</button>
      </div>
      <div class="location" v-if="searchLists.length==0" @click="selectCity({name:city})">
          <loc :address="city"></loc>
      </div>
      <alpha ref="allcity" :keys="keys" :city_info="city_info" @selectCity="selectCity" v-if="searchLists.length==0" ></alpha>
      <div class="search_list">
          <ul>
              <li @click="selectCity(item)" v-for="(item,index) in searchLists" :key="index">{{item.name}}</li>
          </ul>
      </div>
      
  </div>
</template>

<script>
import loc from "../components/Location.vue"
import alpha from "../components/AlphaBat.vue"
export default {
    name:'city',
    components:{
        loc,
        alpha
    },
    data(){
        return {
            city_val:'',
            city_info:null,
            keys:[],
            allCities:[],//存放所有的城市名
            searchLists:[]//储存打字后出现的索引
        }
    },
    watch:{
        city_val(){
            this.searchCities();
        }
    },
    computed:{
        city(){
            return this.$store.getters.location.addressComponent.city
        }
    },
    created(){
        this.getCityInfo()
    },
    methods:{
        getCityInfo(){
            this.$axios.get("/api/posts/cities")
                .then(res=>{
                    //console.log(res.data)
                    this.city_info=res.data
                    this.keys=Object.keys(res.data)
                    this.keys.pop(); 
                    this.keys.sort();
                    this.$nextTick(()=>{
                        this.$refs.allcity.initScroll() 
                    });
                    //存储所有城市信息用于过滤
                    this.keys.forEach(key=>{
                        this.city_info[key].forEach(city=>{
                            this.allCities.push(city) 
                        })
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        selectCity(city){
            this.$router.push({name:"address",params:{city:city.name}});
        },
        searchCities(){//根据关键字索引
            if(!this.city_val){this.searchLists=[]}
            else{
                this.searchLists=this.allCities.filter(item=>{
                    return item.name.indexOf(this.city_val)!=-1;
                })
                
            }
        } 
    }
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  list-style-type: none;
}
</style>

</style>