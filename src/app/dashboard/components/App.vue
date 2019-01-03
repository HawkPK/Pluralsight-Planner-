<template lang="pug">
md-app(md-waterfall='', md-mode='fixed-last')
    md-app-toolbar.md-dense.md-primary
        .md-toolbar-row
            .md-toolbar-section-start
                span.md-title Pluralsight Planner
            .md-toolbar-section-end
                md-menu(md-direction='bottom-end')
                    md-button.md-icon-button(md-menu-trigger='')
                        md-icon more_vert
                    md-menu-content
                        md-menu-item(@click='goTo("app/index.html")') Legacy app
                        md-menu-item(@click='goTo("options/options.html")') Settings
            md-tabs.md-primary(md-alignment='centered', md-active-tab='dashboard')
                md-tab(id='search',    md-label='Search',    md-icon='search')
                md-tab(id='dashboard', md-label='Dashboard', md-icon='dashboard')
                md-tab(id='playlists', md-label='Playlists', md-icon='view_carousel')
    md-app-content
        slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

declare const chrome: any

@Component({})
export default class App extends Vue {
    goTo(url) {
        if (chrome.tabs) {
            chrome.tabs.create({ url, active: true })
        } else {
            location.href = url
        }
    }
}
</script>

<style lang="scss" scoped>
.md-app-content {
    min-height: calc(100vh - 64px);
}
</style>
