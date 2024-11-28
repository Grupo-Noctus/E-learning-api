<template>
    <div class="pa-3">
        <div v-for="each in courses" :key="each['id_curso']">
            <card
                :title="each['titulo']"
                :description="each['descricao']"
                :func-one="testeEdit"
                :func-two="testeDelete"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import card from '@/components/card.vue'
import apiCurso from '../../api-curso'

const courses = ref([])

// Função para criar URL a partir de um objeto File
function getImageUrl(file: File) {
    return URL.createObjectURL(file)
}

const testeDelete = () => {
    console.log('teste de delete')
}

const testeEdit = () => {
    console.log('teste de edit')
}

onMounted(async function () {
    const coursePromisse = await apiCurso.getCourses()
    courses.value = coursePromisse.data
})
</script>

<style scoped></style>
