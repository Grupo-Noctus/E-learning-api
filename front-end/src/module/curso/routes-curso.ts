import type { RouteRecordRaw } from 'vue-router'
import AddCurso from './views/actions.vue/add.curso.vue'
import EditCurso from './views/actions.vue/edit.curso.vue'
import Curso from './views/curso.vue'
import EditForm from './views/actions.vue/actionForm/editForm.vue'
import Modulo from './views/actions.vue/modulo.vue'

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
            {
                path: '/curso/edit/:id',
                name: 'Edit-curso-form',
                component: EditForm,
            },
            {
                path: '/curso/module',
                name: 'Module',
                component: Modulo,
            },
        ],
    },
]
