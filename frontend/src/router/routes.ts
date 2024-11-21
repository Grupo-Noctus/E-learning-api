import HomeView from '../views/HomeView.vue'
import MainCourse from '@/views/Course/main.course.vue'

const routes = [
  { 
    path: '/',
    component: HomeView 
  },
  { 
    path: '/course', 
    component: MainCourse
  },
]

export default routes