<template>
    <div class="header-container">
        <div class="left">
            <img src="../../../assets/image/login-logo.png"/>
            <span>{{topTitle}}</span>
        </div>
        <div class="right">
            <div><span>全屏</span></div>
            <div><span>锁频</span></div>
            <div class="change-password"><span>个人信息</span></div>
            <div @click="handleExit"><span>退出</span></div>
        </div>
    </div>
</template>

<script>
import Store from '../../../store/index'
export default {
    name: "Header",
    data() {
        return {
            topTitle: "",
        }
    },
    methods: {
        handleExit() {
            this.$router.replace('/login')
        }
    },
    created() {
        const that = this;
        const sysConifg = eval("("+Store.state.sysConfig+")")
        console.log(Store.state)
        sysConifg.map(item => {
            if(item.cfgkey == "systemName") {
                that.topTitle = item.description
            }
        })
    }
}
</script>

<style scoped>
    .header-container {
        display: flex;
        background-color: #267bb9;
        height: 7vh;
        width: 100%;
        color: white;
    }
    .left {
        flex: .8;
        font-size: 30px;
        margin: auto 0;
        border-bottom: solid 1px #267bb9;
    }
    .left img {
        width: 40px;
        height: 40px;
        margin: 0 10px -10px 10px;

    }
    .right {
        flex: .2;
        display: flex;
        text-align: center;
        margin: auto 0;
        font-size: 14px;
        min-width: 300px;
    }
    .right div {
        flex: .22;
    }
    .right .change-password {
        flex: .34
    }
    .right div span {
        width: 60%;
        display: inline-block;
        padding: 10px auto;
        line-height: 444%;
        border: 2px solid transparent;
    }
    .right span:hover {
        color: yellowgreen;
        border-bottom: solid 2px yellowgreen;
    }

</style>