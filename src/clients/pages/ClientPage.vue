<script setup lang='ts'>
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';

const route = useRoute();
const router = useRouter();
const { isLoading, client, isError, clientMutation, updateClient, isUpdating, isUpdatingSuccessfully } = useClient(+route.params.id);

// quitar alerta de isSuccess
watch(isUpdatingSuccessfully, () => {
    setTimeout(() => {
        clientMutation.reset()
        router.replace('/clients')
    }, 1000);
})

watch(isError, () => {
    if (isError.value)
        router.replace('/clients')
})
</script> 

<template>
    <div>
        <h3 v-if="isUpdating"> Guardando...</h3>
        <h3 v-if="isUpdatingSuccessfully">Guardado</h3>

        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <h1>{{ client.name }}</h1>
            <form @submit.prevent="updateClient(client!)">
                <input type="text" placeholder="Nombre cliente" v-model="client.name">
                <br>
                <input type="text" placeholder="Dirección cliente" v-model="client.address">
                <br>
                <button :disabled="isUpdating" type="submit">Guardar</button>
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