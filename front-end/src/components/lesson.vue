<template>
    <div>
        <h2 class="text-center pa-3">Lesson</h2>
        <v-form v-model="valid" @submit.prevent="submitForm">
            <v-container>
                <v-row>
                    <v-col cols="8">
                        <v-text-field
                            v-model="title"
                            :counter="50"
                            :rules="titleRules"
                            label="Title"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-textarea
                            v-model="description"
                            :counter="200"
                            :rules="descriptionRules"
                            label="Description"
                            required
                            variant="filled"
                            auto-grow
                        ></v-textarea>
                    </v-col>
                </v-row>
                <v-btn class="mt-2" type="submit" block>Submit</v-btn>
            </v-container>
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Paperclip } from 'lucide-vue-next'
import apiCurso from '../../api-curso'
import router from '@/router'

const valid = ref<boolean>(false)
const title = ref<string>('')
const description = ref<string>('')
const file = ref<File | null>(null)

const titleRules = [
    (value: string) => {
        if (value) return true
        return 'Title is required.'
    },
    (value: string) => {
        if (value.length <= 50) return true
        return 'Name must be less than 10 characters.'
    },
]

const descriptionRules = [
    (value: string) => {
        if (value) return true
        return 'Description is required.'
    },
    (value: string) => {
        if (value.length <= 200) return true
        return 'Description must be less than 200 characters.'
    },
]

const fileRules = [
    (value: File | null) => {
        if (value === null) return 'file is required'
        return true
    },
]

const submitForm = () => {
    if (valid.value !== true || file.value === undefined || file.value === null) {
        return alert('campos inválidos. Tente novamente')
    } else {
        console.log('criar task')
    }
}
</script>

<style scoped></style>
