<template>
    <div class="panel-content">
        <div class="panel-content-container">
            {{menuUrl}}
            <div></div>
            <div class="content">
                <Search :searchList="searchList" :menuUrl="menuUrl"/>
                <ButtonList @query="handleQuery" :menuUrl="menuUrl"/>
                <Table ref="table" :menuUrl="menuUrl"/>
            </div>
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
        handleQuery(menuUrl) {
            this.$refs.table.queryUnit()
        }
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
        width: 100%;
        background-color: white;
        border: 1px solid white;
        border-radius: 10px;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .panel-content-container {
        height: 75vh;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
</style>