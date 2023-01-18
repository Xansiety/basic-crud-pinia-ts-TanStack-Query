<script setup lang='ts'>
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';

const route = useRoute();
const { isLoading, client } = useClient(+route.params.id);

</script> 

<template>
    <div>
        <h3> Guardando...</h3>
        <h3>Guardado</h3>
        <LoadingModal v-if="isLoading" />

        <div>
            <h1>Xansiety</h1>
            <form action="">
                <input type="text" placeholder="Nombre cliente">
                <br>
                <input type="text" placeholder="Dirección cliente">
                <br>
                <button type="submit">Guardar</button>
            </form>
        </div>

        <code>
            {{client}}
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