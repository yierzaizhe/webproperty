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
                :list-type-info="listTypeInfo"
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
                    label="门牌号">
                <template slot-scope="scope">
                    <span >{{ scope.row.houseCode}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="居住类型">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.kind"
                            active-color="#ff4949"
                            inactive-color="#13ce66"
                            active-text="租用"
                            inactive-text="购买"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="具体类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.kindParam}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="金额"
                    >
                <template slot-scope="scope">
                    <span>{{ scope.row.houseFee}}</span>
                </template>
            </el-table-column>
            <el-table-column
                                label="入住时间"
                                width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ (scope.row.startTime)}}</span>
                            </template>
                        </el-table-column>
            <el-table-column
                    label="结束时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ (scope.row.endTime)}}</span>
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
        <UpdateHouseLive v-if="showDialog"
                        ref="updateHouseLive"
                        :dialog-title="dialogTitle"
                        :item-info="tableItem"
                        @closeDialog="closeDialog"></UpdateHouseLive>
    </div>
</template>

<script>
    import UpdateHouseLive from "./UpdateHouseLive";
    export default {
        name: "HouseLive",
        components: {
            UpdateHouseLive
        },
        data() {
            return {
                dialogVisible: false,
                tableData: [], //数据

                //分页数据
                pageSize: 6,
                currentPage: 1,
                totalPage: 0,
                total: 0,

                //表单
                form: {
                    houseCode: '',
                    kind: '',
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
                        { label: '门牌号', type: 'input', value: 'houseCode' },
                        { label: '居住类型', type: 'select', value: 'kind', list: 'kindList' },
                        { label: '开始时间', type: 'date', value: 'startTime', dateType: 'datetime', clearable: true  },
                        { label: '结束时间', type: 'date', value: 'endTime', dateType: 'datetime', clearable: true  },

                    ]
                },
                // 下拉数据配置项
                listTypeInfo: {
                    kindList: [
                        { id: 1, name: '租用' ,kind: '1' },
                        { id: 2, name: '购买' ,kind: '0'},
                    ]
                },
                showDialog: false, //更改组件的显示
                handelType: null,
                dialogTitle: '', //弹窗的title
                tableItem: { //用来更新 新增
                    id: "",
                    houseCode: "",
                    kind: "",
                    houseFee: "",
                    kindParam: "",
                    startTime: "",
                    endTime: "",
                },
            }
        },
        methods: {
            //搜索
            /**搜索 */
            handleFilter (row) {
                if (row.kind == '1'){
                    this.form.kind = '1'
                }else if (row.kind == '2'){
                    this.form.kind = '0'
                }else {
                    this.form.kind = null
                }
                this.form.houseCode = row.houseCode;
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
                this.$http.post('/house-live/search',
                    {
                        currentPage: that.currentPage+"",
                        pageSize: that.pageSize+"",
                        startTime: that.form.startTime,
                        endTime: that.form.endTime,
                        name: that.form.name,
                        kind: that.form.kind
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
                const confirmResult = await this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
                this.$http.post('/house-live/delete',{
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
                    houseCode: "",
                    kind: true,
                    houseFee: "",
                    kindParam: "",
                    startTime: "",
                    endTime: "",
                };
                this.dialogTitle = "添加信息";
                this.showDialog = true;
                this.handelType = false;
                this.$nextTick(() => {
                    this.$refs["updateHouseLive"].showDialog = true;
                });
            },
            handleEdit(row){
                this.showDialog = true
                this.tableItem = row;
                this.dialogTitle = "编辑";
                this.handelType = true;
                this.$nextTick(() => {
                    this.$refs["updateHouseLive"].showDialog = true;
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
