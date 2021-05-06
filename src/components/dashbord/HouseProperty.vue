<template>
    <div>
<!--
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"    >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>BUILDING</span>
                        </template>
                        <el-submenu index="1-1">
                            <template slot="title">一号楼</template>
                            <el-menu-item index="1-1-1">一单元</el-menu-item>
                            <el-menu-item index="1-1-2">二单元</el-menu-item>
                            <el-menu-item index="1-1-3">三单元</el-menu-item>
                        </el-submenu>
                        <div v-for="(building,key) in buildList">
                            <el-submenu>
                                <template slot="title">{{building.name}}</template>
                                <el-menu-item >一单元</el-menu-item>
                                <el-menu-item >二单元</el-menu-item>
                                <el-menu-item >三单元</el-menu-item>
                            </el-submenu>
                        </div>

                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>-->
    </div>
</template>

<script>
    export default {
        name: "HouseProperty",
        data() {
            return {
                buildList: [],
            };
        },
        methods: {
            //处理导航懒得折叠
            handleOpen(key, keyPath) {},
            handleClose(key, keyPath) {},
            getBuildList() {
                let that = this;
                that.$http.post('/building/getAll')
                    .then(res => {
                        if (res.errorCode == '200'){
                            that.buildList = res.data
                        }else{
                            that.$router.push('/dashboard/error')
                        }
                    }).catch(err => {

                        that.$message({
                            showClose: true,
                            message: err.errorMsg,
                            offset: 66,
                            type: "error"
                        });
                        that.$router.push('/dashboard/error')
                })
            }
        },
        created() {
            this.getBuildList();
        }
    }

</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
