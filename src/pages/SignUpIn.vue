<template>
  <div>
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <v-form action="#" v-model="valid" @submit.prevent="submit" ref="form">
          <h1>สมัครสมาชิก</h1>
          <span class="body-1 pb-5">กรุณากรอกข้อมูลให้ครบทุกช่อง</span>
          <div>
            <v-text-field
              background-color="#EDE6DA"
              type="text"
              solo
              v-model="username"
              :rules="usernameRule"
              placeholder="Username"
            />

            <v-text-field
              background-color="#EDE6DA"
              solo
              v-model="password"
              :rules="passwordRule"
              type="password"
              placeholder="Password"
            />

            <v-text-field
              background-color="#EDE6DA"
              v-model="email"
              :rules="email"
              solo
              type="email"
              placeholder="Email"
            />

            <v-text-field
              background-color="#EDE6DA"
              solo
              v-model="displayName"
              :rules="displayNameRule"
              type="text"
              placeholder="Display Name"
            />

            <div class="d-flex justify-space-between" id="profileUpload">
              <div class="d-flex align-center justify-space-between">
                <p class="pic-cover">
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
              <v-avatar size="100"><img :src="url" /></v-avatar>
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
          <input type="email" placeholder="Username" v-model="usernameLogin" />
          <input
            type="password"
            placeholder="Password"
            v-model="passwordLogin"
          />
          <button>Sign In</button>
          <!-- <a href="#">Forgot your password?</a> -->
          <span class="pt-12 text-md-body-1"
            >หรือล็อกอินด้วย Social Media
          </span>
          <div class="social-container">
            <a href="#" class="social"
              ><img src="../assets/icon/login/facebook_f_logo_icon_145290.png"
            /></a>
          </div>
        </v-form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>ยังไม่เคยสมัครสมาชิก</h2>
            <h1>ใช่รึเปล่า?</h1>
            <p>
              มาร่วมเป็นส่วนหนึ่งในแวดวงเหล่านักเรียนรู้ <br />
              ด้วยการเป็นสมาชิกกับเราสิ!
            </p>
            <button class="ghost" id="signUp" @click="switchMode()">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var jwt = require("jsonwebtoken");
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
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
      var reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.imageUri = reader.result;
        console.log(this.image);
        console.log(this.imageUri);
      };
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
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
      console.log(convert_image);
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
      let user = JSON.stringify({
        username: this.usernameLogin,
        password: this.passwordLogin,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(user);
      const res = await axios.post(
        process.env.VUE_APP_BACKEND_API + "/authentication/login",
        //"https://www.eduvalor.ml/backendDev/authentication/login",
        user,
        config
      );

      if (res) {
        let token = await res.data.access_token;
        let user = await jwt.verify(token, "EDUVALOR");
        let expire = new Date((await user.exp) * 1000);
        this.$store.commit("setUser", user);
        this.$store.commit("setToken", token);
        console.log(this.$store.state);
        console.log(expire);
        this.$cookies.set("JWT_TOKEN", token, expire);
        console.log(this.$cookies.get("JWT_TOKEN"));
        this.$router.push("/Welcome");
      }
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
  /* line-height: 20px; */
  /* letter-spacing: 0.5px; */
  /* margin: 20px 0 30px; */
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
  background-color: #ad9f86;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
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

input,
.v-text-field {
  /* background-color: #eee; */
  font-family: "Bai Jamjuree";
  /* background-color: #EDE6DA; */
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
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
  background: #ad9f86;
  background: -webkit-linear-gradient(to right, #ad9f86, rgb(119, 102, 102));
  background: linear-gradient(to right, #ad9f86, rgb(119, 102, 102));
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
  height: 40px;
  width: 40px;
}

.v-application p {
  margin-bottom: 0px;
}

.v-avatar {
  border-bottom-style: solid;
  border-top-style: solid;
  border-color: #ede6da;
}

.v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}

#profileUpload {
  width: 85%;
}
</style>
