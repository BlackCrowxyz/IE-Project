<template>
<div class="container text-dark pt-3">
  <p class="text-center font-weight-bold h3 p-0">
    لیست گزارشات
    <!-- <button  class="btn btn-sm btn-success m-2" type="button" name="button">یک گزارش بنویسید</button> -->
    <router-link class="btn btn-sm btn-success m-2" :to="`/report`">یک گزارش بنویسید</router-link>
    <filter-component class="pt-2"></filter-component>
  </p>
  <div id="report-list-users" class="text-center w-lg-100 w-md-100 w-sm-atuo">
    <report-content-component v-for="(post, i) in this.posts" :key="i" :post="post"></report-content-component>
    <router-link class="btn btn-sm btn-success m-2" :to="`/report`">یک گزارش بنویسید</router-link>
  </div>
</div>
</template>

<script>
import ReportContentComponent from './ReportContentComponent.vue';
import FilterComponent from './FilterComponent.vue';
export default {
  name: 'report-list-component',
  data() {
    return {
      // posts: [],
      posts:[],
      // filteredPosts: [],
      filter: '',
    }
  },
  created() {
    // this.posts = this.$parent.posts.reports;
    this.posts = this.$parent.posts.reports.slice();
  },
  mounted() {
    // //TODO : filtering reports
    for (var i = 0; i < this.posts.length; i++) {
      // console.log("-0 for loop: my email= "+this.$parent.currentUser.email);
      if (this.posts[i].email != this.$parent.currentUser.email) {
        // alert(this.posts[i].email);
        // alert(this.posts[i].id);
        this.posts.splice(i,1)
        i--;
        // console.log(i+"  123123123");
      }
    }
    // this.posts = this.$parent.posts.reports;
    // console.log(this.posts);
    // let array = this.$parent.posts.reports;
    // console.log(array);
    // if (this.$parent.currentUser.id != 1) {
    //showing related content to the 'Manager'
    //TODO : change this to name of the manager in farsi to work better
    // console.log("i am here "+ this.$parent.posts.reports);
    // this.posts = this.$parent.posts.reports.filter(me => me.responsible == this.$parent.currentUser.username);
    // this.posts = this.posts.filter(me => me);
    // alert(this.posts[0].id);
    // console.log("i am here "+this.posts);

    // } else {
    //   //admin can access every report
    //   console.log("admin goes here");
    //   this.posts = this.$parent.posts.reports;
    // }
  },
  beforeDestroy() {
    console.log("ReportListComponent > beforeDestroy() called");
    this.posts.sort(function(a, b) {
      if (a.id < b.id)
        return -1;
      if (a.id > b.id)
        return 1;
      return 0;
    });

    //TODO
    //this line to for updating the data base 'reports'
    // this.$parent.posts.reports = this.posts;
    //TODO
  },
  methods: {
    filterLits() {
      console.log("1 func call " + this.filter);
      if (this.filter != '') {
        console.log("2 func call");
        let x = this.filter;
        if (x == 'date') {
          this.posts.sort(function(a, b) {
            if (a.date < b.date)
              return -1;
            if (a.date > b.date)
              return 1;
            return 0;
          });
        } else if (x == 'email') {
          this.posts.sort(function(a, b) {
            if (a.email < b.email)
              return -1;
            if (a.email > b.email)
              return 1;
            return 0;
          });
        } else {
          this.posts.sort(function(a, b) {
            if (a.responsible < b.responsible)
              return -1;
            if (a.responsible > b.responsible)
              return 1;
            return 0;
          });
        }

      }
    },
  },
  components: {
    'report-content-component': ReportContentComponent,
    'filter-component': FilterComponent,
  }
}
</script>

<style>

</style>
