<template>
    <v-card class="mx-auto" max-width="400">
        <v-card-text>
            {{ title }}
            <div>{{ description }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange" text="edit" @click="funcOne(id)"></v-btn>

            <v-btn color="red" text="delete" @click="funcTwo(id)"></v-btn>
            <v-btn color="blue" text="modules" @click="funcThree(id)"></v-btn>
            <v-btn color="green" text="add modules" @click="funcFour(id)"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    id: number
    title?: String
    description: String
    image?: string
    funcOne?: (id: number) => Promise<void>
    funcTwo?: (id: number) => Promise<void>
    funcThree?: (id: number) => Promise<void>
    funcFour?: (id: number) => Promise<void>
}>()
</script>

<style scoped></style>
