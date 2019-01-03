<template lang="pug">
.search-result(:class='{ "is-selected": course.expanded }')
    md-list-item(@click='selected', :md-ripple='false')
        .is-new(v-if='isNew') NEW
        md-avatar
            a.play-icon(:href='playUrl', @click.stop='openLink($event)')
                img(src='../../../images/video-play-32-w.png', alt='Play')
        .md-list-item-text
            span.title(:title='course.title')
                a(:href='courseUrl', @click.stop='openLink($event)') {{ course.title }}
            p.details
                span.author by {{ course.authors[0].displayName }}
                span.level {{ course.skillLevels }}
                span.date {{ date }}
                span.length {{ duration }}
        md-button.md-icon-button.md-list-action(@click.stop="showPlaylistSelector = true")
            md-icon add
        md-button.md-icon-button.md-list-action
            md-icon more_vert
    .content.more-details(v-if='course.expanded')
        h4 Description
        p.description {{ course.description }}
        h4 Tags
        .md-chips.md-field
            md-chip(v-for='s in course.subjects.split("|")') {{ s }}
            md-chip(v-for='t in course.tools.split("|")') {{ t }}
    md-divider.md-inset

    md-dialog(:md-active.sync='showPlaylistSelector')
        md-dialog-title Add to Playlist...
        md-dialog-content
            md-list
                md-list-item(v-for="p in playlists")
                    md-checkbox(v-model="p.isChecked")
                        .md-list-item-text {{ p.title }}
                    md-button.md-icon-button.md-list-action(@click.stop="p.isFavorite = !p.isFavorite")
                        md-icon(v-if="p.isFavorite") star
                        md-icon(v-else) star_border

                md-list-item
                    md-button.md-icon-button.md-dense(style="margin: 0 10px 0 -5px", @click='createPlaylist')
                        md-icon add
                    md-field
                        label(for='NewPlaylist') New Playlist
                        md-input#NewPlaylist(v-model="newPlaylistTitle", @keyup.enter='createPlaylist')
        md-dialog-actions
            md-button.md-primary(@click='showPlaylistSelector = false') Close
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import dayjs from 'dayjs'

declare var chrome: any

@Component({})
export default class Course extends Vue {
    @Prop() course: any

    @Emit('selected')
    selected() {}

    showPlaylistSelector: boolean = false
    isFavorite: boolean = false
    newPlaylistTitle: string = ''
    playlists = []

    get isNew() {
        return false
    }

    get courseUrl() {
        return `https://pluralsight.com/courses/${this.course.prodId}`
    }

    get playUrl() {
        return `https://app.pluralsight.com/player?course=${this.course.prodId}`
    }

    get date() {
        return dayjs(this.course.displayDate).format('MMM DD YYYY')
    }

    get duration() {
        const seconds = parseFloat(/PT(.+)S/.exec(this.course.duration)[1])
        const hours = Math.floor(seconds / 60 / 60)
        const minutes = Math.floor(seconds / 60 - hours * 60)
        return `${hours}h ${minutes}m`
    }

    openLink({ currentTarget }) {
        const url = currentTarget.href
        if (chrome.tabs) {
            chrome.tabs.create({ url, active: true })
        }
    }

    createPlaylist() {
        if (this.newPlaylistTitle.trim().length < 1) return

        this.playlists.push({
            title: this.newPlaylistTitle,
            isFavorite: false,
            isChecked: false,
        })
        this.newPlaylistTitle = ''
    }
}
</script>

<style lang="scss" scoped>
.search-result {
    &.is-selected,
    &:hover {
        background: rgba(0, 0, 0, 0.2);
    }

    .md-list-item-button:hover {
        background: transparent !important;
    }
}

.is-new {
    position: absolute;
    background: #f1cc26;
    color: #222;
    right: 50px;
    top: 10px;

    padding: 4px 9px 3px;
    font-size: 13px;
    font-weight: bold;

    border-radius: 10px 0 10px;
    text-shadow: 1px 1px 0 #ffeb3b;
}

.play-icon:not(:hover) {
    opacity: 0.5;
}

.title {
    margin-top: 5px;
    font-size: 18px;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    a {
        color: #fff;
    }
    a:hover {
        color: #fff;
        text-decoration: underline;
    }
}

.search-result__title a {
    color: #d3d3d3;
}

.search-result__title a:hover {
    text-decoration: underline;
}

.details {
    margin-top: 5px;
    display: flex;

    & > span {
        color: #ccc;
        font-size: 0.9em;
        margin-right: 20px;

        &.author {
            width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &.level {
            width: 120px;
        }
        &.date {
            width: 135px;
        }
        &.duration {
            width: 100px;
        }
        &.length {
            width: 100px;
        }
    }
}

.more-details {
    padding: 16px 32px 32px;
    font-size: 0.95em;

    .md-chip:first-child {
        margin-left: 4px;
    }

    .md-chips.md-field {
        padding: 0;
        margin: 0 0 0 -4px;
    }
}

.md-dialog.md-theme-default {
    background-color: #272626;
}

.md-list-item:hover {
    background: rgba(0, 0, 0, 0.2);
}
</style>
