<template>
<!-- content of the login page 1-->
<div class="container text-center text-white p-5 rounded w-lg-50 w-md-75 w-sm-75">
  <div class="row shadow1">
    <div class="col-sm-12 rounded-right bg-white">
      <div class="signup">
        <div class="container text-dark">
          <form id="signup" class="py-5" action="" novalidate @submit.prevent>
            <span class="text-center font-weight-bold h5">صفحه ثبت‌نام</span>
            <div class="form-group pt-5">
              <div class="material-icons pl-2">&#xe8a6;</div>
              <input v-model="username" type="text" name="username" id="username" placeholder="نام و نام‌خانوادگی">
            </div>
            <div class="form-group">
              <div class="material-icons pl-2">&#xe0be;</div>
              <input v-model="email" type="email" name="email" id="email" placeholder="پست الکترونیک" required>
            </div>
            <div class="form-group ">
              <div class="material-icons pl-2">&#xe32a;</div>
              <input v-model="password" type="password" name="password" id="password" placeholder="رمز عبور">
            </div>
            <div class="form-group">
              <div class="material-icons pl-2">&#xe32a;</div>
              <input v-model="repassword" type="password" name="repassword" id="repassword" placeholder="تکرار رمز عبور ">
            </div>
            <div class="form-check">
              <label class="form-check-labe" for="check1">
                <input v-model="isStudent" type="checkbox" id="isStudent" class="form-check-input w-50" name="option1" value="student">
                دانشجو هستم
              </label>
            </div>
            <button @click="addUser" type="submit" class="btn btn-success w-50 shadow1 mt-2">
              ثبت‌نام
            </button>
            <!-- <input type="submit" class="btn btn-success w-50 shadow1 mt-5" value="ثبت‌نام" -->
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
var usersURL = 'https://api.myjson.com/bins/12ir4k';
export default {
  name: 'signup-component',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repassword: '',
      isStudent: false,
      users: '',
    }
  },
  updated() {
    this.users = this.$parent.users
  },
  beforeDestroy() {
    console.log("SignUpComponent > beforeDestroy() called");
    this.$parent.users = this.users;
    // this.$parent.setNewUser();
  },
  methods: {
    addUser() {
      let filled = true; //flag for adding new data
      $(".error").remove();
      $(".text-success").remove();
      $('.br').remove();

      // USERNAME VALIDATION
      if (this.username.length < 1) {
        $('#username').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
        filled = false;
      } else {
        $('#username').after('<br class=br><span class="text-success">نام معتبر است</span>');
      }
      // EMAIL VALIDATION
      let regEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      let validEmail = regEx.test(this.email);
      if (this.email.length < 1) {
        $('#email').after('<br class=br><span class="error">لطفا این قسمت را پر کنید</span>');
        filled = false;
      } else if (!validEmail) {
        $('#email').after('<br class=br><span class="error">ایمیل معتبر وارد کنید</span>');
        filled = false;
      } else {
        $('#email').after('<br class=br><span class="text-success">ایمیل معتبر است</span>');
      }
      // PASSWORD
      // (?=.*[a-z]) -> password shoule at least have 1 character
      // (?=.*[0-9]) -> password shoule at least have 1 digit
      let regEX_pw = /^(?=.*[a-z])(?=.*[0-9])/;
      if (this.password.length < 8) {
        $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۸ کاراکتر باشد</span>');
        filled = false;
      } else if (!regEX_pw.test(this.password)) {
        $('#password').after('<br class=br><span class="error">رمز عبور باید حداقل ۱ حرف و ۱ رقم داشته باشد</span>');
        filled = false;
      } else if (this.password.length == 0) {
        $('#password').after('<br class=br><span class="error">رمز عبور را وارد نکردید</span>');
        filled = false;
      } else if (this.password !== this.repassword) {
        $('#password').after('<br class=br><span class="error">!!!</span>');
        $('#repassword').after('<br class=br><span class="error">در وارد کردن رمز عبور دقت کنید</span>');
        filled = false;
      } else {
        $('#password').after('<br class=br><span class="text-success">رمز عبور معتبر است</span>');
      }
      ///////////storing data//////////
      //check if the user data already existed
      let isNewUser = true;
      for (var i = 0; i < this.users.users.length; i++) {
        if (this.users.users[i].email == this.email && filled) {
          alert("این ایمیل قبلا ثبت شده است.")
          filled = false;
          isNewUser = false;
          break;
        }
      }
      //adding new user to database
      if (filled && isNewUser) {
        let newUserObj = this.users;
        newUserObj['users'].push({
          "id": this.users.users.length,
          "username": this.username,
          "email": this.email,
          "password": this.password,
          "isStudent": this.isStudent,
          "isActive": this.isStudent
        });

        this.$axios
          .put(usersURL, newUserObj)
          .then(response => (this.users = response.data))
          .catch(error => console.log(error))

        this.$parent.users = this.users;

        if (this.isStudent) {
          this.$parent.authenticated = true;
          this.$parent.currentUser = newUserObj['users'].pop();
          this.$router.replace(`/report`);
        } else {
          this.$router.replace(`/`);
          alert('منتظر تایید از طرف مدیریت باشید، تا بعدا از سایت استفاده کنید.')
        }
        this.username = '';
        this.email = '';
        this.password = '';
        this.repassword = '';
        this.isStudent = '';
      }
    },
  },
}
</script>
