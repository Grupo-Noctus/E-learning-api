<template>
    <div>
        testeIcaro
        {{ userId }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userId = Number(route.params.id)
</script>

<style scoped></style>
