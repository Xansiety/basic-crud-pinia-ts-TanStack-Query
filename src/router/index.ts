import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ClientsLayout from "@/clients/layout/clientsLayout.vue";
import ListPage from "@/clients/pages/ListPage.vue";
import ClientPage from "@/clients/pages/ClientPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/clients",
      name: "clients",
      redirect: { name: "list" },
      component: ClientsLayout,
      children: [
        {
          path: "/list",
          name: "list",
          component: ListPage,
        },
        {
          path: "/clients/:id",
          name: "client-id",
          component: ClientPage,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => ({ name: "Home" }),
    },
  ],
});

export default router;
