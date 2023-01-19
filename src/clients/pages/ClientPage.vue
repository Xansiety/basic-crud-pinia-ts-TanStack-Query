<script setup lang='ts'>
import clientsApi from '@/api/clients-api';
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';
import type { Client } from '../interfaces/client';

const route = useRoute();
const { isLoading, client } = useClient(+route.params.id);



const queryClient = useQueryClient(); // trae el objeto que definimos en el main

const updateClient = async (client: Client): Promise<Client> => {
    // await new Promise((resolve) => {
    //     setTimeout(() => resolve(true), 2500)
    // }); 
    const { id, ...rest } = client;
    const { data } = await clientsApi.patch<Client>(`/clients/${id}`, rest);

    //eliminar todos los query cache en particular
    // const queries = queryClient.getQueryCache().clear(); // eliminamos todos los segmentos del cache
    // const queries = queryClient.getQueryCache().findAll(['clients?page='], {exact: false}); // eliminar todas las coincidencias
    // queries.forEach( query => query.reset()); // invalidar el cache de todas las coincidencias
    // queries.forEach( query => query.fetch());
    // console.log(queries)
    
    return data;
}

const clientMutation = useMutation(updateClient, {
    // onSuccess(data){
    //     console.log({data})
    // }
});


// quitar alerta de isSuccess
watch(clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset()
    }, 2000);
})

</script> 

<template>
    <div>
        <h3 v-if="clientMutation.isLoading.value"> Guardando...</h3>
        <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>

        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <h1>{{ client.name }}</h1>
            <form @submit.prevent="clientMutation.mutate(client!)">
                <input type="text" placeholder="Nombre cliente" v-model="client.name">
                <br>
                <input type="text" placeholder="Dirección cliente" v-model="client.address">
                <br>
                <button :disabled="clientMutation.isLoading.value" type="submit">Guardar</button>
            </form>
        </div>

        <code>
            {{ client }}
        </code>
    </div>
</template> 

<style   scoped>
input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button {
    margin-bottom: 10px;
}
</style>