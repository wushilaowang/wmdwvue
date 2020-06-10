<template>
    <div class="login">
        <div class="login-header"></div>
        <div class="login-body">
            <div class="title">
                    <img class="title-image" src="../assets/image/login-logo.png"/>
                
                <span class="sys-title">{{loginPageText.systemName}}</span>
            </div>
            <div class="login-under-title">
                <div class="login-swiper">
                    <Swiper>
                        <SwiperItem v-for="(item, index) in loginImage" :key="index">
                            <div class="swiper-image"><img :src="item.url"/> </div>
                        </SwiperItem>
                    </Swiper>
                </div>
                <div class="login-form">
                    <div>
                        <label for="username">用户名：</label>
                    </div>
                    <div class="user-input">
                        <input autocomplete="off" id="username" type="text" v-model="loginForm.username">
                    </div>
                    <div>
                        <label for="password">密码：</label>
                    </div>
                    <div class="pass-input">
                        <input id="password" type="password" v-model="loginForm.password">
                    </div>
                    <div class="remember">
                        <input type="checkbox"/>记住账号
                    </div>
                    <div class="register">单位注册</div>
                    <div>
                        <el-button class="login-button" type="primary" size="medium" @click="handleLogin">登陆</el-button>
                    </div>
                </div>
            </div>

        </div>
        <div class="login-bottom">
            <div>系统主管单位:{{loginPageText.SystemAdminUnit}}</div>
            <div>{{loginPageText.companyInfo}}</div>
            <div>技术支持联系电话：{{loginPageText.contactTel}}</div>
        </div>
    </div>
</template>

<script>
import {config, imageInfo, requestNoParam, login} from '../network/login'
import Store from '../store/index'
import {Swiper, SwiperItem} from '../components/common/swiper/index'
export default {
    name: 'Login',
    components: {
        Swiper,
        SwiperItem
    },
    data() {
        return {
            loginPageText: {
                systemName: "",
                contactTel: "",
                companyInfo: "",
                SystemAdminUnit: ""
            },
            loginImage: [],
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
       
    },
    mounted() {
        
    },
    methods: {
        //登陆按钮
        handleLogin() {
            const that = this
            const h = that.$$createElement
            if(that.loginForm.username == '' || that.loginForm.password == '') {
                this.$notify({
                    title: "提示",
                    message: "账号或密码不能为空",
                    duration: 2000
                })
            }else {
                const param = {
                    username: that.loginForm.username,
                    password: that.loginForm.password
                }
                login(param).then(res => {
                    console.log(res)
                    if(res.status == 1003) {
                        this.$notify({
                            title: "提示",
                            message: res.message
                        })
                    }else if(res.status == 1004) {
                        this.$notify({
                            title: "提示",
                            message: "密码错误"
                        })
                    }else if(res.status == 200){
                        Store.commit("mutationsSetUserInfo", res.data)
                        that.$router.replace('/home')
                    }
                })
            }
        }
    },
    created() {
        const that = this;
        Promise.all([requestNoParam('/config'), requestNoParam('/imginfo'), requestNoParam('/sys-param'), requestNoParam('/district'), ]).then(res => {
            //加载配置参数
            const result1 = res[0].data
            Store.commit('mutationsSetSysConfig', result1)
            console.log(Store.state)
            result1.map(item => {
                if(item.cfgkey == "systemName") {
                    that.loginPageText.systemName = item.description
                }else if(item.cfgkey == "contactTel") {
                    that.loginPageText.contactTel = item.description
                }else if(item.cfgkey == "companyInfo") {
                    that.loginPageText.companyInfo = item.description
                }else if(item.cfgkey == "SystemAdminUnit") {
                    that.loginPageText.SystemAdminUnit = item.description
                }
            })
            //加载轮播图
            const result2 = [];
            res[1].data.map(item => {
                if(item.position == 1 && item.enable == 1) {
                    result2.push(item)
                }
            })
            that.loginImage = result2;
            //加载字典
            const result3 = res[2].data;
            Store.commit('mutationsSetSysParam', result3);
            //加载区域
            const result4 = res[3].data;
            Store.commit('mutationsSetDistrict', result4);
        })
        console.log(Store.state)
    }
}
</script>

<style scoped>
    .login {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .login-header:before {
        content: "";
        width: 100%;
        padding-top: 2%;
        background-color: #267bb9;
        display: block;
    }
    .login-header {
        flex: .2
    }
    
    .login-body {
        flex: .5;
        width: 1200px;
        margin: 0 auto;
    }
    .title {
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .title img {
        width: 50px;
        height: 50px;
    }
    .login-under-title {
        display: flex;
    }
    .login-swiper {
        flex: .7;
    }
    .swiper-image {
        height: 400px;
    }
    .login-form {
        flex: .3;
        border: solid 1px #d3d3d3;
        margin-left: 30px;
        border-radius: 15px;
        padding: 20px 0 0 20px;
        font-size: 14px;
    }
    .login-form div {
        padding: 5px 0;
    }
    .login-form input[type="text"], input[type="password"] {
        padding-left: 10px;
        width: 90%;
        height: 30px;
        border: none;
        outline: none;
    }
    .pass-input, .user-input {
        margin: 5px 0;
        border: #d3d3d3 solid 1px;
        border-radius: 4px;
        width: 90%
    }
    input:focus {
        outline: none;
    }
    .register, .remember {
        margin: 10px 0;
    }
    .login-button {
        width: 90%;
        font-size: 20px;
    }
    .login-bottom {
        text-align: center;
        width: 100%;
        flex: .3;
        position: absolute;
        bottom: 7%;
    }

    
</style>