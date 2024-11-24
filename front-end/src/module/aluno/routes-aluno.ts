import type { RouteRecordRaw } from 'vue-router'
import Aluno from './views/aluno.vue'

export const alunoRoutes: RouteRecordRaw[] = [
    {
        path: '/aluno',
        name: 'Aluno',
        component: Aluno,
    },
]
