import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Default from '@/layout/default.vue'
import { cursoRoutes } from '@/module/curso/routes-curso'
import { alunoRoutes } from '@/module/aluno/routes-aluno'

const routes: RouteRecordRaw[] = [
    {
        path: '',
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
