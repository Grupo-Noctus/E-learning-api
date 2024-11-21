<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" class="bg-pink-sisy">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/lego/4.jpg"
      title="Gestor(a)"
    >
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi mdi-account-school"
        title="Aluno"
        value="aluno"
        to="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi mdi-bookshelf"
        title="Curso"
        value="curso"
        to="/course"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rail = ref(true)
const drawer = ref(true)

</script>

<style>

</style>
