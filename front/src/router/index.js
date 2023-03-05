import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

// meta:{
//   role:''
// }
const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => {
            console.log(store.getters["auth/GET_USER_DATA"]);
            console.log(getUserRole());
            switch (getUserRole()) {
                case 'admin':
                    return import ('@/views/pages/Products.vue');
                    break;
                case 'storekeeper':
                    return import ('@/views/pages/Products.vue');
                    break;
            }
            // switch (store.getters["auth/GET_ROLE"]) {
            //     case 'admin':
            //         import ('@/views/dashboard/Dashboard.vue');
            // }
        }
    },
    {
        path: '/account-settings',
        name: 'pages-account-settings',
        component: () =>
            import ('@/views/pages/account-settings/AccountSettings.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/pages/Login.vue'),
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/storekeepers',
        name: 'storekeepers',
        component: () =>
            import ('@/views/pages/admin/Storekeepers.vue'),
        meta: {
        },
    },
    {
        path: '/categories',
        name: 'categories',
        component: () =>
            import ('@/views/pages/Categories.vue'),
        meta: {
        },
    },
    {
        path: '/products',
        name: 'products',
        component: () =>
            import ('@/views/pages/Products.vue'),
        meta: {
        },
    },
    {
        path: '/providers',
        name: 'providers',
        component: () =>
            import ('@/views/pages/Providers.vue'),
        meta: {
        },
    },
    
    {
        path: '/error-404',
        name: 'error-404',
        component: () =>
            import ('@/views/Error.vue'),
        meta: {
            layout: 'blank',
        },
    },


    
    {
        path: '*',
        redirect: 'error-404',
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})
function getUserRole() {
    return store.getters["auth/GET_USER_DATA"].role.name ?? "";
}
router.beforeEach((to, from, next) => {
    if (!['login'].includes(to.name) && !store.getters["auth/IS_AUTH"]) {
        //console.log(to);
        next({ name: "login" });
    } else if (['login'].includes(to.name) && store.getters["auth/IS_AUTH"]) {
        next({ name: "dashboard" });
    }
    //  else if (to.meta && to.meta.role && to.meta.role != store.getters["auth/GET_ROLE"]) {
    //     next({ name: "error-404" });
    // } 
    else next();
});
export default router