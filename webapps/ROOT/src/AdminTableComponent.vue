<template>
<div class="container text-center text-white p-2 pb-5 rounded w-md-75 w-sm-100">
  <h3 id="user-data" class="text-dark h3 py-2"></h3>
  <div class="h2 font-weight-bold text-dark pb-3">
    لیست کاربران
  </div>
  <div class="pb-2">
    <button @click="flip" class="btn btn-dark btn-sm" type="button" name="button">{{this.text}}</button>
    <!-- <button class="btn btn-dark btn-sm" type="button" name="button">نمایش دانشجویان</button> -->
  </div>
  <div class="row shadow1">
    <div class="col p-0 bg-white text-dark">
      <form id="report" class="form-group" @submit.prevent>
        <table class="table table-striped">
          <thead>
            <tr>
              <!-- <th>شماره</th> -->
              <th>بررسی وضعیت</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>وضعیت حساب کاربری</th>
              <th>نوع کاربر</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr is="table-content-component" v-for="(user, i) in this.users" :user="user" :key="i"></tr> -->
            <tr is="table-content-component" v-for="(user, i) in this.$parent.users.users" :user="user" :key="i"></tr>
          </tbody>
        </table>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import TableContentComponent from './TableContentComponent.vue'
export default {
  name: 'admin-table-component',
  data() {
    return {
      users: [],
      text:'نمایش مسؤلان',
      isAll: false,
    }
  },
  methods:{
    flip(){
      this.isAll = !this.isAll;
      if (this.text == 'نمایش مسؤلان') {
        this.text = 'نمایش دانشجویان'
      }else {
        this.text = 'نمایش مسؤلان'
      }
    }
  },
  components: {
    'table-content-component': TableContentComponent,
  },
  // created() {
  //   this.users = this.$parent.users.users
  // },
  // beforeDestroy() {
  //   console.log("AdminTableComponent > beforeDestroy() called");
  //   this.$parent.users.users = this.users;
  // },
}
</script>
