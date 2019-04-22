<template>
<!-- <tr v-for="(user, i) in this.users" :user="user" :key="i"> -->
<tr v-if="this.$parent.isAll != user.isStudent">
  <!-- <td>{{this.$vnode.key+1}}</td> -->
  <!-- this.$vnode.key+1 -->
  <td>
    <button v-if="!user.isActive" @click="addUser" class="btn btn-sm btn-success m-1" type="button" name="button">تایید کاربر</button>
    <button v-else @click="removeUser" class="btn btn-sm btn-danger" type="button" name="button">غیر فعال کردن کاربر</button>
  </td>
  <td>{{user.username}}</td>
  <td>{{user.email}}</td>
  <td v-if="user.isActive">فعال</td>
  <td v-else>غیرفعال</td>
  <td v-if="user.isStudent">دانشجو</td>
  <td v-else-if="user.username=='admin'">مدیر</td>
  <td v-else>مسؤل</td>
</tr>
</template>

<script>
export default {
  name: 'table-content-component',
  props: ['user'],
  methods: {
    // isAll(){
    //   if (this.$parent.isAll) {
    //     return 'user.isStudent'
    //   } else {
    //     return 'user.isStudent'
    //   }
    // },
    removeUser() {
      console.log("remove() => " + this.user.email);
      console.log("remove() => (this.$vnode.key, 1) " + this.$vnode.key);
      // this.$parent.users.splice(this.$vnode.key, 1)
      // this.$parent.users[this.$vnode.key].isActive = false;
      if (this.$vnode.key != 0) { //not admin
        this.$parent.$parent.users.users[this.$vnode.key].isActive = false
        this.$parent.$parent.setUsers()
      }
    },
    addUser() {
      console.log("add() => " + this.user.email);
      // this.$parent.users.splice(this.$parent.users.length, 0, this.user)
      // this.$parent.users[this.$vnode.key].isActive = true;
      this.$parent.$parent.users.users[this.$vnode.key].isActive = true;
      this.$parent.$parent.setUsers()
    },
  },
}
</script>
