<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item
                    prepend-avatar="https://randomuser.me/api/portraits/lego/6.jpg"
                    title="Estranho(a)"
                    nav
                >
                    <template v-slot:append>
                        <v-btn
                            :icon="ChevronsLeft"
                            variant="text"
                            @click.stop="rail = !rail"
                        ></v-btn>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item
                        :prepend-icon="LibraryBig"
                        title="Curso"
                        value="curso"
                        to="/curso"
                    ></v-list-item>
                    <v-list-item
                        :prepend-icon="GraduationCap"
                        title="Aluno"
                        value="aluno"
                        to="/aluno"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 100vh">
                <RouterView />
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { ChevronsLeft, GraduationCap, LibraryBig } from 'lucide-vue-next'
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>

<style scoped></style>
