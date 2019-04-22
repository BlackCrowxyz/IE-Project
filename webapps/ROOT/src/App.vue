<template>
<div id="app">
  <!--
		<index-component></index-component>
		to use router
	-->
  <navbar-component></navbar-component>
  <div class="text-center h3 pt-4 m-0">
    {{this.currentUser.username}}
  </div>
  <router-view @authenticated="setAuthenticated"></router-view>
  <!-- {{users}} -->
  <footer-component></footer-component>

</div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue'
import FooterComponent from './FooterComponent.vue'
var reportURL = 'https://api.myjson.com/bins/k49qs';
var usersURL = 'https://api.myjson.com/bins/12ir4k';
export default {
  name: 'app',
  data() {
    return {
      username: '',
      password: '',
      authenticated: false,
      currentUser: '',

      title: '',
      details: '',
      responsible: '',

      users: [],
      posts: [],
    }
  },

  // beforeCreate() {
  //   // Initailing the JSON file : 'Users'
  //   let jsonStr = `{"users": []}`;
  //   let obj = JSON.parse(jsonStr);
  //   obj['users'].push({
  //     "id": 1,
  //     "username": "admin",
  //     "email": "admin@g.co",
  //     "password": "adminadmin1",
  //     "isStudent": false,
  //     "isActive": true
  //   });
  //   obj['users'].push({
  //     "id": 2,
  //     "username": "prof",
  //     "email": "prof@g.co",
  //     "password": "profprof1",
  //     "isStudent": false,
  //     "isActive": true
  //   });
  //   obj['users'].push({
  //     "id": 0,
  //     "username": "student",
  //     "email": "student@g.co",
  //     "password": "student1",
  //     "isStudent": true,
  //     "isActive": true
  //   });
  //   obj['users'].push({
  //     "id": 3,
  //     "username": "sina",
  //     "email": "sina1@gm.co",
  //     "password": "sina1@gm.co",
  //     "isStudent": false,
  //     "isActive": false
  //   });
  //   obj['users'].push({
  //     "id": 4,
  //     "username": "a",
  //     "email": "a@gmail.com",
  //     "password": "a",
  //     "isStudent": true,
  //     "isActive": true
  //   });
  //   obj['users'].push({
  //     "id": 5,
  //     "username": "b",
  //     "email": "b@gmail.com",
  //     "password": "b",
  //     "isStudent": true,
  //     "isActive": true
  //   });
  //   obj['users'].push({
  //     "id": 6,
  //     "username": "c",
  //     "email": "c@gmail.com",
  //     "password": "c",
  //     "isStudent": true,
  //     "isActive": true
  //   });
  //
  //   //.put('https://api.myjson.com/bins/12ir4k',{"users":[{"username":"admin","email":"admin@g.co","password":"adminadmin1","isStudent":false},{"username":"prof","email":"prof@g.co","password":"profprof1","isStudent":false},{"username":"student","email":"student@g.co","password":"student1","isStudent":true}]})
  //   this.$axios
  //     .put(usersURL, obj)
  //     .then(response => (this.users = response.data))
  //     .catch(error => console.log(error))
  //
  //   //Initailing the JSON file : 'Users'
  //   jsonStr = `{"reports": []}`;
  //   obj = JSON.parse(jsonStr);
  //   obj['reports'].push({
  //     "id": 0,
  //     "email": "a@gmail.com",
  //     "title": "a title",
  //     "detail": "a detail",
  //     "responsible": "prof",
  //     "status": "open",
  //     "date": "Apr 9, 2018 10:55 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //   obj['reports'].push({
  //     "id": 1,
  //     "email": "b@gmail.com",
  //     "title": "b title",
  //     "detail": "b detail",
  //     "responsible": "admin",
  //     "status": "open",
  //     "date": "Apr 8, 2013 10:54 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //   obj['reports'].push({
  //     "id": 2,
  //     "email": "a@gmail.com",
  //     "title": "aa title",
  //     "detail": "aa detail",
  //     "responsible": "admin",
  //     "status": "closed",
  //     "date": "Apr 6, 2019 10:42 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //   obj['reports'].push({
  //     "id": 3,
  //     "email": "b@gmail.com",
  //     "title": "bb title",
  //     "detail": "bb detail",
  //     "responsible": "prof",
  //     "status": "closed",
  //     "date": "Apr 2, 2019 10:55 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //   obj['reports'].push({
  //     "id": 4,
  //     "email": "a@gmail.com",
  //     "title": "aaa title",
  //     "detail": "aaa detail",
  //     "responsible": "prof",
  //     "status": "open",
  //     "date": "Apr 3, 2019 11:15 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //   obj['reports'].push({
  //     "id": 5,
  //     "email": "c@gmail.com",
  //     "title": "c title",
  //     "detail": "c detail",
  //     "responsible": "prof",
  //     "status": "open",
  //     "date": "Apr 3, 2015 11:15 PM",
  //     "satisfied": "",
  //     "newDetail": ""
  //   });
  //
  //   this.$axios
  //     .put(reportURL, obj)
  //     .then(response => (this.posts = response.data))
  //     .catch(error => console.log(error))
  // },

  methods: {
    setUsers() {
      this.$axios
        .put(usersURL, this.users)
        .then(response => (this.users = response.data))
        .catch(error => console.log(error))
    },
    setAuthenticated(status) {
      this.authenticated = status;
    },
    isInUsers() {
      console.log('isInUsers() called');
      //check if the user data already existed
      let user = this.users.users;
      for (let i = 0; i < this.users.users.length; i++) {
        if (user[i].username == this.username && user[i].password == this.password) {
          this.currentUser = user[i];
          return true;
        }
      }
      return false;
    },
    getUsers() {
      console.log('getUser() called');
      this.$axios
        .get(usersURL)
        .then(response => (this.users = response.data))
        // .then(response => (console.log(response.data.users.length)))
        .catch(error => console.log(error))
    },

    // setActiveUsers(){
    //   var activeUsers = this.users.users.length;
    //   // console.log(this.users);
    //   console.log(activeUsers);
    //   // console.log(this.users.length);
    //   // console.log(this.users.users.length);
    //   // for (let i = 0; i < activeUsers.length; i++) {
    //     // if (!activeUsers[i].isActive) {
    //     //   console.log("# username = "+activeUsers[i].username);
    //     //   activeUsers = activeUsers.splice(i, 1);
    //     // }
    //   // }
    //   // this.users = activeUsers;
    //   // console.log('this.users(after filtering) ====>'+this.users);
    // },

    getPosts() {
      console.log('app > getPosts() called');
      this.$axios
        .get(reportURL)
        .then(response => (this.posts = response.data))
        .catch(error => console.log(error))
    },
    setPostsChange() {
      console.log('App > setPost() called');
      if (this.currentUser != '' && this.posts.reports != '') {
        this.$axios
          .put(reportURL, this.posts)
          .then(response => (this.posts = response.data))
          .catch(error => console.log(error))
        console.log("PostsChange UPDATED => " + this.posts);
      } else {
        console.log("PostsChange *'NOT'* UPDATED " + (this.posts.reports != ''));
      }
    },
  },
  // beforeDestroy(){
  //   //sort by id 'users'
  //   this.users.users.sort(function(a, b) {
  //     if (a.id < b.id)
  //       return -1;
  //     if (a.id > b.id)
  //       return 1;
  //     return 0;
  //   });
  // },
  beforeUpdate() {
    console.log("App > beforeUpdate() called");
    this.setPostsChange();
    // this.setUsers();
  },
  mounted() {
    // updated() {
    // updated() {
    this.getPosts();
    this.getUsers();
    // this.setActiveUsers();
    // console.log(this.users);

  },
  beforeMount() {
    if (!this.authenticated) {
      // console.log("**** change this part to present");
      this.$router.replace('/');
      // this.$router.replace('/admin');
    }
    //
    // this.setUsers();
    // this.getUsers();
    // this.getPosts();
  },
  components: {
    'navbar-component': NavbarComponent,
    'footer-component': FooterComponent,
  },
}
</script>

<style>

</style>
