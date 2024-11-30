<script setup lang="ts">
import { ref } from 'vue';
import apiLogin from '../apiLogin';
import apilogin from '../apiLogin'

const visible = ref(false);

const name = ref<string | null>(null);
const email = ref<string | null>(null);
const password = ref<string | null>(null);
const role = ref<string | null>(null);
const items = ref(['ADMIN', 'ALUNO', 'INSTRUTOR']);
const foto_perfil = ref<string | null>('https://media.licdn.com/dms/image/C4D12AQENjiz-Sm79OQ/article-cover_image-shrink_720_1280/0/1596679779698?e=2147483647&v=beta&t=9mFlX9NmCdP--LX4nnqQrG2nn7C2Wawt43n5YMJn-Ws');

const submitForm = async () => {

    try {
        const payload = {
            nome: name.value,
            email: email.value,
            senha: password.value,
            papel: role.value,
            foto_perfil: foto_perfil.value,
        };

        const response = await apiLogin.post('/usuario/criar', payload);

        alert('Usuário cadastrado com sucesso!');
        console.log('Resposta do backend:', response.data);
    } catch (error: any) {
        console.error('Erro ao cadastrar usuário:', error);
        alert(error.response?.data?.message || 'Ocorreu um erro ao tentar cadastrar.');
    }
}

</script>

<template>
    <v-card class="mx-auto" max-width="344" title="User Registration">
        <v-container>
            <v-text-field v-model="name" color="primary" label="Nome" variant="underlined" required></v-text-field>

            <v-text-field v-model="email" color="primary" label="E-mail" variant="underlined" required></v-text-field>

            <v-text-field v-model="password" color="primary" label="Senha" placeholder="Insira sua senha"
                variant="underlined" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible" required></v-text-field>


            <v-select v-model="role" :items="items" label="Usuário" variant="outlined"></v-select>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="submitForm">
                Finalizar Cadastro
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>