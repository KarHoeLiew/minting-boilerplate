import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NFTList from "../views/NFTList.vue"
import MintForm from "../views/MintForm.vue"
import About from "../views/About.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/nft-list",
    name: "NFTList",
    component: NFTList,
  },
  {
    path: "/mint-form",
    name: "MintForm",
    component: MintForm,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
