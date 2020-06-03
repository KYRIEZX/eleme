<template>
    <div class="login">
        <div class="logo"><img src="../assets/logo.jpg" alt="login image"></div>
        <InputGroup class="text_group" type="number" v-model="phone" placeholder="手机号" 
                    :btnTitle="btnTitle" :disabled="disabled" :error="errors.phone" v-on:btnClick="getVerifyCode"/>
        <InputGroup class="text_group" type="number" v-model="verifyCode" placeholder="验证码" 
                    :error="errors.code" />
        <div class="login_des ">
             <p>
                新用户登录即自动注册，表示已同意
                <span>《用户服务协议》</span>
            </p>
        </div>
        <div class="login_btn">
            <button @click="handLogin">登录</button>
        </div>
        
    </div>
</template>
<script>
import InputGroup from '../components/inputGroup'
export default {
    name:'login',
    components:{
        InputGroup
    },
    data:function(){
        return{
            phone:'',
            verifyCode:'',
            btnTitle:'获取验证码',
            disabled:false,
            errors:{}
        }
    },
    methods:{
        getVerifyCode(){
            if(this.validPhone()){
                //发送网络请求
                this.$axios.post("/ api/posts/sms_send",{
                    sid: "c4d74e9dd254f2fe303c9411a675e273",
                    token: "04fcb3f6b8199fb9805208a1d25ec81d",
                    appid: "4f0624d6db094d0abcac09eed7d7e6e6",
                    templateid: "546715",
                    phone: this.phone
                }).then(res=>{
                    console.log(res)
                    this.validBtn();
                })
                
            }
        },
        validBtn(){
            let time=60;
            let timer=setInterval(()=>{
                if(time==0){
                    this.btnTitle="获取验证码"
                    this.disabled=false
                }else{
                    this.btnTitle=time+"秒后重试";
                    this.disabled=true;
                    time--;
                }
            },1000)
        },
        validPhone(){
            if(!this.phone){
                this.errors={
                    phone:'请填写正确的手机号'
                }
                return false;
            }else if(!/^1[345678]\d{9}$/.test(this.phone)){
                this.errors = {
                phone: "请填写正确的手机号码"
                };
                return false;
            } else {
                this.errors = {};
                return true;
            }
        },
        handLogin(){
            this.errors={};
             this.$axios.post("/api/posts/sms_back", {
                 phone:this.phone,
                 code:this.verifyCode
             })
             .then(res=>{
                 console.log(res)
                 //检验成功
                 localStorage.setItem("ele_login",true);
                 this.$router.push("/")
             })
             .catch(err=>{
                 this.errors={
                     code:err.response.data.msg
                 }
             })
        }


    }
}
</script>
<style scoped>
.login{
    height:100%;
    width:100%;
    padding:30px;
    box-sizing: border-box;
    text-align:center;
    background:#fff;
}
.logo{
    text-align: center;
}
.logo img{
    width:150px; 
}
.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>