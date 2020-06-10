<template>
    <div class="panel-container">
        <Crumbs/>
        <div class="panel-content">
            <Search/>
            <ButtonList/>
            <Table/>
        </div>
    </div>
</template>

<script>
import Crumbs from './Crumbs';
import Search from '../../../../components/common/search/Search';
import ButtonList from '../../../../components/common/ButtonList/ButtonList';
import Table from '../../../../components/common/table/Table';
export default {
    name: "Panel",
    components: {
        Crumbs,
        Search,
        ButtonList,
        Table
    }
}
</script>

<style scoped>
    .panel-container {
        height: 85vh;
        margin-left: 10px;
    }
    .panel-content {
        height: 75vh;
        /* background-color: white; */
        border: 1px solid white;
        border-radius: 10px;
    }
</style>