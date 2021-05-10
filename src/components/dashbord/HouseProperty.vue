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
                :data="tableData"
                style="width: 100%"
                height="400">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="门牌号：">
                            <span>{{ props.row.houseCode }}</span>
                        </el-form-item>
                        <el-form-item label="面积：">
                            <span>{{ props.row.area }}</span>
                        </el-form-item>
                        <el-form-item label="居住类型：">
                            <span>{{ props.row.kind }}</span>
                        </el-form-item>
                        <el-form-item label="居住类型：">
                            <span>{{ props.row.kindParam }}</span>
                        </el-form-item>
                        <el-form-item label="入住时间：">
                            <span>{{ props.row.startTime }}</span>
                        </el-form-item>
                        <el-form-item label="结束时间：">
                            <span>{{ props.row.endTime }}</span>
                        </el-form-item>
                        <el-form-item label="业主编号：">
                            <span>{{ props.row.ownerId }}</span>
                        </el-form-item>
                        <el-form-item label="业主姓名：">
                            <span>{{ props.row.ownerName }}</span>
                        </el-form-item>
                        <el-form-item label="业主电话：">
                            <span>{{ props.row.ownerTel }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="楼号">
                <template slot-scope="scope">
                    <span >{{ scope.row.buildingName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="单元">
                <template slot-scope="scope">
                    <span >{{ scope.row.unit}} 单元</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="层数">
                <template slot-scope="scope">
                    <span >{{ scope.row.floor}}层</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="门牌号">
                <template slot-scope="scope">
                    <span >{{ scope.row.houseCode}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否居住"
                    width="100">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isLive"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="业主姓名">
                    <template slot-scope="scope">
                        <span >{{ scope.row.ownerName}}</span>
                    </template>
            </el-table-column>
            <el-table-column
                    label="房型介绍"
                    width="180">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogVisible = true">点击查看详情</el-button>
                    <el-dialog
                            title="提示"
                            :visible.sync="dialogVisible"
                            width="30%"
                            :before-close="handleClose">
                        <span><h2>{{ scope.row.description}}</h2></span><br/>
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
        <UpdateHouse v-if="showDialog"
                        ref="updateHouse"
                        :dialog-title="dialogTitle"
                        :item-info="tableItem"
                        :handel-type = 'handelType'
                        @closeDialog="closeDialog"></UpdateHouse>
    </div>
</template>

<script>
    import UpdateHouse from "./UpdateHouse";
    export default {
        name: "HouseProperty",
        components: {
          UpdateHouse
        },
        data() {
            return {
                buildList: [],
                dialogVisible: false,
                tableData: [], //数据

                //分页数据
                pageSize: 5,
                currentPage: 1,
                totalPage: 0,
                total: 0,

                //表单
                form: {
                    buildingName:'',
                    kind: '',
                    startTime: '',
                    endTime: '',
                    houseCode: '',
                    ownerName: '',
                    unit: '',
                },
                filterInfo: {
                    // 搜索字段
                    data: {
                        buildingName: null,
                        startTime: null,
                        endTime: null,
                        kind: null,
                        houseCode: null,
                        ownerName: null,
                        unit: null
                    },
                    // 条件配置项
                    fieldList: [
                        { label: '楼栋', type: 'input', value: 'buildingName' },
                        { label: '单元', type: 'input', value: 'unit' },
                        { label: '门牌号', type: 'input', value: 'houseCode' },
                        { label: '居住类型', type: 'select', value: 'kind', list: 'liveTypeList' },
                        { label: '业主姓名', type: 'input', value: 'ownerName' },
                        { label: '开始时间', type: 'date', value: 'startTime', dateType: 'datetime', clearable: true  },
                        { label: '结束时间', type: 'date', value: 'endTime', dateType: 'datetime', clearable: true  },
                    ]
                },
                // 下拉数据配置项
                listTypeInfo: {
                    liveTypeList: [
                        { id: 0, name: 'NULL' },
                        { id: 1, name: 'BUY' },
                        { id: 2, name: 'RENT' }
                    ]
                },
                handelType: null, //操作的类型 true更新 false新增
                showDialog: false, //更改组件的显示
                dialogTitle: '', //弹窗的title
                tableItem: { //用来更新 新增
                    id: "",
                    buildingId: "",
                    buildingName: "",
                    unit: "",
                    floor: "",
                    houseCode: "",
                    isLive: "",
                    area: "",
                    ownerId: "",
                    ownerName: "",
                    ownerTel: "",
                    kind: "",
                    kindParam: "",
                    startTime: "",
                    endTime: "",
                },
            };
        },
        methods: {
            //搜索
            handleFilter (row) {
                //遍历数组
                let kindType = this.listTypeInfo.liveTypeList.map((currentValue) => {
                    if (currentValue.id == row.kind){
                        return currentValue.name
                    }
                })
                this.form.buildingName = row.buildingName;
                this.form.startTime = row.startTime;
                this.form.endTime = row.endTime;
                this.form.kind = kindType[row.kind];
                this.form.houseCode = row.houseCode;
                this.form.ownerName = row.ownerName;
                this.form.unit = row.unit;
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
                this.$http.post('/house/search',
                    {
                        currentPage: that.currentPage+"",
                        pageSize: that.pageSize+"",
                        startTime: that.form.startTime,
                        endTime: that.form.endTime,
                        buildingName: that.form.buildingName,
                        kind: that.form.kind,
                        houseCode: that.form.houseCode,
                        ownerName: that.form.ownerName,
                        unit: that.form.unit,
                    }).then( res => {
                    if(res.errorCode == 200){
                        that.tableData = res.data
                        that.totalPage = res.totalPages
                        that.total = res.total
                        if(res.data.length <=0){
                            that.$message({
                                showClose: true,
                                message: '查询结果为空，请重试！',
                                offset: 66,
                                type: "error"
                            });

                        }
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
                const confirmResult = await this.$confirm('此操作将永久删除该房信息, 是否继续?', '提示', {
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
                this.$http.post('/house/delete',{
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
                this.handelType = false;
                this.$nextTick(() => {
                    this.$refs["updateHouse"].showDialog = true;
                });
            },
            handleEdit(row){
                this.showDialog = true
                this.tableItem = row;
                this.dialogTitle = "编辑";
                this.handelType = true;
                this.$nextTick(() => {
                    this.$refs["updateHouse"].showDialog = true;
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
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
