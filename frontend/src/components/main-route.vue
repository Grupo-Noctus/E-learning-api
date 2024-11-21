<template>
    <v-card theme="dark" >
    <v-layout class="rounded round-md">
    <navRoute />
      <v-app-bar title="Elearning"></v-app-bar>
      <v-main style="max-height: 100vh; height: 100vh">
        <RouterView />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import navRoute from './nav/nav-route.vue'

</script>

<style lang="scss" scoped>

</style>