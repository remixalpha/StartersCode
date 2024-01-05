import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import StartUpHome from '@/views/StartUpHome.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        index: 1,
      },
    },
    {
      path: '/startUp/:id', 
      name: 'StartUpHome',
      component: StartUpHome,
      props: true 
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
    // Add more routes as needed
  ],
});

export default router;
