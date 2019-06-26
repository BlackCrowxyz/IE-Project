<template>
<!-- content of the login page 1-->
<div class="container text-center text-white pt-3 rounded  w-lg-50 w-md-75 w-sm-75">
  <div class="row shadow1">
    <div class="col-sm-12 rounded-right bg-white">
      <div class="signin">
        <div class="container text-dark">
          <form id="signin" class="py-5" action="" @submit.prevent>
            <span class="text-center font-weight-bold h5">صفحه ورود</span>
            <div class="form-group pt-5">
              <div class="material-icons pl-2">&#xe0be;</div>
              <input v-model="username" id="emailOrUsername" type="text" name="email" placeholder="پست الکترونیکی" required>
            </div>
            <div class="form-group ">
              <div class="material-icons pl-2">&#xe897;</div>
              <input v-model="password" id="pass" type="password" name="password" placeholder="رمز عبور" required>
            </div>
            <br>
            <button @click="login" type="submit" class="btn btn-success w-50 shadow1">ورود</button>
            <!-- <router-link :to="`/report`" @click.native="check" class="btn btn-success w-50 shadow1">ورود</router-link> -->
            <!-- <input type="submit" class="btn btn-success w-50 shadow1" value="ورود"  onclick="location.href='index.html'"> -->
            <!-- <input type="submit" class="btn btn-success w-50 shadow1" value="ورود" onclick="location.href='report.html'"> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
var loginURL = 'http://localhost:8080/contacts/rest/myservice/login';

export default {
  name: 'login-component',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  // mounted() {
  // updated() {
  // created() {
  //   // console.log("34343434");
  //   // this.user = this.$parent.users.users
  //   // this.posts = this.$parent.posts
  // },
  methods: {
    axiosReq(){
      //.then(response => (this.$parent.currentUser = response.data))
      return this.$axios
        .post(loginURL,{
          "username": this.username,
          "password": this.password
        })
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    login() {
      console.log('SigninComponent > login() called');

      this.axiosReq().then(data => {
        // this.user = JSON.parse(JSON.stringify(data))
        let msg = JSON.parse(JSON.stringify(data))
        if (typeof msg !== 'object' && !msg.success) {
          alert("اشکال در ورود:\n" + msg.message)
          console.log("اشکال در ورود:\n" + msg.message);
        } else {
          this.$parent.currentUser = msg.data;
          this.$parent.authenticated = true;
          localStorage.setItem("token", msg.data.token); //Saving to local Stroge
          if (msg.data.role == "admin") {
            // this.$parent.getAllUsers().then(data2 => {
            //   let msg = JSON.parse(JSON.stringify(data2))
            //   if (msg.success) {
            //     this.$parent.users = msg.data.slice() //getting all users and converting them to js array
            //   } else {
            //     alert(msg.message)
            //     console.log(msg.message)
            //   }
            // })
            this.$router.replace(`/admin`);
          } else if (msg.data.role == "prof") {
            this.$router.replace(`/management`);
          } else {
            this.$router.replace(`/report`);
          }
          this.username = '';
          this.password = '';
        }
      })
    },
  },
}
</script>
