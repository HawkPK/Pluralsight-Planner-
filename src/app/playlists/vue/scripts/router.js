import VueRouter from 'vue-router'

import CreatePlaylist from '../components/CreatePlaylist.vue';
import CurrentPlaylists from '../components/CurrentPlaylists.vue';

export default new VueRouter({
    routes: [{
            path: '/CurrentPlaylists',
            component: CurrentPlaylists
        },
        {
            path: '/CreatePlaylist',
            component: CreatePlaylist
        }
    ]
})