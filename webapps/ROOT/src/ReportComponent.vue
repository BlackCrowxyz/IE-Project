<template>
<div class="container text-center text-white p-2 pb-5 rounded w-lg-50 w-md-75 w-sm-75">
  <h3 id="user-data" class="text-dark h3 py-4"></h3>
  <div class="font-weight-bold text-primary pb-3">
    خوش آمدید،
    {{$parent.currentUser.username}}
  </div>
  <div class="row shadow1">
    <div class="col rounded-right bg-white text-dark">
      <form id="report" class="form-group" @submit.prevent>
        <div class="font-weight-bold p-4">
          گزارش خود را اینجا بنویسید
        </div>
        <span class="pl-2">
          موضوع:
        </span>
        <input class="form-control" type="text" v-model="title" placeholder="مثلا، هوای کلاس ۱۰۳ خیلی سرده!" required>
        <br>
        <span class=" pl-2">
          توضیحات:
        </span>
        <!-- <input type="text" placeholder=
        " مثلا، زمستونا که میشه، دستگاه گرمایشی درست کار نمیکنه و هوای کلاس سرد میشه، لطفا رسیدگی کنید
        " required> -->
        <textarea class="form-control" rows="3" v-model="details" placeholder="جزیئات موضوع را اینجا شرح دهید" required></textarea>
        <br>
        <span class="pl-2">
          مسؤل:
        </span>
        <input class="form-control" type="text" v-model="responsible" placeholder="مسؤل را انتخاب کنید..." required>
        <!-- <input class="btn btn-primary mb-4" type="button" value="ثبت مورد" onclick="location.href='report-list.html'"> -->
        <!-- <button type="submit" class="btn btn-primary mt-3 w-50 shadow1">ثبت مورد</button> -->
        <button @click="setPost" class="btn btn-primary mt-3 w-50 shadow1">ثبت مورد</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
var reportURL = 'https://api.myjson.com/bins/k49qs';
export default {
  name: 'report-component',
  data() {
    return {
      title: '',
      details: '',
      responsible: '',
      id: 0,
      posts: '',
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    setPost() {
      console.log('ReportComponent > setPost() called');
      if (this.details == '' ||
        this.title == '' ||
        this.responsible == '') {
        console.log("تمام قسمت‌ها را کامل پر کنید");
      }
      //check if the user exists in the database
      else if (this.$parent.authenticated) {
        this.id = (this.posts.reports.length - 1)
        // let jsonStr = `{"reports": []}`;
        this.getPosts();
        let obj = this.posts;
        obj['reports'].push({
          "id": this.id + 1,
          "email": this.$parent.currentUser.email,
          "title": this.title,
          "detail": this.details,
          "responsible": this.responsible,
          "status": "open",
          "date": new Date(),
          "satisfied": "",
          "newDetail": ""
        });
        this.$axios
          .put(reportURL, obj)
          .then(response => (this.posts = response.data))
          .catch(error => console.log(error))
        this.$parent.posts = this.posts
        //changing the page content to 'welcome'
        this.$router.replace(`/reports-list`);
        this.title = '';
        this.detail = '';
        this.responsible = '';
      } else {
        console.log("ابتدا وارد سایت شوید");
      }
    },
    getPosts() {
      console.log('ReportComponent > getPosts() called');
      this.$axios
        .get(reportURL)
        .then(response => (this.posts = response.data))
        .catch(error => console.log(error))
    },
  },
}
</script>

<style>

</style>
