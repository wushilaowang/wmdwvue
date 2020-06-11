<template>
    <div>
        <Header/>
        <Content/>
        <router-view name="panelContent"></router-view>
    </div>
</template>

<script>
import Header from './Header/Header'
import Content from './Content/Content'
export default {
    name: "Home",
    components: {
        Header,
        Content
    }
}
</script>

<style scoped>

</style>