<template>
  <div class="header">
      <!-- left -->
        <div class="header-button is-left" v-show="isLeft">
            <i class="glyphicon glyphicon-chevron-left"></i>
            <button @click="Back">返回</button>
        </div>
      <!-- title -->
        <div class="header-title">{{title}}</div>
        
  </div>
</template>

<script>
export default {
    name:"HeadBar",
    props:{
        title:String,
        isLeft:{
            type:Boolean,
            default:false 
        }
    },
    methods:{
        Back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.header {
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 16px;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.header-button button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}
.header-title {
  flex: 1;
  
}
.is-left {
  text-align: left;
}
</style>


