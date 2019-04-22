<template>
<div class="row shadow1 m-3">
  <div class="col-md-3 text-center">
    <br>
    <span class="border border-secondary text-secondary rounded p-1">
      {{post.status}}
    </span>
    <br>
    <div class="mt-3">
      مسؤل: {{post.responsible}}
    </div>
    <div v-if="post.status == 'closed' && post.satisfied == ''" class="border border-info p-2 m-3 rounded">
      <div class="m-1">از این اقدام راضی هستید؟</div>
      <button @click="isSatisfied('+')" class="btn btn-info m-1" type="button" name="button">بله</button>
      <button @click="isSatisfied('-')" class="btn btn-danger m-1" type="button" name="button">خیر</button>
    </div>
    <div v-else-if="post.status == 'closed' & post.satisfied != ''" class="border border-info p-2 m-3 rounded">
      <div class="m-1">
        ممنون از نظر شما
      </div>
    </div>
  </div>
  <div class="col-md-9 bg-white text-right">
    <p class="font-weight-bold h5 pt-4 pb-2">
      {{post.title}}
    </p>
    <p class="text-secondary">
      توسط
      {{post.email}}
      در تاریخ
      {{post.date}}
    </p>
    <hr>
    <p class="">
      {{post.detail}}
    </p>
    <hr>
    <p class="">
      {{post.newDetail}}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'report-content-component',
  props: ['post'],
  updated() {

  },
  methods: {
    isSatisfied(state) {
      console.log("isSatisfied() >");
      console.log("this.post.satisfied= " + state)
      console.log("this.post.status " + this.post.id)

      // this.$parent.posts[this.post.id].satisfied = state;
      // console.log(this.$parent.posts.length);
      // console.log(this.$parent.posts.reports.length);
      // for (var i = 0; i < this.$parent.posts.length; i++) {
      //   // console.log("this.$parent.posts[i].id = "+this.$parent.posts[i].id);
      //   // console.log("~ this.post.id = "+this.post.id);
      //
      //   if (this.$parent.posts[i].id == this.post.id) {
      //     this.$parent.posts[i].satisfied = state;
      //     // console.log(this.$vnode.key);
      //     this.$parent.posts.splice(i, 1, this.post);
      //   }
      // }

      // this.$parent.posts[this.$vnode.key].satisfied = state;
      // this.$parent.$parent.posts.reports[this.$vnode.key].satisfied = state;
      // alert(this.$parent.$parent.posts.reports.length);

      for (var i = 0; i < this.$parent.$parent.posts.reports.length; i++) {
        // console.log("-0 for loop: my email= " + this.$parent.currentUser.email);
        if (this.$parent.$parent.posts.reports[i].id == this.post.id) {
          // alert(this.$parent.$parent.posts.reports[i].id);
          // alert(this.post.id);
          this.post.satisfied = state;
          this.$parent.$parent.posts.reports[i].satisfied = state;
          this.$parent.$parent.setPostsChange();
          break;
        }
      }

      // this.$parent.$parent.posts.reports[this.$vnode.key].satisfied = state;
      //adding and removing (updating) at the same time
      // this.$parent.posts.splice(this.$vnode.key, 1, this.post);
    },
  },
}
</script>
