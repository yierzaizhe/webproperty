<template>
    <div style="margin-left: 20px">
        <div style="margin-top: 20px">
            <el-row>
                <el-button icon="el-icon-plus" type="primary">新增</el-button>
                <el-button icon="el-icon-plus" type="success">修改</el-button>
                <el-button icon="el-icon-plus" type="danger">删除</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </el-row>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
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
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "Building",
        data() {
            return {
                dialogVisible: false,
                tableData: [], //数据
                timeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)], //时间范围
                input: '',
                multipleSelection: [], //选择框

                //分页数据
                pageSize: 5,
                currentPage: 1,
                totalPage: 0,
                total: 0,

                //表单
                form: {
                    name:'',
                    date: '',
                    startTime: '',
                    endTime: ''
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 选择 与 取消选择
            toggleSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(page){
                this.currentPage = page //点击的时候把拿到的页码 赋值给组件
                this.getList()
            },
            getList() {
                let that = this;
                that.$http.post('/building/getAll')
                    .then(res => {
                        if (res.errorCode == '200'){
                            that.tableData = res.data
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
            this.getList();
        }
    }
</script>

<style scoped>

</style>
