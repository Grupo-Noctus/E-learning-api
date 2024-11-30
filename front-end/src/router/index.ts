import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Default from '@/layout/default.vue'
import { cursoRoutes } from '@/module/curso/routes-curso'
import { alunoRoutes } from '@/module/aluno/routes-aluno'
import LoginView from '@/module/login/views/LoginView.vue'
import SignInView from '@/module/login/views/SignInView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/cadastro',
        name: 'Cadastro',
        component: SignInView,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Default,
        redirect: { name: 'Curso' },
        children: [...cursoRoutes, ...alunoRoutes],
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
