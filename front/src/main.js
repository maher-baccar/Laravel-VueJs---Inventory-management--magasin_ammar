import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount('#app')