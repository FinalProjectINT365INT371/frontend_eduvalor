<template>
  <div>
    <div class="container d-none d-lg-flex d-xl-flex d-md-flex" id="container">
      <div class="form-container sign-up-container">
        <v-form action="#" @submit.prevent="submit" ref="form">
          <h1>สมัครสมาชิก</h1>
          <span class="body-1 pb-5">กรุณากรอกข้อมูลให้ครบทุกช่อง</span>
          <div class="text-field-area">
            <v-text-field
              type="text"
              regular
              v-model="username"
              :rules="usernameRule"
              placeholder="Username"
            />

            <v-text-field
              regular
              v-model="password"
              :rules="passwordRule"
              type="password"
              placeholder="Password"
            />

            <v-text-field
              v-model="email"
              :rules="emailRule"
              regular
              type="email"
              placeholder="Email"
            />

            <v-text-field
              regular
              v-model="displayName"
              :rules="displayNameRule"
              type="text"
              placeholder="Display Name"
            />

            <div class="d-flex justify-space-between" id="profileUpload">
              <div class="d-flex align-center justify-space-between">
                <p>รูปโปรไฟล์<span style="color: red">*</span></p>
                <v-file-input
                  v-model="image"
                  @change="Preview_image"
                  hide-input
                  :rules="imageRules"
                  truncate-length="15"
                ></v-file-input>
              </div>
              <v-avatar size="104"><v-img :src="url" /></v-avatar>
            </div>
          </div>
          <button @click="registAlert">Sign Up</button>
        </v-form>

        <v-snackbar v-model="snackbar">
          {{ snackbarRegistText }}

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </div>
      <div class="form-container sign-in-container">
        <v-form action="#" @submit.prevent="login" ref="form">
          <h1>เข้าสู่ระบบ</h1>
          <input type="text" placeholder="Username" v-model="usernameLogin" />
          <input
            type="password"
            placeholder="Password"
            v-model="passwordLogin"
          />
          <button>Log In</button>
          <!-- <span class="pt-12 text-md-body-1"
            >หรือล็อกอินด้วย Social Media
          </span>
          <div class="social-container">
            <a @click="goToFacebook" class="social">
              <v-icon color="#333333"> mdi-facebook </v-icon>
            </a>
          </div> -->
        </v-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>เป็นสมาชิกกับเราแล้ว</h1>
            <h2>ใช่รึเปล่า?</h2>

            <p class="pt-3">เข้าสู่ระบบ เพื่อใช้งานเว็บไซต์อย่างไร้ขีดจำกัด!</p>
            <button class="ghost" id="signIn">เข้าสู่ระบบ</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>ยังไม่เคยสมัครสมาชิก</h2>
            <h1>ใช่รึเปล่า?</h1>
            <p class="pt-3">
              มาร่วมเป็นส่วนหนึ่งในแวดวงเหล่านักเรียนรู้ <br />
              <span style="font-size: larger">ด้วยการเป็นสมาชิกกับเราสิ!</span>
            </p>
            <button class="ghost" id="signUp" @click="switchMode()">
              สมัครสมาชิก
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-center d-sm-flex d-md-none d-lg-none d-xl-none">
      <div class="form-structor" id="container">
        <v-form action="#" @submit.prevent="login" ref="form">
          <div class="signup" @click="switchModeMobile">
            <h2 class="form-title" id="signup"><span>หรือ</span>เข้าสู่ระบบ</h2>
            <div class="form-holder">
              <input
                type="text"
                class="input"
                placeholder="Username"
                v-model="usernameLogin"
              />
              <input
                type="password"
                class="input"
                placeholder="Password"
                v-model="passwordLogin"
              />
            </div>
            <v-btn class="submit-btn" type="submit">Log In</v-btn>
            <!-- <span class="pt-12" style="font-size:medium; color:#333; font-weight:500"
              >หรือล็อกอินด้วย Social Media
            </span>
            <div class="social-container">
              <a @click="goToFacebook" class="social" id="fb-mobile">
                <v-icon color="#333333"> mdi-facebook </v-icon>
              </a>
            </div> -->
          </div>
        </v-form>

        <v-form action="#"  @submit.prevent="submit" ref="form">
          <div class="login slide-up">
            <div class="center">
              <h2 class="form-title" id="login" @click="switchModeMobile">
                <span>หรือ</span> สมัครสมาชิก
              </h2>
              <div class="form-holder">
                <v-text-field
                  class="p-0"
                  type="text"
                  regular
                  v-model="username"
                  :rules="usernameRule"
                  placeholder="Username"
                />
                <v-text-field
                  regular
                  v-model="password"
                  :rules="passwordRule"
                  type="password"
                  placeholder="Password"
                />
                <v-text-field
                  v-model="email"
                  :rules="emailRule"
                  regular
                  type="email"
                  placeholder="Email"
                />
                <v-text-field
                  regular
                  v-model="displayName"
                  :rules="displayNameRule"
                  type="text"
                  placeholder="Display Name"
                />
                <div
                  class="d-flex justify-space-between"
                  id="profileUpload-mobile"
                >
                  <div class="d-flex align-center justify-space-between">
                    <p class="pic-cover-mobile">
                      รูปโปรไฟล์<span style="color: red">*</span>
                    </p>
                    <v-file-input
                      v-model="image"
                      @change="Preview_image"
                      hide-input
                      :rules="imageRules"
                      truncate-length="15"
                    ></v-file-input>
                  </div>
                  <v-avatar size="104"><v-img :src="url" /></v-avatar>
                </div>
              </div>
              <v-btn class="submit-btn" type="submit" @click="registAlert">SIGN UP</v-btn>
            </div>
          </div>
        </v-form>
        <v-snackbar v-model="snackbar">
          {{ snackbarRegistText }}

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { login_auth } from "../plugins/auth";
//var jwt = require("jsonwebtoken");
export default {
  data: () => ({
    usernameLogin: "",
    passwordLogin: "",
    username: "",
    usernameRule: [
      (v) => !!v || "กรุณาใส่ Username",
      (v) => v.length <= 20 || "Username ต้องมีไม่เกิน 20 ตัวอักษร",
    ],

    password: "",
    passwordRule: [
      (v) => !!v || "กรุณาใส่ Password",
      (v) => v.length >= 8 || "Password ต้องมีขั้นต่ำ 8 ตัวอักษร",
    ],

    email: "",
    emailRule: [(v) => !!v || "กรุณาใส่ Email"],

    displayName: "",
    displayNameRule: [
      (v) => !!v || "กรุณาใส่ชื่อที่ต้องการแสดงผลบนเว็บ",
      (v) => v.length <= 30 || "Username ต้องมีไม่เกิน 30 ตัวอักษร",
    ],

    image: null,
    imageRules: [(v) => !!v || "กรุณาเพิ่มไฟล์"],

    url: null,
    imageUri: "",
    snackbar: false,
    snackbarRegistText: "เพิ่มบัญชีสมาชิกใหม่เข้าระบบเรียบร้อยแล้ว",
  }),

  methods: {
    switchMode() {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    },
    switchModeMobile() {
      const loginBtn = document.getElementById("login");
      const signupBtn = document.getElementById("signup");

      loginBtn.addEventListener("click", (e) => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
          if (element !== "slide-up") {
            parent.classList.add("slide-up");
          } else {
            signupBtn.parentNode.classList.add("slide-up");
            parent.classList.remove("slide-up");
          }
        });
      });

      signupBtn.addEventListener("click", (e) => {
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
          if (element !== "slide-up") {
            parent.parentNode.classList.add("slide-up");
          } else {
            loginBtn.parentNode.parentNode.classList.add("slide-up");
            parent.classList.remove("slide-up");
          }
        });
      });
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
      var reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.imageUri = reader.result;
        //console.log(this.image);
        //console.log(this.imageUri);
      };
    },

    registAlert() {
      this.snackbar = true;
    },

    async submit() {
      function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(",");
        const byteString =
          splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
      }
      let convert_image = DataURIToBlob(this.imageUri);
      //console.log(convert_image);
      const formData = new FormData();
      formData.append("Username", this.username);
      formData.append("Password", this.password);
      formData.append("Displayname", this.displayName);
      formData.append("Email", this.email);
      formData.append("ImageFile", convert_image);

      await axios.post(
        process.env.VUE_APP_BACKEND_API + "/user/adduser",
        formData
      );
    },

    async login() {
      const encryptpwd = require("encrypt-with-password");
      //const password = "EDUVALOR";
      const password = process.env.VUE_APP_DCRYPT_SECRET;
      //console.log(process.env.VUE_APP_DCRYPT_SECRET);
      //console.log(password);
      const encrypted = encryptpwd.encrypt(this.passwordLogin, password);
      //console.log(encrypted);
      let user = JSON.stringify({
        username: this.usernameLogin,
        password: encrypted,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //console.log(user);
      const res = await axios
        .post(
          process.env.VUE_APP_BACKEND_API + "/authentication/login",
          //"https://www.eduvalor.ml/backendDev/authentication/login",
          user,
          config
        )
        .catch(function (error) {
          if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            //let res_Data = error.response.data;
            //console.log(res_Data);
            //window.alert(res_Data.message);
          }
        });

      if (res) {
        //console.log(res);
        let auth_check = await login_auth(res);

        //Vuex set data user
        this.$store.commit("setUser", auth_check.user);
        this.$store.commit("setToken", auth_check.token);
        this.$store.commit("setLoginStatus", true);

        //Set cookies
        this.$cookies.set("JWT_TOKEN", auth_check.token, auth_check.expire);
        this.$cookies.set("USER_DATA", auth_check.user, auth_check.expire);
        //window.alert("Login successful");
        this.$router.push({
          path: "/",
        });
        this.$router.go(0);
      }
    },

    async goToFacebook() {
      await axios.get(
        process.env.VUE_APP_BACKEND_API + "/authentication/facebook"
        //"https://www.eduvalor.ml/backendDev/authentication/facebook",
      );
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

h1 {
  font-family: "Kanit";
  font-weight: bold;
  margin: 0;
}

h2 {
  font-family: "Kanit";
  text-align: center;
  font-weight: 500;
}

p {
  font-family: "Bai Jamjuree";
  font-size: 16px;
  font-weight: 400;
}

span {
  font-family: "Bai Jamjuree";
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #ad9f86;
  background-color: #333333;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button:hover {
  transition: all 0.3s ease;
  background-color: #ad9f86;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  margin-top: 5%;
  background-color: transparent;
  border-color: #ffffff;
  font-family: "Kanit";
  font-weight: 500;
  font-size: 14px;
}

button.ghost:hover {
  border-color: transparent;
  transition: all 0.3s ease;
  background-color: white;
  color: #ad9f86;
}

.v-form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15%;
  height: 100%;
  text-align: center;
}

input {
  font-family: "Bai Jamjuree";
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 20px;
}
.text-field-area {
  font-family: "Bai Jamjuree";
  width: 100%;
}
input:focus {
  outline: none;
}
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 600px;
  margin-top: 2%;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background-image: url(https://bit.ly/3hNbJDA);
  box-shadow: inset 0 0 0 1000px rgba(74, 62, 62, 0.2);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 52px;
  width: 52px;
}

#fb-mobile {
  background-color: #ffffff;
}
#fb-mobile:hover {
  border: none;
  transition: all 0.3s ease;
  background-color: #ad9f86;
}

