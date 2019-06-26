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
        <button @click="sendPost" class="btn btn-primary mt-3 w-50 shadow1">ثبت مورد</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'report-component',
  data() {
    return {
      title: '',
      details: '',
      responsible: '',
    }
  },
  methods: {
    axiosReq(url, obj) {
      return this.$axios
        .post(url, obj)
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    sendPost() { //createPost
      console.log('ReportComponent > sendPost() called');
      if (this.details == '' || this.title == '' || this.responsible == '') {
        alert("تمام قسمت‌ها را کامل پر کنید");
      } else if (this.$parent.authenticated) {
        this.axiosReq('http://localhost:8080/contacts/rest/myservice/createPost', {
          "from_token": localStorage.getItem("token"),
          "to_id": 2, //TODO: create a select box with vue(this.responsible,)
          "title": this.title,
          "detail": this.details,
          "lastUpdate": "time 2019", //Time of now should go
          "status": "open",
          "satisfied": false
        }).then(data => {
          let msg = JSON.parse(JSON.stringify(data))
          if (typeof msg !== 'object' && !msg.success) {
            alert(msg.success)
            console.log(msg.success);
          } else {
            this.$parent.posts = msg.data
            // TODO: is it needed????? //
            // this.posts = msg.data  //
            this.$router.replace(`/reports-list`); //changing the page content to 'welcome'
          }
        })
        this.title = '';
        this.detail = '';
        this.responsible = '';
      } else {
        alert("ابتدا وارد سایت شوید");
      }
    },
  },
}
</script>
