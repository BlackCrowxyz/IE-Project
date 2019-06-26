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
      posts: [],
    }
  },
  mounted() {
    this.posts = this.$parent.posts.slice(); //getting posts from parent and convert them to js array
  },
  components: {
    'report-content-component': ReportContentComponent,
    'filter-component': FilterComponent,
  }
}
</script>
