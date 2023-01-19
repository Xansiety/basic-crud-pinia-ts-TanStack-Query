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

  const { isLoading, data, isError} = useQuery(
    ["cliente", id],
    () => getClient(id),
    {
      // cacheTime: 0, // Para que siempre se haga la petición sin mostrar el cache,
      retry: false, // indicar que no e vuelva a hacer la petición en caso de error
      // onSuccess(data){
      //   client.value = data
      // }
      // onError(error: any)
      // {
      //   console.log({error})
      // }
    }
  );

  watch(
    data,
    () => {
      if (data.value) client.value = { ...data.value }; // desestructurar para romper la referencia de solo lectura
    },
    { immediate: true }
  );

  return {
    isError,
    isLoading,
    client, 
  };
};

export default useClient;
