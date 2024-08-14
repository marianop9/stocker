import AdminView from '@/views/Admin/AdminView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import ProductDetailView from '@/views/Products/Detail/ProductDetailView.vue'
import ProductsView from '@/views/Products/ProductsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Inicio',
            component: HomeView,
        },
        {
            path: '/products',
            name: 'Productos',
            component: ProductsView,
        },
        {
            path: '/products/:id',
            name: 'Detalle',
            component: ProductDetailView,
        },
        {
            path: '/admin',
            name: 'Administraciones',
            component: AdminView,
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
    ],
})

export default router
