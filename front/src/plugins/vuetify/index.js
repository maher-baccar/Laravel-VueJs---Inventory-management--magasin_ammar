import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import preset from './default-preset/preset'
import fr from 'vuetify/lib/locale/fr'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    preset,
    icons: {
        iconfont: 'mdiSvg',
    },
    lang: {
        locales: { fr },
        current: 'fr',
    },
    theme: {
        options: {
            customProperties: true,
            variations: false,
        },
    },
})