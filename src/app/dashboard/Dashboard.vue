<template lang="pug">
App
    .content
        .md-layout

            StatsCard(color='orange', icon='wifi_tethering')
                template(slot='content')
                    h3.title 15
                    p.category Playlists
                template(slot='footer'): md-button.md-dense Display

            StatsCard(color='green', icon='play_circle_outline')
                template(slot='content')
                    h3.title 245
                    p.category Courses
                template(slot='footer'): md-button.md-dense Search

            StatsCard(color='blue', icon='bubble_chart')
                template(slot='content')
                    h3.title 9
                    p.category Skills
                template(slot='footer'): md-button.md-dense Forecast

            StatsCard(color='purple', icon='landscape') 
                template(slot='content')
                    h3.title 3
                    p.category Goals
                template(slot='footer'): md-button.md-dense Configure

    .content
        RecentCourses
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import App from './components/App.vue'
import StatsCard from './components/StatsCard.vue'
import RecentCourses from './components/RecentCourses.vue'

@Component({
    components: {
        App,
        StatsCard,
        RecentCourses,
    },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss">
@import '~vue-material/dist/theme/engine';

body {
    font-family: Montserrat, sans-serif;
}

h3.title {
    font-weight: 200;
    font-size: 2.4rem;
    line-height: 1.5em;
    vertical-align: bottom;
}

.md-list.md-theme-default,
.md-content.md-theme-default,
.md-tabs.md-theme-default.md-primary .md-tabs-navigation,
.md-toolbar.md-theme-default.md-primary {
    background: transparent;
}

.md-app {
    background: linear-gradient(25deg, #1c4694, #0c2452);
}

::-webkit-scrollbar {
    width: 4px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.2);
}

::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 8px;
}

.md-card {
    background: #212121 !important;
}
</style>
