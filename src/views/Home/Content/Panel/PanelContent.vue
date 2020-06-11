<template>
    <div class="panel-content">
        {{menuUrl}}
        <div></div>
        <div>
            <Search :searchList="searchList" :menuUrl="menuUrl"/>
            <ButtonList  :menuUrl="menuUrl"/>
            <Table/>
        </div>
    </div>  
</template>

<script>
import Search from '../../../../components/common/search/Search';
import ButtonList from '../../../../components/common/ButtonList/ButtonList';
import Table from '../../../../components/common/table/Table';
export default {
    name: 'PanelContent',
    components: {
        Search,
        ButtonList,
        Table
    },
    data(){
        return {
            searchList: []
        }
    },
    props: {
        menuUrl: {
            type: Object,
        }
    },
    methods: {
    },
    mounted() {
        const that = this;
        if(that.menuUrl == 'homePage') {

        }else if(that.menuUrl == 'DanWeiGuanLi') {
            that.searchList = ['base', ]
        }
    },
    created() {
    }
}
</script>

<style scoped>

    .panel-content {
        height: 75vh;
        width: 100%;
        /* background-color: white; */
        border: 1px solid white;
        border-radius: 10px;
    }
</style>