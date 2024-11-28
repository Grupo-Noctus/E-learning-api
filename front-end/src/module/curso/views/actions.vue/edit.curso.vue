<template>
    <div class="pa-3">
        <div v-for="each in courses" :key="each['id_curso']">
            <card :title="each['titulo']" :description="each['descricao']" />
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

onMounted(async function () {
    const coursePromisse = await apiCurso.getCourses()
    console.log(coursePromisse.data[10]['imagem'])
    courses.value = coursePromisse.data
})
</script>

<style scoped></style>
