<template>
  <div :w="100" class="d-flex justify-end align-center ga-3">
    <v-btn icon="$plus" class="bg-blue" @click="addCourseContent"> </v-btn>
    <v-btn icon="$vuetify" class="bg-green" @click="seeCourseContent"></v-btn>
  </div>
  <div v-if="addCourse > 0">
    <formCourseVue/>
  </div>
  <div v-else>
    show the other  
  </div>
  
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import formCourseVue from './form.course.vue';


  const addCourse = ref(0)
  const courseContent = ref(1)

  function addCourseContent(){
    addCourse.value = 1
    courseContent.value = 0
  }

  function seeCourseContent(){
    addCourse.value = 0
    courseContent.value = 1
  }
</script>
<style scoped></style>
