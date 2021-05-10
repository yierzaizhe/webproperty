<template>
    <div style="margin-left: 20px">
        <div>
            <el-row>
                <el-button icon="el-icon-plus" type="primary" @click="addItem">新增</el-button>
            </el-row>
        </div>
        <el-filter
                :data="filterInfo.data"
                :field-list="filterInfo.fieldList"
                @handleFilter="handleFilter"
                @handleReset="handleReset"
                @handleEvent="handleEvent"
        />
        <div style="margin-top: 15px"></div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;"
        >
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="完工日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ (scope.row.createTime)}}</span>

                </template>
            </el-table-column>
            <el-table-column
                    label="楼号"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="单元数"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.totalUnit}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="层数"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.totalLevel}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="居住情况"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.existHouseholds}}/{{ scope.row.totalHouseholds}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    width="180">
                <template slot-scope="scope">
                    <!--<span style="margin-left: 10px">{{ scope.row.description}}</span>-->
                    <el-button type="text" @click="dialogVisible = true">点击查看详情</el-button>
                    <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                        <span>{{ scope.row.description}}</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click.native.prevent="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page=currentPage
                    :page-size=pageSize
                    layout="total, prev, pager, next, jumper"
                    :total=total>
            </el-pagination>
        </div>
        <UpdateBuilding v-if="showDialog"
                        ref="updateBuilding"
                        :dialog-title="dialogTitle"
                        :item-info="tableItem"
                        @closeDialog="closeDialog"></UpdateBuilding>
    </div>
</template>

<script>
    import UpdateBuilding from "./UpdateBuilding";
    export default {
        name: "Building",
        components: {
          UpdateBuilding
        },
        data() {
            return {
                dialogVisible: false,
                tableData: [], //数据
                timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)], //时间范围
                input: '',
                multipleSelection: [], //选择框

                //分页数据
                pageSize: 6,
                currentPage: 1,
                totalPage: 0,
                total: 0,

                //表单
                form: {
                    name:'',
                    date: '',
                    startTime: '',
                    endTime: ''
                },
                filterInfo: {
                    // 搜索字段
                    data: {
                        name: null,
                        startTime: null,
                        endTime: null,
                    },
                    // 条件配置项
                    fieldList: [
                        { label: '名称', type: 'input', value: 'name' },
                        { label: '开始时间', type: 'date', value: 'startTime', dateType: 'datetime', clearable: true  },
                        { label: '结束时间', type: 'date', value: 'endTime', dateType: 'datetime', clearable: true  },

                    ]
                },
                showDialog: false, //更改组件的显示
                dialogTitle: '', //弹窗的title
                tableItem: { //用来更新 新增
                    id: "",
                    name: "",
                    totalUnit: "",
                    totalLevel: "",
                    existHouseholds: "",
                    totalHouseholds: "",
                    description: "",
                    createTime: "",
                },
            }
        },
        methods: {
            //搜索
            /**搜索 */
            handleFilter (row) {
                this.form.name = row.name;
                this.form.startTime = row.startTime;
                this.form.endTime = row.endTime;
                this.getList()
            },
            /**重置 */
            handleReset (row) {},
            /**焦点失去事件 */
            handleEvent (row) {},
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleCurrentChange(page){
                this.currentPage = page //点击的时候把拿到的页码 赋值给组件
                this.getList()
            },
            //查找
            getList(){
                let that = this
                this.$http.post('/building/search',
                    {
                        currentPage: that.currentPage+"",
                        pageSize: that.pageSize+"",
                        startTime: that.form.startTime,
                        endTime: that.form.endTime,
                        name: that.form.name
                    }).then( res => {
                    if(res.errorCode == 200){
                        that.tableData = res.data
                        that.totalPage = res.totalPages
                        that.total = res.total
                    }else {
                        that.$message({
                            showClose: true,
                            message: res.errorMsg,
                            offset: 66,
                            type: "error"
                        });
                    }
                }).catch( err => {
                    that.$router.push('/dashboard/error')
                    console.log(err)
                    that.$message({
                        showClose: true,
                        message: err.errorMsg,
                        offset: 66,
                        type: "error"
                    });
                })
            },
            async handleDelete(index,row){
                const confirmResult = await this.$confirm('此操作将永久删除该楼信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)
                /*如果用户确认打印confirm,如果用户取消显示cancel*/
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除!')
                }
                // console.log('确认了删除')
                let that = this
                this.$http.post('/building/delete',{
                       id: row.id,
                    }).then( res => {
                    if(res.errorCode == 200){
                        that.currentPage = 1
                        that.getList()
                    }else {
                        that.$message({
                            showClose: true,
                            message: res.errorMsg,
                            offset: 66,
                            type: "error"
                        });
                    }
                }).catch( err => {
                    that.$router.push('/dashboard/error')
                    /*console.log(err)
                    that.$message({
                        showClose: true,
                        message: err.errorMsg,
                        offset: 66,
                        type: "error"
                    });*/
                })
            },
            // 添加操作
            addItem() {
                this.tableItem = {
                    id: "",
                    name: "",
                    totalUnit: "",
                    totalLevel: "",
                    existHouseholds: "",
                    totalHouseholds: "",
                    description: "",
                    createTime: "",
                };
                this.dialogTitle = "添加信息";
                this.showDialog = true;
                this.$nextTick(() => {
                    this.$refs["updateBuilding"].showDialog = true;
                });
            },
            handleEdit(row){
                this.showDialog = true
                this.tableItem = row;
                this.dialogTitle = "编辑";
                this.$nextTick(() => {
                    this.$refs["updateBuilding"].showDialog = true;
                });
            },
            // 关闭操作
            closeDialog(flag) {
                if (flag) {
                    // 重新刷新表格内容
                    this.getList();
                }
                this.showDialog = false;
            },
        },
        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>
