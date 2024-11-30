import axios from 'axios'
import type { TCurso } from './types/curso.types'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_APP_BASE_URL_CURSO,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

export default {
    postCourse(title: string, description: string, imgCourse: string | null) {
        return axiosInstance.post('/criar', {
            titulo: title,
            descricao: description,
            imagem: imgCourse,
            id_instrutor: 1,
        })
    },

    getCourses() {
        return axiosInstance.get('/pegar-todos')
    },

    getCoursesById(id: number) {
        return axiosInstance.get(`/buscar/${id}`)
    },

    putCourses(id: number, title: string, description: string, imgCourse: string | null) {
        return axiosInstance.put(`/editar/${id}`, {
            titulo: title,
            descricao: description,
            imagem: imgCourse,
            id_instrutor: 2,
        })
    },

    deleteCourses(id: number) {
        return axiosInstance.delete(`/deletar/${id}`)
    },
}
