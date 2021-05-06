<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <div style="width: 120px">
                    <el-input v-model="form.name" placeholder="请输入小区名"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button icon="el-icon-search" type="primary" @click="search">搜索</el-button>
                <el-button icon="el-icon-refresh" type="success">重置</el-button>
            </el-col>

        </el-row>
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
                    label="日期"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="小区名称"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="小区名称"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="小区名称"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name}}</span>
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
    //时间转换
    import moment from "moment"
    export default {
        name: "Conmmunity",
        data() {
            return {
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

            // 选择 与 取消选择
            toggleSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getList(){
                let that = this
                this.$http.post('/community/search',
                    {
                        currentPage: that.currentPage+"",
                        pageSize: that.pageSize+"",
                        startTime: that.form.startTime,
                        endTime: that.form.endTime,
                        name: that.form.name
                    }).then( res => {
                        if(res.errorCode){
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
                    console.log(err)
                    that.$message({
                        showClose: true,
                        message: err.errorMsg,
                        offset: 66,
                        type: "error"
                    });
                })
            },
            handleCurrentChange(page){
                this.currentPage = page //点击的时候把拿到的页码 赋值给组件
                this.getList()
            },
            search(){
                /*if (this.form.date != null || this.form.date != undefined){
                    this.form.startTime = moment(this.form.date[0]).format("YYYY-MM-DD hh:mm:ss")
                    this.form.endTime = moment(this.form.date[1]).format("YYYY-MM-DD hh:mm:ss")
                }else {
                    this.form.startTime = null
                    this.form.endTime = null
                }*/
                this.getList()
            }
        },
        async created() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>
