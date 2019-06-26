<template>
<!-- <tr v-for="(user, i) in this.users" :user="user" :key="i"> -->
<tr v-if="this.$parent.isAll != (user.role == 'student')">
  <!-- <tr v-if="true"> -->
  <!-- <td>{{this.$vnode.key+1}}</td> -->
  <!-- this.$vnode.key+1 -->
  <td>
    <button v-if="!user.active" @click="acceptOrDeactiveUser(true)" class="btn btn-sm btn-success m-1" type="button" name="button">تایید کاربر</button>
    <button v-else @click="acceptOrDeactiveUser(false)" class="btn btn-sm btn-danger" type="button" name="button">غیرفعال کردن کاربر</button>
  </td>
  <td>
    <button @click="removeUser" class="btn btn-sm btn-danger" type="button" name="button">حذف کاربر</button>
  </td>
  <td>{{user.username}}</td>
  <td>{{user.email}}</td>
  <td v-if="user.active">فعال</td>
  <td v-else>غیرفعال</td>
  <td v-if="user.role == 'student'">دانشجو</td>
  <td v-else-if="user.username=='admin'">مدیر</td>
  <td v-else>مسؤل</td>
  <td @click="editUser">ویرایش</td>
</tr>
</template>

<script>
export default {
  name: 'table-content-component',
  props: ['user'],
  methods: {
    axiosReq(url, state) {
      return this.$axios
        .post(url, {
          "token": localStorage.getItem("token"),
          "last_username": this.user.username,
          "new_username": this.user.username,
          "email": this.user.email,
          "password": this.user.password,
          "role": this.user.role,
          "active": state
        })
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    removeUser() {
      console.log("removeUser() => " + this.user.username);
      this.axiosReq("http://localhost:8080/contacts/rest/myservice/deleteUser", this.user.active).then(data => {
        let msg = JSON.parse(JSON.stringify(data))
        if (typeof msg !== 'object' && !msg.success) {
          alert(msg.message)
          console.log(msg.message);
        } else {
          // this.$parent.users = msg.data.splice()
          console.log(msg.data);
          // console.log(msg.data.splice());

          console.log("remove() => (this.$vnode.key, 1) " + this.$vnode.key);
          // this.$parent.users.splice(this.$vnode.key, 1)
          // this.$parent.users[this.$vnode.key].active = false;
          if (this.$vnode.key != 0) { //not admin
            // this.$parent.$parent.users[this.$vnode.key].active = false
            this.$parent.users.splice(this.$vnode.key, 1)
            // this.$parent.$parent.getAllUsers()
          }
        }
      })
    },
    acceptOrDeactiveUser(state) {
      console.log("acceptOrDeactiveUser() => " + this.user.username);
      //TODO: send 'state' and 'username' to server for 'ative = state'
      this.axiosReq("http://localhost:8080/contacts/rest/myservice/manageUsers", state).then(data => {
        let msg = JSON.parse(JSON.stringify(data))
        if (typeof msg !== 'object' && !msg.success) {
          alert(msg.message)
          console.log(msg.message);
        } else {
          // this.$parent.users = msg.data.splice()
          console.log(msg.data);
          // console.log(msg.data.splice());

          // this.$parent.users.splice(this.$parent.users.length, 0, this.user)
          // this.$parent.users[this.$vnode.key].active = true;
          // console.log(this.$parent.users[this.$vnode.key].active);
          // console.log(this.$parent.$parent.users[this.$vnode.key].active);
          // console.log(state);
          this.$parent.$parent.users[this.$vnode.key].active = state;
          // this.$parent.$parent.getAllUsers()
        }
      })
    },
  },
}
</script>
