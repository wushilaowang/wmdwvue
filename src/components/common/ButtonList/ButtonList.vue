<template>
    <div>
       <el-button v-if="isShowButton([{parent: 1008, self: 8034}])" @click="handleQuery">新增</el-button>
       <el-button v-if="isShowButton([{parent: 1004, self: 8021}])" @click="handleQuery">查询</el-button>
       <el-button v-if="isShowButton([{parent: 1004, self: 8025}])" @click="handleQuery">导出</el-button>
       <el-button v-if="isShowButton([{parent: 2002, self: 8082}])" @click="handleQuery">删除</el-button>
       <el-button @click="handleReset">重置</el-button>
       <el-button @click="handleClose">关闭</el-button>
       <el-button v-if="isShowButton([{parent: 2002, self: 8085}])" @click="handleQuery">审核拒绝</el-button>
       <el-button v-if="isShowButton([{parent: 2002, self: 8081}])" @click="handleReset">归档</el-button>
       

    </div>
</template>

<script>
import Store from '../../../store/index'
export default {
    name: 'ButtonList',
    props: {
        menuUrl: {
            type: Object,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        allFunctionPerm() {
            const unitFunctions = [];
            eval("("+Store.state.allFunctionPerm+")").map(item => {
                if(item.menuName.indexOf('单位') != -1) {
                    unitFunctions.push(item)
                }
            })
            console.log(unitFunctions)
            console.log(eval("("+Store.state.userFunctionPerm+")"))
        },
        //是否显示
        isShowButton(arr) {
            return function(arr) {
                let flag = false;
                arr.map(item => {
                    if(this.menuUrl.name == item.parent) {
                        eval("("+Store.state.userFunctionPerm+")").map(item2 => {
                            if(item2.sysMenuId == item.self) {
                                flag = true;
                            }
                        })
                    }
                    
                })
                return flag;
            }
        },
    },
    methods: {
        
        handleQuery() {
            console.log(3)
        },
        handleReset() {

        },
        handleClose() {

        },
    },
    created() {
        this.allFunctionPerm
    }
}
</script>

<style scoped>

</style>