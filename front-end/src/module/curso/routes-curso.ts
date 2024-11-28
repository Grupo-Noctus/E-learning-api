import type { RouteRecordRaw } from 'vue-router'
import AddCurso from './views/actions.vue/add.curso.vue'
import EditCurso from './views/actions.vue/edit.curso.vue'
import Curso from './views/curso.vue'

export const cursoRoutes: RouteRecordRaw[] = [
    {
        path: '/curso',
        name: 'Curso',
        component: Curso,
        children: [
            {
                path: '/curso/add',
                name: 'Add-curso',
                component: AddCurso,
            },
            {
                path: '/curso/edit',
                name: 'Edit-curso',
                component: EditCurso,
            },
        ],
    },
]
