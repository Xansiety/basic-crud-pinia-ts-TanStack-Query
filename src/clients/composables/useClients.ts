import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import clientsApi from "../../api/clients-api";
import { useClientsStore } from "../../store/clients.store";

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(true), 2500);
  // });
  // console.log("Se resuelve el timeOut -> Sin embargo ya se ve la data por que ya esta en caché")
  const { data } = await clientsApi.get<Client[]>(
    `/clients?_page=${page}&_limit=10`
  );
  return data;
};

const useClients = () => {
  const clientsStore = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(clientsStore);

  const { isLoading, data } = useQuery(
    ["clients?page=", currentPage],
    () => getClients(currentPage.value)
    // {
    //   staleTime: 1000 * 60, // Yo no estoy esperando que la información este actualizada hasta que pase un minuto
    // }
  );

  // estar pendientes de la data, y añadirla al store siempre y cuando haya información
  watch(
    data,
    (clientes) => {
      if (clientes) clientsStore.setClients(clientes);
    },
    { immediate: true }
  );

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
    // totalPageNumbers: computed(() =>
    //   [...new Array(totalPages.value)].map((value, index) => index + 1)
    // ),
  };
};

export default useClients;
