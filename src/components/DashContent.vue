<template>
    <el-main>
        <div style="height: 30px"></div>
        <Community
                v-if="this.$route.path === '/dashboard/community'">
        </Community>
        <HouseProperty
                v-if="this.$route.path === '/dashboard/houseProperty'">
        </HouseProperty>
        <Building
                v-if="this.$route.path === '/dashboard/building'">
        </Building>
        <Error
                v-if="this.$route.path === '/dashboard/error'">
        </Error>
    </el-main>
</template>

<script>
    import Community from "../components/dashbord/Conmmunity";
    import HouseProperty from "./dashbord/HouseProperty";
    import Building from "./dashbord/Building";
    import Error from "./dashbord/Error";
    export default {
        name: "DashContent",
        props: ["screenWidth", "screenHeight", "showdelete", "showeidt"],
        components: {
            Community,
            HouseProperty,
            Building,
            Error
        },
        created() {}
    }
</script>

<style scoped>

</style>
