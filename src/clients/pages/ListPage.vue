<script setup lang='ts'>
import ClientList from '../components/ClientList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue'

const { isLoading } = useClients();

</script> 

<template>
    <div>
        <!-- Client list-->
        <ClientList />

        <!-- PaginationNumbers -->
        <PaginationNumbers />

        <!-- LoadingModal -->
        <LoadingModal v-if="isLoading" />
    </div>
</template> 

<style lang='css' scoped>

</style>