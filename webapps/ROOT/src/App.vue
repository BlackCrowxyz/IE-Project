<template>
<div id="app">
  <!--
		<index-component></index-component>
		to use router
	-->
  <navbar-component></navbar-component>
  <!-- <div class="text-center h3 pt-4 m-0">
    {{this.currentUser.username}}
  </div> -->
  <router-view @authenticated="setAuthenticated"></router-view>
  <!-- {{users}} -->
  <footer-component></footer-component>

</div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue'
import FooterComponent from './FooterComponent.vue'
var reportURL = 'https://api.myjson.com/bins/k49qs';
// var usersURL = 'https://api.myjson.com/bins/12ir4k';
//var usersURL = 'http://localhost:8080/contacts/rest/myservice/createUser';

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
  created() {
    this.getPosts()
    this.getAllUsers()
  },
  methods: {
    axiosReq(url, obj) {
      console.log("app >axiosReq called -> " + url + "\n" + obj);
      return this.$axios
        .post(url, obj)
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    // sendToken(){
    //   var token = localStorage.getItem("token")
    //   if (token != "") {
    //     return this.$axios
    //       .post("http://localhost:8080/contacts/rest/myservice/sendToken",{
    //         "token": token
    //       })
    //       .then(response => response.data)
    //       .catch(error => console.log(error))
    //   }
    // },
    // getAllUsers() {
    //   console.log('getUser() called');
    //   var token = localStorage.getItem("token")
    //   if (token != "") {
    //     return this.$axios
    //       .post("http://localhost:8080/contacts/rest/myservice/getAllUsers",{
    //         "token": localStorage.getItem("token")
    //       })
    //       .then(response => response.data)
    //       .catch(error => console.log(error))
    //   }
    // },
    getPosts() {
      console.log('app > getPosts() called');
      this.axiosReq("http://localhost:8080/contacts/rest/myservice/getAllPosts", {
        "token": localStorage.getItem("token")
      }).then(data => {
        if (data != null || data != "") {
        let msg = JSON.parse(JSON.stringify(data))
        if (msg.success) {
          this.posts = msg.data.slice() //getting all posts and converting them to js array
          console.log(this.posts);
        } else {
          alert(msg.message)
          console.log(msg.message)
        }
      }
      })
    },
    setUsers() {
      console.log(app > serUser());
      // this.$axios
      //   .put(usersURL, this.users)
      //   .then(response => (this.users = response.data))
      //   .catch(error => console.log(error))
    },
    setAuthenticated(status) {
      this.authenticated = status;
    },
    // isInUsers() {
    //   console.log('isInUsers() called');
    //   //check if the user data already existed
    //   let user = this.users.users;
    //   for (let i = 0; i < this.users.users.length; i++) {
    //     if (user[i].username == this.username && user[i].password == this.password) {
    //       this.currentUser = user[i];
    //       return true;
    //     }
    //   }
    //   return false;
    // },
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
    setPostsChange(post) {
      console.log('App > setPostsChange() called');
      this.axiosReq("http://localhost:8080/contacts/rest/myservice/managePosts ", post).then(data => {


          let msg = JSON.parse(JSON.stringify(data))
          if (msg.success) {
            console.log(post);
            console.log(msg.data == null);
          } else {
            alert(msg.message)
            console.log(msg.message)
          }

      })
    },
  },
  // beforeUpdate() {
  //   console.log("App > beforeUpdate() called");
  //   this.setPostsChange();
  // },
  beforeMount() {
    this.axiosReq("http://localhost:8080/contacts/rest/myservice/sendToken", {
      "token": localStorage.getItem("token")
    }).then(data => {
      this.currentUser = JSON.parse(JSON.stringify(data))
      if (this.currentUser.success) {
        this.authenticated = true;
        if (this.currentUser.data.role == "admin") {
          this.axiosReq("http://localhost:8080/contacts/rest/myservice/getAllUsers", {
            "token": localStorage.getItem("token")
          }).then(data2 => {
            let msg = JSON.parse(JSON.stringify(data2))
            if (msg.success) {
              this.users = msg.data.slice() //getting all users and converting them to js array
              console.log(this.users);
            } else {
              alert(msg.message)
              console.log(msg.message)
            }
          })
          this.$router.replace(`/admin`); // ****** admin ****** //
        } else if (this.currentUser.data.role == "prof") {
          this.$router.replace(`/management`); // ****** manager ****** //
        } else {
          this.$router.replace(`/report`); // ****** students ****** //
        }
      } else {
        alert(this.currentUser.message)
        console.log(this.currentUser.message);
      }
      if (!this.authenticated) {
        this.$router.replace('/');
      }
    })
  },
  components: {
    'navbar-component': NavbarComponent,
    'footer-component': FooterComponent,
  },
}
</script>
