import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue'), props: true },
      { path: '/search', name: 'search', component: () => import('pages/SearchResults.vue'), props: true },
      { path: '/episodes', name: 'episodes', component: () => import('pages/EpisodeList.vue'), props: true },
      { path: '/video', name: 'video', component: () => import('pages/VideoResult.vue'), props: true }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
