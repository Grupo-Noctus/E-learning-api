<template>
    <div class="pa-3">
        <div v-for="each in courses" :key="each['id_curso']">
            <card
                :id="each['id_curso']"
                :title="each['titulo']"
                :description="each['descricao']"
                :func-one="courseEdit"
                :func-two="courseDelete"
                :func-three="seeModules"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import card from '@/components/card.vue'
import apiCurso from '../../api-curso'
import router from '@/router'

const courses = ref([])

onMounted(async function () {
    const coursePromisse = await apiCurso.getCourses()
    courses.value = coursePromisse.data
})

const courseEdit = async function (id_curso: number): Promise<void> {
    router.push({ name: 'Edit-curso-form', params: { id: id_curso } })
}

const courseDelete = async function (id: number): Promise<void> {
    const statusDelete = (await apiCurso.deleteCourses(id)).status
    if (statusDelete !== 200) return alert('Não foi possível deletar o curso')

    alert('curso deletado com sucesso!')
    return location.reload()
}

const seeModules = async function (id_curso: number): Promise<void> {
    router.push({ name: 'Module', params: { id: id_curso } })
}
</script>

<style scoped></style>
