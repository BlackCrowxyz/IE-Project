<template>
<!-- navigation bar  -->
<nav class=" navbar-dark navbar-expand-sm bg-new-green sticky-top text-white p-0">
  <div class="row text-center justify-content-center m-0">
    <ul class="navbar-nav">
      <li class="nav_item btn p-1 pointer active">
        <router-link v-if="!$parent.authenticated" :to="`/signup`" class="nav-link">
          ثبت‌نام
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active other">
        <router-link v-if="!$parent.authenticated" :to="`/signin`" class="nav-link">
          ورود
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active">
        <router-link v-if="$parent.authenticated && (this.$parent.currentUser.isStudent)" :to="`/reports-list`" class="nav-link">
          گزارشات من
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active">
        <router-link v-if="$parent.authenticated && (this.$parent.currentUser.id == 1)" :to="`/admin`" class="nav-link">
          مدیریت کاربران
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active">
        <router-link v-if="$parent.authenticated && (!this.$parent.currentUser.isStudent)" :to="`/management`" class="nav-link">
          گزارشات کاربران
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active other">
        <router-link v-if="$parent.authenticated && (this.$parent.currentUser.id != 1)" :to="`/editprofile`" class="nav-link">
          ویرایش پروفایل
        </router-link>
      </li>
      <li class="nav_item btn p-1 pointer active other">
        <router-link v-if="$parent.authenticated" :to="`/`" @click.native="$parent.authenticated = false" class="nav-link" replace>
          خروج
        </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  name: 'navbar-component',
}
</script>

<style>

</style>
