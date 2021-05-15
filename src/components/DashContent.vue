<template>
    <el-main>
        <div style="height: 30px"></div>
        <HouseProperty
                v-if="this.$route.path === '/dashboard/houseProperty'">
        </HouseProperty>
        <Building
                v-if="this.$route.path === '/dashboard/building'">
        </Building>
        <Error
                v-if="this.$route.path === '/dashboard/error'">
        </Error>
        <Owner
                v-if="this.$route.path === '/dashboard/owner'">
        </Owner>
        <HouseLive
                v-if="this.$route.path === '/dashboard/houseLive'">
        </HouseLive>
        <Parking
                v-if="this.$route.path === '/dashboard/parking'">
        </Parking>
        <ParkingUse
                v-if="this.$route.path === '/dashboard/parkingUse'">
        </ParkingUse>
        <ParkingLog
                v-if="this.$route.path === '/dashboard/parkingLog'">
        </ParkingLog>
    </el-main>
</template>

<script>
    import Community from "../components/dashbord/Conmmunity";
    import HouseProperty from "./dashbord/HouseProperty";
    import Building from "./dashbord/Building";
    import Error from "./dashbord/Error";
    import Owner from "./dashbord/Owner";
    import HouseLive from "./dashbord/HouseLive";
    import Parking from "./dashbord/Parking";
    import ParkingLog from "./dashbord/ParkingLog";
    import ParkingUse from "./dashbord/ParkingUse";
    export default {
        name: "DashContent",
        props: ["screenWidth", "screenHeight", "showdelete", "showeidt"],
        components: {
            Community,
            HouseProperty,
            Building,
            Error,
            Owner,
            HouseLive,
            Parking,
            ParkingLog,
            ParkingUse
        },
        created() {}
    }
</script>

<style scoped>

</style>
