<template>
<div class="container text-dark p-5">
  <div class="text-center">
    <!-- <button class="btn btn-dark m-1" onclick="window.location.href = 'index.html'; setJsonObj('currentUser', null)" type="button" name="button">خروج از حساب کاربری</button> -->
    <!-- <button class="btn btn-primary m-1" onclick="window.location.href = 'report.html'" type="button" name="button">یک گزارش بنویسید</button> -->
  </div>
  <p class="text-center font-weight-bold h3 pt-1">
    گزارشهای ارسالی از طرف دانشجویان
    <filter-component class="pt-3"></filter-component>
  </p>
  <div id="report-list">
    <!-- <progress-content-component v-for="(post, i) in this.posts" :post="post" :key="'A'+post.id"></progress-content-component> -->
    <progress-content-component v-for="(post, i) in this.$parent.posts" :post="post" :key="i"></progress-content-component>
  </div>
</div>
</template>

<script>
import ProgressContentComponent from './ProgressContentComponent.vue'
import FilterComponent from './FilterComponent.vue';
export default {
  name: 'progress-component',
  data() {
    return {
      // // posts: [],
      // posts: [],
      filter: '',
    }
  },
  components: {
    'progress-content-component': ProgressContentComponent,
    'filter-component': FilterComponent,
  },
  // // created() {
  // //   //posts
  // //   // this.posts = this.$parent.posts.reports;
  // //   this.posts = this.$parent.posts.reports.slice();
  // // },
  // mounted() {
  //   let responsible = this.$parent.currentUser.username;
  //   // alert(this.posts.length)
  //   if (responsible != 'admin') {
  //     for (var i = 0; i < this.posts.length; i++) {
  //       // console.log("-0 for loop: my email= "+this.$parent.currentUser.email);
  //       // alert(i + " " + this.posts[i].responsible + " " + responsible);
  //       if (this.posts[i].responsible != responsible) {
  //         this.posts.splice(i, 1)
  //         i--;
  //         // console.log(i+"  123123123");
  //       }
  //     }
  //   }
  // },
  // beforeDestroy() {
  //   console.log("ProgressComponent > beforeDestroy() called");
  //   this.posts.sort(function(a, b) {
  //     if (a.id < b.id)
  //       return -1;
  //     if (a.id > b.id)
  //       return 1;
  //     return 0;
  //   });
  //   // this.$parent.posts.reports = this.posts;
  //   // this.$parent.setPostsChange()      ??TODO???
  // },
  // // beforeUpdate() {
  // //   console.log("ProgressComponent > beforeUpdate() called");
  // //   this.$parent.posts.reports = this.posts;
  // //   this.$parent.setPostsChange()
  // // },
  // methods: {
  //   filterLits() {
  //     console.log("1 func call " + this.filter);
  //     if (this.filter != '') {
  //       console.log("2 func call");
  //       let x = this.filter;
  //       if (x == 'date') {
  //         this.posts.sort(function(a, b) {
  //           if (a.date < b.date)
  //             return -1;
  //           if (a.date > b.date)
  //             return 1;
  //           return 0;
  //         });
  //       } else if (x == 'email') {
  //         this.posts.sort(function(a, b) {
  //           if (a.email < b.email)
  //             return -1;
  //           if (a.email > b.email)
  //             return 1;
  //           return 0;
  //         });
  //       } else {
  //         this.posts.sort(function(a, b) {
  //           if (a.responsible < b.responsible)
  //             return -1;
  //           if (a.responsible > b.responsible)
  //             return 1;
  //           return 0;
  //         });
  //       }
  //
  //     }
  //   },
  // },
}
</script>
