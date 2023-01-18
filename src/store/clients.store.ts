import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Client } from "../clients/interfaces/client";
export const useClientsSetupStore = defineStore("clients", () => {
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(5);
  const clients = ref<Client[]>();

  return {
    //state properties
    currentPage,
    totalPages,
    clients,

    // Getters
    // squareCount: computed(() => count.value * count.value),

    //Actions
    setClients(newClients: Client[]) {
      clients.value = newClients;
    },
    setPage(page: number) {
      if (currentPage.value === page) return;
      currentPage.value = page;
    },
  };
});
