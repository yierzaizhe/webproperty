<template>
        <el-aside style="width: 130px;" >
            <!--<el-menu
                    class="flex-container"
                    router
                    :default-openeds="[]"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="width: 160px; position: fixed; z-index:9; height: 100%; padding-top: 5px;"
            >
                <el-menu-item index="community">
                    <i class="el-icon-s-data"></i>
                    小区管理
                </el-menu-item>
                <el-menu-item index="">
                    <i class="el-icon-s-data"></i>
                    房产信息
                    <el-menu-item-group>
                        <el-menu-item index="houseProperty">服务项目</el-menu-item>
                    </el-menu-item-group>
                </el-menu-item>

                &lt;!&ndash;<el-submenu index="2" >
                    <template slot="title"
                    ><i class="el-icon-s-open"></i> 物业服务</template
                    >
                    <el-menu-item-group>
                        <template slot="title">service</template>
                        <el-menu-item index="servicemenu">服务项目</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <template slot="title">payment</template>
                        <el-menu-item index="payservice">用户扣缴</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>&ndash;&gt;

            </el-menu>-->
            <el-menu
                    router
                    default-active="1"
                    class="el-menu-vertical-demo"
                    :unique-opend=true
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    style="width: 145px; position: fixed; height: 100vh; padding-top: 5px;min-width: 145px;
                    overflow: scroll">
                <el-menu-item index="show">
                    <i class="el-icon-s-data"></i>
                    控制台
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>房产信息</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">房产</template>
                        <el-menu-item index="building">楼栋详情</el-menu-item>
                        <el-menu-item index="houseProperty">房屋信息</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group >
                        <template slot="title">居住</template>
                        <el-menu-item index="houseLive">居住详情</el-menu-item>

                    </el-menu-item-group>
                    <!--<el-submenu index="1-4">
                        <template slot="title">一号楼</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>-->
                </el-submenu>
                <el-menu-item index="owner">
                    <i class="el-icon-menu"></i>
                    <span slot="title">客户信息</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>车辆管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="parking">车位管理</el-menu-item>
                        <el-menu-item index="parkingUse">车位使用</el-menu-item>
                        <el-menu-item index="parkingLog">收费流水</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item  >
                    <i class="el-icon-document"></i>
                    <span slot="title">车辆管理</span>
                </el-menu-item>
                <el-menu-item >
                    <i class="el-icon-setting"></i>
                    <span slot="title">采购库存</span>
                </el-menu-item>
                <el-menu-item disabled>
                    <i class="el-icon-setting"></i>
                    <span slot="title">开发中~~</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

</template>

<script>
    export default {
        name: "SideBar",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
.el-menu-item{
    min-width: 145px
}
::-webkit-scrollbar {
    width: 0;    height: 0;
}
</style>
