import type { Client } from "@/clients/interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "../../api/clients-api";

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get<Client[]>("/clients?_page1");
  return data;
};

const useClients = () => {
  const { isLoading, data } = useQuery(
    ['clients?page=', 1],
    () => getClients()
  );

  return {
    isLoading,
    data
  };
};

export default useClients;
