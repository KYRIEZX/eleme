<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data="tabarData"></TabBar>
    </div>
</template>
<script>
import TabBar from "../components/TabBar"
export default {
    name:'index',
    components:{
        TabBar
    },
    data(){
        return {
            tabarData:[
                {title:"首页",path:"/home",icon:"home"},
                {title:"订单",path:"/order",icon:"bell "},
                {title:"我的",path:"/me",icon:"user "},
            ]
        }
    }
}
</script>