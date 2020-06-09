<template>
    <div class="crumbs-container">
        <ul>
            <li v-for="(item, index) in tabs" :key="index">
                <div class="tab-item">{{item.title}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Crumbs",
    data() {
        return {
            chooseIndex: 1,
            tabs: [{title: '系统首页', name: 1, closable: false}]
        }
    },
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
        height: 5%;
        margin-bottom: 10px;
        /* background-color: white; */
        border: solid white 1px;
        border-radius: 7px;
        font-size: 12px;
    }

    .tab-item {
        width: 90px;
    }
</style>