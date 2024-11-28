<template>
    <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" :src="image" cover>
            <v-card-title>{{ title }}</v-card-title>
        </v-img>

        <v-card-text>
            <div>{{ description }}</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange" text="edit"></v-btn>

            <v-btn color="red" text="delete"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    title?: String
    description: String
    image?: string
}>()
</script>

<style scoped></style>
