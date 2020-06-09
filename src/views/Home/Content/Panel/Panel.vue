<template>
    <div class="panel-container">
        <Crumbs/>
        <div class="panel-content"></div>
    </div>
</template>

<script>
import Crumbs from './Crumbs'
export default {
    name: "Panel",
    components: {
        Crumbs
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