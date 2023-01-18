<script setup lang='ts'>
import ClientList from '../components/ClientList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue'

const { isLoading, clients, currentPage, totalPages, getPage } = useClients();

</script> 

<template>
    <div>
        <!-- Client list-->
        <ClientList :clients="clients" />

        <!-- PaginationNumbers -->
        <PaginationNumbers :current-page="currentPage" :total-pages="totalPages" @page-changed="($event) => getPage($event)" />

        <!-- LoadingModal -->
        <LoadingModal v-if="isLoading" />
    </div>
</template> 

<style lang='css' scoped>

</style>