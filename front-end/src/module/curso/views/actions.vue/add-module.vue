<template>
    <div>
        <div style="width: 300px; padding: 3rem">
            <v-select
                v-model="selectedItem"
                :items="items"
                density="compact"
                label="type modules"
            ></v-select>
        </div>

        <div v-if="selectedItem === 'task'">
            <task />
        </div>
        <div v-else-if="selectedItem === 'lesson'">
            <Lesson />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import task from '@/components/task.vue'
import Lesson from '@/components/lesson.vue'

const items = ref(['task', 'lesson'])

const selectedItem = ref('')

const route = useRoute()
const id_curso = Number(route.params.id)
</script>

<style scoped></style>
