<template>
    <section v-if="login2" class="login2">
        <el-row class="loginForm">
            <el-col :span="12" :offset="12" style="border:1px solid #000;padding-top:6%;">
                <h1 style="text-align: center;font-size:40px;color:#333;border:1px solid #000;">登录</h1>
                <input class="input2" placeholder="请输入你的账号" v-model="ruleForm2.username" />
                <input class="input2" placeholder="请输入你的密码" type="password" v-model="ruleForm2.password" />
                <p style="display: flex;align-items: center;margin-top:30px;">
                    <span :class="checked ? 'checkBox' : 'box'" @click="check"></span>
                    <span style="padding-left:10px;" :class="checked ? 'mima' : ''">记住密码</span>
                </p>
                <div style="display: flex;justify-content: center;margin-top:40px;">
                    <div class="btn" @click="handleSubmit2"></div>
                </div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {Login} from '../../api/api'
    export default {
        name: "index",
        data(){
            return{
                ruleForm2: {
                    username: "",
                    password: "",
                    from: 'third'
                },
                checked: false,
                login:false,
                login2:true,
                login3:false
            }
        },
        methods: {
            handleSubmit2() {
                if(this.ruleForm2.username.trim() === ''){
                    this.$message.warning('账号不能为空')
                }else if(this.ruleForm2.password.trim() === ''){
                    this.$message.warning('密码不能为空')
                }else{

                    let loginParams = {
                        username: this.ruleForm2.username.trim(),
                        password: this.ruleForm2.password.trim(),
                        from:'third'
                    };
                    // Login(loginParams).then(() => {
                    //
                    // })
                    // requestLogin(loginParams).then(res => {
                    //     let user = res.data.data;
                    //     if (res.data.code !== 0) {
                    //         this.$message.error(msg)
                    //     } else {
                    //         window.localStorage.setItem("user", JSON.stringify(user));
                    //         this.$router.push({path: "/management/Data"});
                    //     }
                    // })
                }
            },
            check(){
                this.checked = !this.checked
            }
        },
    }
</script>

<style scoped>
    .login2{
        height:100%;
        width:100%;
        background:url("../../assets/login_jzyf.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .loginForm{
        height:50%;
        width:50%;
        margin-top:1%;
        background:url("../../assets/loginForm_jzyf.png") no-repeat;
        background-size: 100% 100%;
        background-origin: border-box;
        border:1px solid #000;
    }
    .input2{
        outline: none;
        width:98%;
        line-height: 2rem;
        font-size:18px;
        border-top: none;
        border-right:none;
        border-left:none;
        border-bottom:1px solid #F0F0F0;
        padding:20px 0;
        color:#FF4B50
    }
    .btn{
        background:url("../../assets/loginBtn_jzyf.png") no-repeat;
        background-size: 100% 100%;
        width:50%;
        height:66px;
    }
    .box{
        display: inline-block;
        width:12px;
        height:12px;
        border:1px solid #000;
    }
    .checkBox{
        width:14px;
        height:14px;
        background: url("../../assets/check.png");
        background-size: 100% 100%;
    }
    .mima{
        color:#FF4B50
    }

    .hdl_login{
        height:100%;
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#ffffff;
    }
    .hdl_bg{
        background:url("../../assets/hdl_login.png") no-repeat;
        background-size:100% 100%;
        width:60%;
        height:80%;
        box-shadow: -5px -5px 15px #ececec;
    }
    .hdl_input{
        line-height: 36px;
        border-radius:4px;
        padding-left:2rem;
        outline: none;
        border:none;
        width:50%;
        background-color:#fef5eb;
        font-size:12px;
    }
    .hdl_input::placeholder{
        color:#C7C7C7;
        font-size:12px;
    }
    .hdl_loginBtn{
        display: block;
        background:url("../../assets/hdl_submit.png") no-repeat;
        background-size:100% 100%;
        height:5rem;
        width:50%;
    }
</style>
