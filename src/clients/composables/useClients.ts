import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";
import clientsApi from "../../api/clients-api";
import { useClientsStore } from "../../store/clients.store";

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get<Client[]>("/clients?_page=1&_limit=10");
  return data;
};

const useClients = () => {
  const clientsStore = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(clientsStore);

  const { isLoading, data } = useQuery(["clients?page=", 1], () =>
    getClients()
  );

  // estar pendientes de la data, y añadirla al store siempre y cuando haya información
  watch(data, (clientes) => {
    if (clientes) clientsStore.setClients(clientes);
  });

  return {
    // properties
    isLoading,
    clients,
    currentPage,
    totalPages,

    // Methods:
    getPage(page: number) {
      clientsStore.setPage(page);
    },

    //Getters
    //[1,2,3,4,5]
    totalPageNumbers: computed(() =>
      [...new Array(totalPages.value)].map((value, index) => index + 1)
    ),
  };
};

export default useClients;
