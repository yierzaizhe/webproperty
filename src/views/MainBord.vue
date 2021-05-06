<template>
<div>
    <el-container style="height:100%; border: 0px solid #eee ">
        <SideBar></SideBar>
            <el-container>
                <dash-content></dash-content>
            </el-container>
    </el-container>


</div>
</template>

<script>
    import Event from "../util/public"
    import SideBar from "../components/SideBar";
    const DashContent = ()=> import("../components/DashContent")
    export default {
        name: "MainBord",
        components: {
            DashContent,
            SideBar
        },
        data() {
            return {
            };
        },
        computed: {},
        methods: {
        },
        mounted() {
        },
        watch: {
        }
    };
</script>

<style scoped>

</style>
