import clientsApi from "@/api/clients-api";
import { useQuery } from "@tanstack/vue-query";
import { ref, watch } from "vue";
import type { Client } from "../interfaces/client";

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get(`/clients/${id}`);
  return data;
};
export const useClient = (id: number) => {
  const client = ref<Client>();

  const { isLoading, data } = useQuery(
    ["cliente", id],
    () => getClient(id),
    {
        cacheTime: 0, // Para que siempre se haga la petición sin mostrar el cache
    }
  );

  watch(data, () => {
    if (data.value)
         client.value = data.value;
  }, { immediate: true });

  return {
    isLoading,
    client,
  };
};

export default useClient;
