<script setup lang='ts'>
import { toRef, ref, watch } from 'vue';
export interface Props {
    totalPages: number,
    currentPage: number
}

interface Emits {
    (e: 'pageChanged', page: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const totalPages = toRef(props, "totalPages");
const currentPage = toRef(props, "currentPage");

const totalPageNumbers = ref<number[]>([]);

watch(totalPages, () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map((value, index) => index + 1);
    console.log('Hecho')
}, { immediate: true });

</script> 

<template>
    <div>
        <button :disabled="currentPage === 1" @click="emits('pageChanged', currentPage - 1)"> anterior </button>

        <button v-for="number of totalPageNumbers" :key="number" :class="{ active: currentPage === number }"
            @click="emits('pageChanged', number)">{{ number }}</button>

        <button :disabled="currentPage === totalPages" @click="emits('pageChanged', currentPage + 1)"> siguiente
        </button>
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