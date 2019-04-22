import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import StartComponent from './StartComponent.vue'
import SigninComponent from './SigninComponent.vue'
import SignupComponent from './SignupComponent.vue'
import ReportComponent from './ReportComponent.vue'
import ReportListComponent from './ReportListComponent.vue'
import ProgressComponent from './ProgressComponent.vue'
import EditProfileComponent from './EditProfileComponent.vue'
import AdminTableComponent from './AdminTableComponent.vue'

Vue.prototype.$axios = axios
Vue.use(VueRouter);

//defining the routes(only once)
const routes = [{
    path: '/',
    component: StartComponent,
  },
  {
    path: '/signin',
    component: SigninComponent,
  },
  {
    path: '/signup',
    component: SignupComponent,
  },
  {
    path: '/report',
    component: ReportComponent,
  },
  {
    path: '/reports-list',
    component: ReportListComponent,
  },
  {
    path: '/management',
    component: ProgressComponent,
  },
  {
    path: '/admin',
    component: AdminTableComponent,
  },
  {
    path: '/editprofile',
    component: EditProfileComponent,
  },
];

const router = new VueRouter({
  //shorthand
  routes
});

new Vue({
  el: '#app',
  //shorthand
  router,
  render: h => h(App)
})
