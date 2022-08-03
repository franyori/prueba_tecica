
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Product', name:'Product', component: () => import('pages/Product.vue') },
      { path: 'VariacionesProduct', name:'VariacionesProduct', component: () => import('pages/VariacionesProduct.vue') }

    ]
  },

  
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
