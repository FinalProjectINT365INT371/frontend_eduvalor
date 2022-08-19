import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'
import {
  required,
  email,
  digits,
  min,
  confirmed,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'ไม่สามารถเว้นว่างไว้ได้',
})

// extend('alpha', {
//   ...alpha,
//   message: 'กรุณากรอกเป็นตัวอักษร',
// })

extend('email', {
  ...email,
  message: 'กรุณากรอกอีเมลล์อีกครั้งให้ถูกต้อง',
})

extend('digits', {
  ...digits,
  message: 'กรุณากรอกเป็นตัวเลข',
})

extend('min', {
  ...min,
  message: 'กรุณากรอกรหัส 8 ตัวขึ้นไป',
})

extend('confirmed', {
  ...confirmed,
  message: 'รหัสผ่านไม่ตรงกัน',
})
extend('gen', {
  computesRequired: true,
  validate: (value) => {
    return /SKT[0-9]{2,3}/g.test(value)
  },
  message: 'กรุณากรอกเป็น SKTXX (XX คือตัวเลข), ตัวอย่าง SKT01',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
