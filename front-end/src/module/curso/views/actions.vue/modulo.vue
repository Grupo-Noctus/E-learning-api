<template>
    <div>
        testeIcaro
        {{ refcourseId }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const refcourseId = ref(0)

refcourseId.value = Number(route.params.id)
</script>

<style scoped></style>
