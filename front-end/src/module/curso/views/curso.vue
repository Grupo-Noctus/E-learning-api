<template>
    <div>
        <v-layout class="overflow-visible" style="height: 56px">
            <v-bottom-navigation v-model="value" color="primary" active>
                <v-btn to="/curso/edit">
                    <v-icon :icon="Pencil"></v-icon>
                    <span>Edit</span>
                </v-btn>
                <v-btn to="/curso/add">
                    <v-icon :icon="Plus"></v-icon>

                    <span>Add</span>
                </v-btn>
            </v-bottom-navigation>
        </v-layout>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { Plus, Pencil } from 'lucide-vue-next'
import { ref } from 'vue'

const value = ref(0)
</script>

<style scoped></style>
