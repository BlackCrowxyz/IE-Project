<template>
<div class="row shadow1 m-3">
  <div class="col-md-3 text-center">
    <br>
    <span class="border border-secondary text-secondary rounded p-1">
      {{post.status}}
    </span>
    <br>
    <div class="mt-3">
      مسؤل: {{post.to_username}}
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
      {{post.from_username}}
      در تاریخ
      {{post.lastUpdate}}
    </p>
    <hr>
    <p class="">
      {{post.detail}}
    </p>
    <hr>
    <p class="">
      {{post.otherDescriptions}}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'report-content-component',
  props: ['post'],
  methods: {
    axiosReq(state){
      return this.$axios
        .post("http://localhost:8080/contacts/rest/myservice/managePosts", {
          "post_id":this.post.post_id,
          "from_token": localStorage.getItem("token"),
          "to_id": this.post.to_id, //TODO: create a select box with vue(this.responsible,)
          "title": this.post.title,
          "detail": this.post.details,
          "lastUpdate": this.post.lastUpdate, //Time of now should go
          "status": this.post.status,
          "satisfied": ((state == '+') ? true : false)
        })
        .then(response => response.data)
        .catch(error => console.log(error))
    },
    isSatisfied(state) {
      console.log("isSatisfied() >");
      console.log("this.post.satisfied= " + state)
      console.log(this.post.post_id);
      console.log(this.post.to_username);
      console.log(this.post.title);

      this.axiosReq(state).then(data => {
        let msg = JSON.parse(JSON.stringify(data))
        if (!msg.success) {
          alert(msg.message)
          console.log(msg.message);
        }else {
          this.$parent.posts = msg.data
          //TODO is it neccessary to do this for update?
          this.$router.replace(`/reports-list`);
        }
      })
      // // console.log("this.post.status " + this.post.id)
      //
      // // this.$parent.posts[this.post.id].satisfied = state;
      // // console.log(this.$parent.posts.length);
      // // console.log(this.$parent.posts.reports.length);
      // // for (var i = 0; i < this.$parent.posts.length; i++) {
      // //   // console.log("this.$parent.posts[i].id = "+this.$parent.posts[i].id);
      // //   // console.log("~ this.post.id = "+this.post.id);
      // //
      // //   if (this.$parent.posts[i].id == this.post.id) {
      // //     this.$parent.posts[i].satisfied = state;
      // //     // console.log(this.$vnode.key);
      // //     this.$parent.posts.splice(i, 1, this.post);
      // //   }
      // // }
      // // this.$parent.posts[this.$vnode.key].satisfied = state;
      // // this.$parent.$parent.posts.reports[this.$vnode.key].satisfied = state;
      // // alert(this.$parent.$parent.posts.reports.length);
      //
      // for (var i = 0; i < this.$parent.$parent.posts.reports.length; i++) {
      //   // console.log("-0 for loop: my email= " + this.$parent.currentUser.email);
      //   if (this.$parent.$parent.posts.reports[i].id == this.post.id) {
      //     // alert(this.$parent.$parent.posts.reports[i].id);
      //     // alert(this.post.id);
      //     this.post.satisfied = state;
      //     this.$parent.$parent.posts.reports[i].satisfied = state;
      //     this.$parent.$parent.setPostsChange();
      //     break;
      //   }
      // }
      //
      // // this.$parent.$parent.posts.reports[this.$vnode.key].satisfied = state;
      // //adding and removing (updating) at the same time
      // // this.$parent.posts.splice(this.$vnode.key, 1, this.post);
    },
  },
}
</script>
