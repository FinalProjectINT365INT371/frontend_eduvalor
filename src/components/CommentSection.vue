<template>
  <section id="wrapper">
    <aside class="card">
      <div class="row d-flex justify-center">
        <div class="col-1">
          <img src="../assets/icon/user.png" class="rounded-circle img-fluid" width="56" height="56">
        </div>
        <div class="col-9">
          <h4>${this.name}</h4>
          <v-form v-model="valid" @submit.prevent="submit" ref="form">
            <v-textarea solo auto-grow clearable counter :maxlength="240" rows="4" id="inputStatus"
              placeholder="แสดงความคิดเห็นของคุณต่อคอนเทนต์นี้ที่นี่!"></v-textarea>
            <div class="d-flex ">
              <v-checkbox v-model="checkbox" :label="`บ.ก. EduValor ขอแนะนำคอนเทนต์นี้!: ${checkbox.toString()}`"
                color="#333333"></v-checkbox>

              <button class="ml-auto d-inline-flex align-center publish-btn" type="button">
                <v-img src="../assets/icon/carbon_send-alt-filled.png"> </v-img>เผยแพร่
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    checkbox: true,
    commentText: "",
    commentTextRules: [
      (v) => !!v || "กรุณาใส่ตัวอักษรเพื่อแสดงความคิดเห็น",
      (v) => v.length <= 240 || "ตัวอักษรต้องไม่เกิน 240 ตัว",
    ],
  }),
}
</script>

<style lang="scss">
$purple: #AD9F86;
$background: #535F82;
$muted: #737373;
$white: #ffffff;
$button-font-size: 0.8rem;

* {
  padding: 0px;
  margin: 0px;
}

body {
  padding-bottom: 2%;
}

.card {
  // background-color: #EDE6DA;
  background-color: white;
  border-radius: 0.5rem;
  // box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.39);
  box-shadow: 0px 0px 5px 3px #AD9F86;
  display: block;
  // position:relative;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  padding: 0.7rem;
  width: 90%;

  .img-fulid {
    padding: 1rem;
  }

  h4 {
    color: $muted;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    letter-spacing: -0.1rem;
    padding-bottom: 0.5rem;
  }

  v-textarea {
    height: min-content;
    width: 100%;
    background: #eee;
    outline: none;
    border: none;
    padding: 0.5rem;
    resize: none;
    box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.19);
    border-radius: 2px;
    margin-bottom: 0.3rem;
    color: $muted;
  }

  .v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
  }

  .publish-btn {
    font-family: "Kanit";
    font-style: bold;
    background: $purple;
    color: white;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
    font-size: $button-font-size;
    font-weight: light;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover {
      background: #333333;
      transition: all 1s;
    }
  }


}
</style>