.social-container a:hover {
  transition: all 0.3s ease;
  background-color: #ad9f86;
}

.social-container a .v-icon:hover {
  transition: all 0.3s ease;
  color: #dddddd;
}
.v-application p {
  margin-bottom: 0px;
}

.v-avatar {
  border-bottom-style: solid;
  border-top-style: solid;
  border-color: #dddddd;
}

.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}

#profileUpload {
  width: 85%;
  padding: 8% 0;
}

#profileUpload-mobile {
  padding: 0;
}
.pic-cover-mobile {
}
</style>

<style scoped lang="scss">
.v-btn:not(.v-btn--round).v-size--default {
  height: 48px;
} 
.form-structor {
  box-shadow: 0;

  background-color: #222;
  border-radius: 15px;
  border-radius: 0px;

  height: 640px;
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center;

    background-image: url("https://bit.ly/3XfYWtD");
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .signup {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 65%;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    &.slide-up {
      top: 10%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
    }

    &.slide-up .form-title {
      font-size: 1.3em;
      font-weight: 600;
      cursor: pointer;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      font-size: 16px;
      -webkit-transition: all 0.3s ease;
    }

    .form-title {
      color: #fff;
      font-size: 1.9em;
      font-weight: 600;
      text-align: center;

      span {
        color: white;
        opacity: 0;
        visibility: hidden;
        font-size: 14px;
        -webkit-transition: all 0.3s ease;
      }
    }

    .form-holder {
      border-radius: 15px;
      background-color: #fff;
      overflow: hidden;
      margin-top: 8%;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;

      .input {
        border: 0;
        outline: none;
        box-shadow: none;
        display: block;
        height: 52px;
        line-height: 30px;
        padding: 8px 15px;
        border-bottom: 1px solid #eee;
        width: 100%;
        font-size: 16px;

        &:last-child {
          border-bottom: 0;
        }
        &::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }

    .submit-btn {
      background-color: rgba(0, 0, 0, 0.4);
      color: white;
      border: 0;
      border-radius: 15px;
      display: block;
      margin: 15px auto;
      padding: 15px 45px;
      width: 100%;
      font-family: "Kanit";
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;

      &:hover {
        transition: all 0.3s ease;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  .login {
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: -20px;
      -webkit-transform: translate(-50%, 0);
      background-color: #fff;
      width: 200%;
      height: 250px;
      border-radius: 50%;
      z-index: 4;
      -webkit-transition: all 0.3s ease;
    }

    .center {
      position: absolute;
      top: calc(60% - 10%);
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      width: 80%;
      z-index: 5;
      -webkit-transition: all 0.3s ease;

      .form-title {
        color: black;
        font-size: 1.6em;
        font-weight: 600;
        text-align: center;

        span {
          color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          font-size: 14px;
          -webkit-transition: all 0.3s ease;
        }
      }

      .form-holder {
        background-color: white;
        overflow: hidden;
        margin-top: 24px;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        .input {
          border: 0;
          outline: none;
          box-shadow: none;
          display: block;
          height: 52px;
          line-height: 30px;
          padding: 8px 15px;
          width: 100%;
          font-size: 16px;

          &:last-child {
            border-bottom: 0;
          }
          &::-webkit-input-placeholder {
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .submit-btn {
        background-color: #333333;
        color: white;
        border: 0;
        border-radius: 15px;
        display: block;
        margin: 15px auto;
        padding: 15px 45px;
        width: 100%;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        &:hover {
          transition: all 0.3s ease;
          background-color: #AD9F86;
        }
      }
    }

    &.slide-up {
      top: 90%;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .center {
      top: 10%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title {
      font-size: 1.2em;
      margin: 0;
      padding: 0;
      font-weight: 600;
      cursor: pointer;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;
    }
  }
}
</style>
