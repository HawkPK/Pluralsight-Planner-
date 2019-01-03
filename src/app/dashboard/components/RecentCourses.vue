<template lang="pug">
md-card.recent-courses.md-elevation-5
    md-card-header
        md-list.is-transparent
            md-list-item(@click='tab = "published"', :class='{ "is-active-tab": tab === "published" }')
                md-icon rss_feed
                span.md-list-item-text Recently Published
            md-list-item(@click='tab = "saved"', :class='{ "is-active-tab": tab === "saved" }')
                md-icon exit_to_app
                span.md-list-item-text Recently Saved
    md-card-content
        md-list.md-double-line(v-if='tab === "published"')
            Course(v-for='c in publishedCourses', :key='c.prodId', :course='c', @selected='toggle(c)')
        md-list.md-double-line(v-if='tab === "saved"')
            Course(v-for='c in savedCourses', :key='c.prodId', :course='c')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Course from './Course.vue'

declare const chrome: any

@Component({
    components: {
        Course,
    },
})
export default class RecentCourses extends Vue {
    publishedCourses = []
    savedCourses = []
    tab = 'published'

    toggle(course) {
        this.publishedCourses = this.publishedCourses.map(
            c =>
                (c = {
                    ...c,
                    ...{ expanded: c === course && !course.expanded },
                })
        )
    }

    mounted() {
        // TODO: Load with Vuex

        const decodeHTML = text =>
            text
                .replace('&amp;', '&')
                .replace('&gt;', '>')
                .replace('&lt;', '<')
                .replace('&quot;', '"')
                .replace('&#39;', "'")

        fetch(
            `https://sp10050dad.guided.ss-omtrdc.net/?` +
                `page=1` +
                `&m_Sort=displayDate` +
                `&x10=categories` +
                `&q10=course` +
                `&m_Count=10`,
            { credentials: 'same-origin' }
        )
            .then(r => r.json())
            .then(r => r.resultsets[0].results)
            .then(courses => {
                this.publishedCourses = courses.map(c => {
                    return {
                        prodId: c.prodId,
                        displayDate: c.displayDate,
                        title: decodeHTML(c.title),
                        skillLevels: c.skillLevels,
                        authors: c.authors,
                        duration: c.duration,
                        description: c.description,
                        subjects: c.subjects,
                        tools: c.tools,
                    }
                })
            })

        if (chrome.storage) {
            // TODO: Load with Vuex
            chrome.storage.local.get('KEYS', console.log)
        }
    }
}
</script>

<style lang="scss" scoped>
.recent-courses {
    display: grid;

    @media (min-width: 800px) {
        grid-template: 500px / 270px auto;
    }

    @media (min-width: 1800px) {
        margin: 0 calc(25% + 16px);
    }
}

.md-card-content {
    border-left: 1px solid rgba(255, 255, 255, 0.2);

    margin: 16px 16px 16px 0;
    overflow-x: hidden;
    overflow-y: scroll;

    padding-bottom: 0;
}

.md-list {
    padding: 0;

    .md-list-item-content > .md-icon:first-child {
        margin-right: 16px;
    }
}

.is-active-tab {
    background: rgba(0, 0, 0, 0.2);
}
</style>
