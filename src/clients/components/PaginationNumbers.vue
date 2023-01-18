<script setup lang='ts'>
import useClients from '../composables/useClients';

const { getPage, totalPageNumbers, currentPage, totalPages } = useClients();
</script> 

<template>
    <div>
        <button :disabled="currentPage === 1" @click="getPage( currentPage - 1)"> anterior </button>

        <button v-for="number of totalPageNumbers" :key="number" :class="{ active: currentPage === number }"
            @click="getPage(number)">{{ number }}</button>

        <button :disabled="currentPage === totalPages" @click="getPage( currentPage + 1)"> siguiente </button>
    </div>
</template> 

<style lang='css' scoped>
div {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
}

button {
    background-color: transparent;
    font-size: 1rem;
    padding: 1rem 1rem;
    margin: 2rem .3rem;
    text-align: center;
    color: white;
    text-decoration: none;
    transition: background-color .3s ease;
    border-radius: .8rem;
}


button:hover {
    cursor: pointer;
    background-color: #76c2a8;
}

button:disabled {
    cursor: not-allowed;
}

.active {
    background-color: #36bd90;
}
</style>