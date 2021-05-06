<template>
    <el-row type="flex" justify="space-around" class="row-bg login">
        <!--这里使用了elementUI的响应式设计-->
        <!--走马灯部分-->
        <el-col :xs="0" :sm="8" :md="12" :lg="15"
        ><div
                class="grid-content bg-purple"
                style="height:100%; width:100%; background-color: #333333"
        >
            <div class="block">
                <el-carousel height="calc(100vh - 60px)">
                    <el-carousel-item>
                        <img
                                src="/static/img/background_1.jpg"
                                style="min-width: 100%; min-height: 100%;"
                        />
                    </el-carousel-item>
                    <el-carousel-item>
                        <img
                                src="/static/img/background_2.jpg"
                                style="min-width: 100%; min-height: 100%;"
                        />
                    </el-carousel-item>

                </el-carousel>
            </div>
        </div>
        </el-col>
        <!--登录表单部分-->
        <el-col
                :xs="24"
                :sm="16"
                :md="12"
                :lg="9"
                id="login"
                style="padding: 1rem 0rem 5rem 0rem;"
        >
            <div
                    style="margin: 0;align-items:center;height: 100%;
        display: flex;justify-content:center;flex-direction:column;"
            >
                <el-form
                        style="margin: 0;width: 70%;"
                        labelPosition="top"
                        :model="loginForm"
                        errorCode-icon
                        :rules="rules"
                        ref="loginForm"
                        label-width="100px"
                >
                    <h1>用户登录</h1>
                    <el-form-item label="用户ID" prop="username">
                        <el-input
                                type="text"
                                v-model="loginForm.username"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                                show-password
                                type="password"
                                v-model="loginForm.password"
                                autocomplete="off"
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')"
                        >提交</el-button
                        >
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        { required: true, message: "请输入用户ID", trigger: "blur" },
                        { min: 1, max: 15, message: "超出长度限制", trigger: "blur" }
                    ],
                    password: [
                        {
                            min: 6,
                            max: 20,
                            message: "密码长度为 6-20 个字符",
                            trigger: "blur",
                            required: true
                        }
                    ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.loginForm.username = "";
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (!valid) {
                        console.log("error submit!!");
                    }else {
                        let that = this;
                        //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
                        let postform = {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        };
                        this.$http.loginPost('/login',postform)
                            .then(res => {
                                if (res.errorCode == 200){
                                    that.$store.commit(
                                        "changeLogin",
                                        JSON.stringify(res.jwtToken)
                                    );
                                    console.log("登陆成功")
                                    that.$message({
                                        showClose: true,
                                        message: "恭喜你，登录成功，正在跳转",
                                        offset: 66,
                                        type: "success"
                                    });
                                    //登录成功后跳转
                                    that.$router.push("/dashboard/community");
                                } else if(res.errorCode == 2003){
                                    that.$message({
                                        showClose: true,
                                        message: "登录失败，用户名或密码错误",
                                        offset: 70,
                                        type: "error"
                                    });
                                    that.loginForm.password = ''
                                    console.log("登录失败：", res.errorCode);
                                }
                            }).catch( err => {
                                let that = this
                                console.log("登录失败：", err);
                                that.$message({
                                    showClose: true,
                                    message: "警告哦，登录失败,错误原因：" + err,
                                    offset: 70,
                                    type: "warning"
                                });
                            //清空表单
                            that.resetForm("loginForm");
                            })
                        console.log("submit!");
                    }
                });
            }
        }
    }
</script>

<style scoped>
.login {
    overflow-y: hidden;
    padding-bottom: 0px;
    margin-bottom: 0px;
   /* height: calc(100vh - 60px);*/
    width: 100%;
}
.login .el-form-item {
    margin-bottom: 15px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
<style>
    .login .el-form-item .el-form-item__label {
        padding: 0px !important;
    }
</style>
