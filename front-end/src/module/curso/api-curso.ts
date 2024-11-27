import axios from 'axios'
import type { TCurso } from './types/curso.types'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_APP_BASE_URL,
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})

export default {
    postCourse(title, description, imgCourse) {
        return axiosInstance.post(' ', {
            titulo: title,
            descricao: description,
            imgCourse: imgCourse,
        })
    },
}
