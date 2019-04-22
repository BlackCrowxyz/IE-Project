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
export default {
  name: 'login-component',
  data() {
    return {
      username: '',
      password: '',
      user: '',
      // posts:'',
    }
  },
  // mounted() {
  // updated() {
  created() {
    // console.log("34343434");
    this.user = this.$parent.users.users
    // this.posts = this.$parent.posts
  },
  methods: {
    login() {
      console.log('SigninComponent > login() called');
      //check if the user exists in the database
      if (this.isInUsers()) {
        this.$parent.authenticated = true;

        // for (var i = 0; i < this.posts.reports.length; i++) {
        //   if (this.posts.reports[i].email != this.$parent.currentUser.email) {
        //     this.posts.reports.splice(i,1);
        //   }
        // }
        // this.$parent.posts = this.posts;

        if (this.$parent.currentUser.id == 1) {
          // ****** admin ******
          this.$router.replace(`/admin`);
        } else if (this.$parent.currentUser.id == 2) {
          // ****** staff ******
          this.$router.replace(`/management`);
        } else {
          // ****** students ******
          this.$router.replace(`/report`);
        }
        this.username = '';
        this.password = '';
      }
    },
    isInUsers() {
      console.log('SigninComponent > isInUsers() called');
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].username == this.username && this.user[i].password == this.password) {
          if (!this.user[i].isActive) {
            // alert("this.user[i].isActive = "+this.user[i].isActive)
            // alert("this.user[i].email = "+this.user[i].email)
            alert("هنوز مدیر شما را تایید نکرده است.")
            return false;
          }
          this.$parent.currentUser = this.user[i];
          return true;
        }
      }
      // alert("The Username and/or Password is incorrect!");
      alert("نام کاربری یا رمز عبور اشتباه است!");
      return false;
    },
  },
}
</script>

<style>

</style>
