<template>
    <div  id="t"  class="text-center">
        <div class="form-signin" v-show="!up" >
            <h1 class="h3 mb-6 font-weight-bold">please sign in</h1>
            <label for="inputAccount" class="sr-only">Account</label>
            <input type="text" id="inputAccount" class="form-control" placeholder="Account" v-model="SignIn.account" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="SignIn.password"  required autofocus>
            <hr>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <hr>
            <button class="btn btn-group-lg btn-primary btn-block bg-primary" type="submit" @click="url1()" >Log in</button>
            <button class="btn btn-group-lg btn-primary btn-block bg-secondary" type="button" @click="up=!up">Log up</button>
        </div>

        <div   v-show="up" class="form-signin" >
            <h1 class="h3 mb-6 font-weight-bold">please sign up</h1>
            <label for="upAccount" class="sr-only">Account</label>
            <input id="upAccount" class="form-control" v-model="SignUp.account" placeholder="Account" >
            <label for="upPassword" class="sr-only">Password</label>
            <input id="upPassword" type="password"  class="form-control" v-model="SignUp.password" placeholder="Password" required autofocus>
            <label for="upCPassword" class="sr-only">confirm_password</label>
            <input id="upCPassword" type="password" class="form-control" v-model="SignUp.confirm_password" placeholder="Confirm Password" required autofocus>
            <label for="upEmail" class="sr-only">E-mail</label>
            <input id="upEmail" type="email"  class="form-control" v-model="SignUp.email" placeholder="E-mail" required autofocus >
            <button class="btn btn-group-lg btn-primary btn-block" type="submit" @click="url2" >Log up</button>
            <button class="btn btn-group-lg btn-primary btn-block bg-secondary" type="button" @click="up=!up">Back</button>
        </div>
    </div>


</template>

<script>
    import {reqLogin,reqSignup} from '../api'
    export default {
        name: "Log",
        data() {
            return {
                up: false,
                SignUp: {
                    account: '',
                    password: '',
                    confirm_password: '',
                    email: '',
                },
                SignIn: {
                    account: '',
                    password: '',
                }
            }
        },
        methods: {

            url1() {

                reqLogin( {
                    "account": this.SignIn.account, "password": this.SignIn.password
                })
                    .then((res) => {
                        let num = res.id;
                        let isManager = false;
                        if (res.role == 'manager') isManager = true;
                        switch (num) {
                            case -1://forbid
                                this.$message({
                                    message: '用户已被禁用',
                                    type: 'error',
                                    duration: 1000,
                                    showClose: true
                                })
                                return false;
                            case -2://nobody
                                this.$message({
                                    message: '错误的用户名或密码',
                                    type: 'warning',
                                    duration: 1000,
                                    showClose: true
                                })
                                return false;
                            default: //allowed
                                this.$store.commit('Person/changeLogin', num);
                                this.$store.commit('Person/changeManager', isManager);
                                this.$store.commit('Person/signin',res);
                                this.$message({
                                    message: '登陆成功',
                                    type: 'success',
                                    duration: 1000,
                                    showClose: true
                                })
                                this.$router.push('/Home');
                        }
                    })
            },
            url2() {
                if (this.SignUp.password !== this.SignUp.confirm_password) {
                    this.$message({
                        message: '两次密码不相同',
                        type: 'warning',
                        duration: 1000,
                        showClose: true
                    })
                    return;
                }
                reqSignup({
                        "account": this.SignUp.account,
                        "allowed": 1,
                        "password": this.SignUp.password,
                        "role": "custom",
                        "id": 0,
                    }
                ).then((res) => {
                    console.log("signUp"+res)
                    if (res) {
                        this.$store.commit('Person/changeLogin', res);
                        this.$store.commit('Person/changeManager',false);
                        this.$store.commit('Person/signin',{
                            "account": this.SignUp.account,
                            "allowed": 1,
                            "password": "",
                            "role": "custom",
                            "id": res,
                        })
                        this.$router.push('/Home');
                    } else {
                        this.$message({
                            message: '用户名已存在',
                            type: 'warning',
                            duration: 1000,
                            showClose: true
                        })
                        return;
                    }
                })
            },
        }
    }


</script>

<style scoped>
    html,
    template {
        height: 100%;
    }

    template {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 450px;
        padding: 15px;
        margin: auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 10px;
    }
</style>