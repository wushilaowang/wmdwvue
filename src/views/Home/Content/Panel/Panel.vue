<template>
    <div class="panel-container">
        <Crumbs/>
    </div>
</template>

<script>
import Crumbs from './Crumbs';
export default {
    name: "Panel",
    components: {
        Crumbs,
    }
}
</script>

<style scoped>
    .panel-container {
        height: 85vh;
        margin-left: 10px;
    }
</style>