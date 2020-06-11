<template>
    <div class="search-row">
        <div v-if="isShowSearch([8014])">标准名称:<input type="text"></div>         
        <div v-if="isShowSearch([1004])">单位全称:<input type="text"></div>         
        <div v-if="isShowSearch([2002, 1004])">标题:<input type="text"></div>         
    </div>
</template>

<script>
import Store from '../../../store/index'
export default {
    name: 'Search',
    data() {
        return {

        }
    },
    props: {
        menuUrl: Object
    },
    computed: {
        isShowSearch(arr) {
            console.log(this.menuUrl)
            return function(arr) {
                let flag = false;
                arr.map(item => {
                    if(item == this.menuUrl.name) {
                        flag = true
                    }
                })
                console.log(flag)
                return flag
            }
        }
    }
}
</script>

<style scoped>
    .search-row {
        display: flex;
    }
    .search-row div {
        flex: 1;
    }
</style>