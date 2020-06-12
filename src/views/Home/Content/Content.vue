<template>
    <div class="content-container">
        <LeftMenu class="left"/>
        <Panel class="right"/>
    </div>
</template>

<script>
import LeftMenu from './LeftMenu/LeftMenu';
import Panel from './Panel/Panel'
export default {
    name: "Content",
    components: {
        LeftMenu,
        Panel
    }
}
</script>

<style scoped>
    .content-container {
        background-color: #d2e4f0;
        padding: 10px;

        height: 91vh;
        display: flex;
    }
    .left {
        flex: .1;
    }
    .right {
        flex: .9;
    }
</style>