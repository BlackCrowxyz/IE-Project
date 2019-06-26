<template>
<!-- welcome page content -->
<div class="container text-center text-white p-5 rounded  w-lg-50 w-md-75 w-sm-75">
  <div class="row shadow1">
    <div class="col text-dark rounded-right bg-white">
      <p class="h3 py-4">
        سامانه ثبت پیشنهادات و انتقادات دانشگاه شهید بهشتی
      </p>
      <br>
      <span>
        برای ارسال نظر خود ابتدا ثبت‌نام کنید.
      </span>
      <div class="m-3">
        <button type="button" class="btn btn-success p-0 m-1" name="button" value="ثبت‌نام">
          <router-link :to="`/signup`" class="nav-link">
            ثبت‌نام
          </router-link>
        </button>
        <button type="button" class="btn btn-primary p-0 m-1" name="button" value="ورود">
          <router-link :to="`/signin`" class="nav-link">
            ورود
          </router-link>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'start-component'
}
</script>
