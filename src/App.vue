<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
export default {
  name:'app',
  created(){
    this.getLocation();
  },
  methods:{
    getLocation(){
      const self=this;
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,     
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          console.log(data);
          self.$store.dispatch("setLocation",data);
          self.$store.dispatch("setAddress",data.formattedAddress)
        }

        function onError (data) {
          // 定位出错
          self.getPosition();
        }
})
},
    getPosition(){
      AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              console.log(result);
            }
  })
})
    },
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-size:14px;
}
</style>
