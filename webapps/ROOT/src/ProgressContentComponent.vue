<template>
<div class="row shadow1 w-sm-100 m-3">
  <div class="col-12 bg-white text-right">
    <p class="font-weight-bold h5 pt-4 pb-2">
      {{post.title}}
    </p>
    <p class="text-secondary">
      توسط
      {{post.email}}
      در تاریخ
      {{post.date}}
    </p>

    <div class="mt-3 text-secondary">
      مسؤل: {{post.responsible}}
    </div>
    <br />
    <span class="border border-secondary text-secondary rounded p-1">
      وضعیت: {{post.status}}
    </span>
    <hr>
    <p class="">
      {{post.detail}}
    </p>
    <div class="text-center m-3">
      <button class="btn btn-secondary" @click="showOrNot = !showOrNot" type="button" name="button">اقدام/ تغییر مسؤل</button>
    </div>
  </div>
  <div v-show="showOrNot" class="col-12 text-center border border-info p-3">
    <div class="row">
      <span class="col-sm-4 col-lg-2 text-left m-1 pl-2">
        ارجاع به مسؤل دیگر:
      </span>
      <input v-model="newResponsible" class="col-sm-6 col-lg-3 form-control" type="text" id="report-responsible" placeholder="آقا/خانم ...">
    </div>
    <div class="row pt-2">
      <span class="col-sm-4 col-lg-2 text-left m-1 pl-2">
        وضعیت پیگیری:
      </span>
      <select v-model="newStatus" class="custom-select w-sm-50 w-md-50 w-lg-25">
        <option value="" disabled>
          وضعیت را تعیین کنید
        </option>
        <option v-for="option in options" :value="option.value">
          {{option.name}}
        </option>
      </select>
    </div>
    <div class="text-right py-1 pt-4">
      درباره‌ی موضوع مطرح شده توضیحات خود را بنویسید
    </div>
    <textarea v-model="newDetail" class="form-control" rows="3" id="report-detail" placeholder="جزیئات کار را اینجا بنویسید" required></textarea>
    <br>
    <button @click="reportChecked" class="btn btn-success mt-1" type="button" name="button">تأیید</button></button>
    <button class="btn btn-danger mt-1" @click="showOrNot = !showOrNot" type="button" name="button">رد اقدام</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'progress-component-component',
  data() {
    return {
      showOrNot: false,
      options: [{
          value: 'in Queue',
          name: 'در حال بررسی',
        },
        {
          value: 'Closed',
          name: 'بسته',
        },
        {
          value: 'Postponed',
          name: 'تعویق',
        },
        {
          value: 'Open',
          name: 'باز',
        },
      ],
      // selected: '',
      newResponsible: '',
      newStatus: '',
      newDetail: '',
    }
  },
  props: ['post'],
  methods: {
    reportChecked() {
      this.showOrNot = !this.showOrNot;
      this.post.responsible = (this.newResponsible == "") ? this.post.responsible : this.newResponsible
      this.post.status = (this.newStatus == "") ? this.post.status : this.newStatus
      this.post.newDetail = this.newDetail

      //adding and removing (updating) at the same time
      // this.$parent.posts.splice(this.$vnode.key, 1, this.post)
      // this.$parent.posts.splice(this.post.id, 1, this.post)

      for (var i = 0; i < this.$parent.$parent.posts.reports.length; i++) {
        // console.log("-0 for loop: my email= " + this.$parent.currentUser.email);
        if (this.$parent.$parent.posts.reports[i].id == this.post.id) {
          // alert(this.$parent.$parent.posts.reports[i].id);
          // alert(this.post.id);
          this.$parent.$parent.posts.reports[i].responsible =   this.post.responsible;
          this.$parent.$parent.posts.reports[i].status = this.post.status;
          this.$parent.$parent.posts.reports[i].newDetail = this.post.newDetail;
          this.$parent.$parent.setPostsChange();
          break;
        }
      }

    }
  },
}
</script>

<style>

</style>
