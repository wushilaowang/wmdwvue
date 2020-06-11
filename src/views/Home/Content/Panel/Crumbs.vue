<template>
    <div>
        <div class="crumbs-container">
            <ul>
                <li v-for="(item, index) in tabs" :key="index">
                    <div :class="{active: chooseIndex == item.name, 'tab-item': true, 'last-tab': item.index == tabIndex}">
                        <span :class="{'menu-tab': true, 'first-tab': item.name == 1}" @click="handleTabChoose(item.name)">{{item.title}}</span>
                        <div class="close-outer"><span v-if="item.closable" class="tab-close iconfont icon-close" @click="handleClose(item.name)"></span></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-outer" v-for="(item, index) in tabs" :key="index">
            <PanelContent :menuUrl="item" :class="{'content-normal': true, 'content-active': item.name == chooseIndex}"/>
        </div>
    </div>
</template>

<script>
import Bus from '../../../../utils/bus'
import PanelContent from './PanelContent'
export default {
    name: "Crumbs",
    components: {
        PanelContent,
    },
    data() {
        return {
            chooseIndex: 1,
            tabs: [{title: '系统首页', name: 1, closable: false, index: 1, menuUrl: 'homePage'}],
            tabIndex: 1,
        }
    },
    beforeDestroy() {//移除bus中事件
        Bus.$off('menuClick')
    },
    methods: {
        //点击tab
        handleTabChoose(name) {
            this.chooseIndex = name;
            console.log(this.chooseIndex)
        },

        //关闭tab
        handleClose(name) {
            const that = this;
            const filterTabs = that.tabs.filter(item => {
                if(item.name != name) {
                    that.tabIndex = that.tabIndex -1;
                    return item
                }
            })
            for(let i = 0; i< that.tabs.length; i++) {
                if(that.tabs[i].name == name) {
                    that.chooseIndex = that.tabs[i-1].name;
                }
            }
            that.tabs = filterTabs
        }
    },
    mounted() {
        const that = this;
        //接受到菜单点击事件
        Bus.$on("menuClick", e =>{
            let tab = {
                title: e.label,
                name: e.sysId,
                closable: true,
                index: that.tabIndex + 1,
                menuUrl: e.menuUrl
            }
            let flag = true;
            that.tabs.map(item => {
                if(tab.name == item.name) {
                    flag = false;
                }
            })
            if(flag) {//没重复放入tabs
                that.tabs.push(tab);
                that.tabIndex = that.tabIndex + 1;
            }
            that.chooseIndex = e.sysId
            console.log(that.tabs)
        })
    }
}
</script>

<style scoped>
    ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
        float: left;

    }
    .crumbs-container {
        height: 30px;
        margin-bottom: 10px;
        /* background-color: white; */
        font-size: 12px;
    }

    .tab-item {
        width: 130px;
        height: 30px;
        text-align: center;
        background-color: white;
        display: flex;
    }
    .menu-tab {
        flex: .99;
        border-left: solid #b3b3b3 1px;
    }
    .first-tab {
        border: none;
    }
    .last-tab {
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
    }
    .close-outer {
        flex: .01;
        position: relative;
    }
    .tab-close {
        position: absolute;
        right: 8px;
        top: 8px;
    }
    .tab-item span {
        font-size: 10px;
        display: block;
        margin: auto 0;
    }

    .active {
        background-color: #1f7abb;
        color: white;
    }

    .content-outer {
        position: relative;
    }
    .content-normal {
        position: absolute;
        opacity: 0;
    }
    .content-active {
        opacity: 1;
    }
</style>