<template>
    <div>
        <v-card theme="dark">
        <v-layout>
        <v-navigation-drawer
            v-model="drawer"
            :rail="rail"
            permanentjo
            @click="rail = false"
        >

        <img src="" alt="">
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/lego/4.jpg"
                title="Gestora"
                nav
            >
            <template v-slot:append>
                <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
                ></v-btn>
            </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi mdi-account-school" title="Aluno" value="aluno" to="/">
            </v-list-item>
            <v-list-item prepend-icon="mdi mdi-bookshelf" title="Curso" value="curso" to="/about"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>

    <RouterView></RouterView>
    
    </div>
  
</template>



<script setup lang="ts">
import { ref } from "vue";
import { RouterView, RouterLink } from 'vue-router'

    const rail = ref(true)
    const drawer = ref(true)


    const showLog = () => { console.log("show log for him, nigga")}
</script>

<style></style>


