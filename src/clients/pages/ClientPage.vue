<script setup lang='ts'>
import clientsApi from '@/api/clients-api';
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useMutation } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';
import type { Client } from '../interfaces/client';

const route = useRoute();
const { isLoading, client } = useClient(+route.params.id);


const updateClient = async (client: Client): Promise<Client> => {
    const { id, ...rest } = client;
    const { data } = await clientsApi.patch<Client>(`/clients/${id}`, rest);
    return data;
}

const clientMutation = useMutation(updateClient);

</script> 

<template>
    <div>
        <h3> Guardando...</h3>
        <h3>Guardado</h3>
        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <h1>{{ client.name }}</h1>
            <form @submit.prevent="clientMutation.mutate(client!)">
                <input type="text" placeholder="Nombre cliente" v-model="client.name">
                <br>
                <input type="text" placeholder="Dirección cliente" v-model="client.address">
                <br>
                <button type="submit">Guardar</button>
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