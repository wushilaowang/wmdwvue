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
import {compare} from '../../../../utils/util'
import Bus from '../../../../utils/bus';
import {requestNoParam} from "../../../../network/login";
import Store from "../../../../store/index";
export default {
    name: "LeftMenu",
    data() {
        return {
            userName: '',
            loginNum: 1,
            headImg: '',
            treeData: []
        }
    },
    // computed: {
    //     realName() {
    //         return eval("("+Store.state.userInfo+")")
    //     }
    // },
    methods: {
        //菜单节点点击
        handleNodeClick(e) {
            if(e.menuUrl) {
                console.log(e.menuUrl)
                Bus.$emit("menuClick", e)
            }
            
        },
        test() {
            const that = this;
            const realName = eval("("+Store.state.userInfo+")");
            this.userName = realName.realName;
            //登录人数
            requestNoParam("/user/loginNum").then(res => {
                that.loginNum = res.data.data
            })
            //头像
            requestNoParam('/user/headImg/current').then(res => {
                if(!res.data.data) {
                    that.headImg = require("@/assets/image/userPhoto.png");
                }else {
                    that.headImg = res.data.data
                }
            })
            //菜单
            requestNoParam('/menu').then(res => {
                console.log(eval("("+Store.state.userInfo+")"))
                const userInfo = eval("("+Store.state.userInfo+")");
                const userMenuId = userInfo.perms.menuIds;
                const userMenuArr = []
                res.data.data.map(item => {
                    userMenuId.map(item2 => {
                        if(item.sysMenuId == item2) {
                            userMenuArr.push(item)
                        }
                    })
                })
                console.log(userMenuArr)
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
                                    menuUrl: item2.menuUrl,
                                    sysId: item2.sysMenuId,
                                    sort: item2.sortIdx
                                }

                                childrenArr.sort(compare('sort'))
                                childrenArr.push(children)
                            }
                        })
                        node["children"] = childrenArr
                        treeArr.push(node)
                    }
                })
                console.log(treeArr)
                that.treeData = treeArr;

                //用户操作权限
                const userFunctionArr = [];
                userMenuArr.map(item => {
                    if(item.menuType == 'FUNCTION') {
                        userFunctionArr.push(item)
                    }
                })
                Store.commit('mutationsSetUserFunctionPerm', userFunctionArr)
                console.log(userFunctionArr)
                
                //所有操作权限
                const allFunctionArr = [];
                res.data.data.map(item => {
                    if(item.menuType == 'FUNCTION') {
                        allFunctionArr.push(item)
                    }
                })
                Store.commit('mutationsSetAllFunctionPerm', allFunctionArr)
                console.log(allFunctionArr)
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