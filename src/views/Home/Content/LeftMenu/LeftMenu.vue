<template>
    <div class="left-menu-container">
        <div class="menu-top">
            <div class="menu-top-left"><img :src="headImg"/></div>
            <div class="menu-top-right">
                <div>您好,{{userName}}</div>
                <div>当前在线<span> {{loginNum}} </span>人</div>
            </div>
        </div>
        <div class="break-line"></div>
        <div class="menu-bottom">
            <el-tree :data="treeData" @node-click="handleNodeClick"/>
        </div>
    </div>
</template>

<script>
import {requestNoParam} from "../../../../network/login"
import Store from "../../../../store/index";
export default {
    name: "LeftMenu",
    data() {
        return {
            userName: '',
            loginNum: 0,
            headImg: '',
            treeData: []
        }
    },
    methods: {
        //菜单节点点击
        handleNodeClick(e) {
            if(e.menuUrl) {
                console.log(e.menuUrl)
            }
            
        },
        test() {
            const that = this;
            const realName = eval("("+Store.state.userInfo+")");
            this.userName = realName.realName;
            //登录人数
            requestNoParam("/user/loginNum").then(res => {
                console.log(res)
                that.loginNum = res.data
            })
            //头像
            requestNoParam('/user/headImg/current').then(res => {
                console.log(res)
                if(!res.data) {
                    that.headImg = require("@/assets/image/userPhoto.png");
                }else {
                    that.headImg = res.data
                }
            })
            //菜单
            requestNoParam('/menu').then(res => {
                console.log(res)
                const userInfo = eval("("+Store.state.userInfo+")");
                console.log(userInfo.perms.menuIds)
                const userMenuId = userInfo.perms.menuIds;
                const userMenuArr = []
                res.data.map(item => {
                    userMenuId.map(item2 => {
                        if(item.sysMenuId == item2) {
                            userMenuArr.push(item)
                        }
                    })
                })
                const treeArr = [];
                userMenuArr.map(item => {
                    if(item.menuType == "NODE") {
                        const node = {}
                        node["label"] = item.menuName;
                        const childrenArr = [];
                        userMenuArr.map(item2 => {
                            if(item.sysMenuId == item2.sysMenuParent) {
                                const children = {
                                    label: item2.menuName,
                                    menuUrl: item2.menuUrl
                                }
                                childrenArr.push(children)
                            }
                        })
                        node["children"] = childrenArr
                        treeArr.push(node)
                    }
                })
                console.log(treeArr)
                that.treeData = treeArr;
                treeArr.map(res => [
                    console.log(res)
                ])
                console.log(userMenuArr)
            })
        }
    },
    created() {
        this.test()
    },
}
</script>

<style scoped>
    .left-menu-container {
        background-color: white;
        height: 80vh;
        width: 100%;
        border: 1px solid white;
        border-radius: 10px;
        min-width: 200px;
    }
    .menu-top {
        font-size: 14px;
        display: flex;
        margin: 10px;
    }
    .menu-top-left {
        flex: .25;
    }
    .menu-top-right {
        flex: .75;
        margin: auto 0;
    }
    .menu-top img {
        width: 40px;
        height: 40px;
    }
    .menu-top span {
        color: red;
    }

    .break-line {
        margin: 10px auto;
        width: 85%;
        border-bottom: 1px solid #d3d3d3;
    }

    .menu-bottom {
        margin: 0 auto;
    }
</style>