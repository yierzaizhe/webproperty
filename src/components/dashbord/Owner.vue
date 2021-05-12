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
                :data="tableData"
                style="width: 100%"
                height="400">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="身份证:">
                            <span>{{ props.row.idCard }}</span>
                        </el-form-item>
                        <el-form-item label="职业:">
                            <span>{{ props.row.profession }}</span>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <span>{{ props.row.remark }}</span>
                        </el-form-item>
                        <el-form-item label="入住时间:">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间:">
                            <span>{{ props.row.updateTime }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="门牌号">
                <template slot-scope="scope">
                    <span >{{ scope.row.houseCode}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名">
                <template slot-scope="scope">
                    <span >{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sex" width="120" label="性别" :formatter="sexFormat">
            </el-table-column>
            <el-table-column
                    label="联系方式">
                <template slot-scope="scope">
                    <span >{{ scope.row.telephone}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否户主"
                    width="100">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isMain"
                            disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="type" width="120" label="居住类型" :formatter="typeFormat"></el-table-column>
            <el-table-column label="操作" width="300">
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
        <UpdateOwner v-if="showDialog"
                        ref="updateOwner"
                       :handel-type = 'handelType'
                        :dialog-title="dialogTitle"
                        :item-info="tableItem"
                        @closeDialog="closeDialog"></UpdateOwner>
    </div>
</template>

<script>
    import UpdateOwner from "./UpdateOwner";
    export default {
        name: "Owner",
        components: {
          UpdateOwner
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
                    houseCode: '',
                    name:'',
                    date: '',
                    startTime: '',
                    endTime: ''
                },
                filterInfo: {
                    // 搜索字段
                    data: {
                        name: null,
                        houseCode: null,
                        startTime: null,
                        endTime: null,
                    },
                    // 条件配置项
                    fieldList: [
                        { label: '门牌号', type: 'input', value: 'houseCode' },
                        { label: '姓名', type: 'input', value: 'name' },
                        { label: '居住时间', type: 'date', value: 'startTime', dateType: 'datetime', clearable: true  },
                        { label: '结束时间', type: 'date', value: 'endTime', dateType: 'datetime', clearable: true  },

                    ]
                },
                showDialog: false, //更改组件的显示
                handelType: null,
                dialogTitle: '', //弹窗的title
                tableItem: { //用来更新 新增
                    id: "",
                    house_code: "",
                    name: "",
                    sex: "",
                    id_card: "",
                    telephone: "",
                    is_main: "",
                    type: "",
                    profession: "",
                    remark: "",
                    create_time: "",
                    update_time: "",
                    birthday: "",
                },
            }
        },
        methods: {
            sexFormat(row,column){
                if(row.sex == 1 ){
                    return '男'
                }else {
                    return '女'
                }
            },
            typeFormat(row,column){
                if(row.type == 1 ){
                    return '租住'
                }else {
                    return '购买'
                }
            },
            //搜索
            /**搜索 */
            handleFilter (row) {
                this.form.name = row.name;
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
                this.$http.post('/owner/search',
                    {
                        currentPage: that.currentPage+"",
                        pageSize: that.pageSize+"",
                        startTime: that.form.startTime,
                        endTime: that.form.endTime,
                        name: that.form.name,
                        houseCode: that.form.houseCode,
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
                this.$http.post('/owner/delete',{
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
                    houseCode: "",
                    name: "",
                    sex: true,
                    idCard: "",
                    telephone: "",
                    isMain: false,
                    type: false,
                    profession: "",
                    remark: "",
                    createTime: "",
                    updateTime: "",
                    birthday: "",
                };
                this.dialogTitle = "添加信息";
                this.handelType = false;
                this.showDialog = true;
                this.$nextTick(() => {
                    this.$refs["updateOwner"].showDialog = true;
                });
            },
            handleEdit(row){
                this.showDialog = true
                this.tableItem = row;
                this.handelType = true;
                this.dialogTitle = "编辑";
                this.$nextTick(() => {
                    this.$refs["updateOwner"].showDialog = true;
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
