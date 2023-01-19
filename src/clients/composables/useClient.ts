import clientsApi from "@/api/clients-api";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, watch, computed } from "vue";
import type { Client } from "../interfaces/client";

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get(`/clients/${id}`);
  return data;
}; 

const updateClient = async (client: Client): Promise<Client> => {
  const { id, ...rest } = client;
  const { data } = await clientsApi.patch<Client>(`/clients/${id}`, rest);
  return data;
};
 
// INVALIDAR CACHES -> Ejemplo en git https://github.com/Xansiety/basic-crud-pinia-ts-TanStack-Query/tree/b9d9c7f392f7f4354ce2677c5159275ceba6e116
// const queryClient = useQueryClient(); // trae el objeto que definimos en el main
// //eliminar todos los query cache en particular
// const queries = queryClient.getQueryCache().clear(); // eliminamos todos los segmentos del cache
// const queries = queryClient.getQueryCache().findAll(['clients?page='], {exact: false}); // eliminar todas las coincidencias
// queries.forEach( query => query.reset()); // invalidar el cache de todas las coincidencias
// queries.forEach( query => query.fetch());
// console.log(queries)  

export const useClient = (id: number) => {
  const client = ref<Client>();

  const { isLoading, data, isError } = useQuery(
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

  const clientMutation = useMutation(updateClient);

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
    clientMutation,
    //methods
    updateClient: clientMutation.mutate,
    isUpdating: computed(()=> clientMutation.isLoading.value),
    isErrorUpdating: computed(()=> clientMutation.isError.value),
    isUpdatingSuccessfully: computed(()=> clientMutation.isSuccess.value),

  };
};

export default useClient; 
