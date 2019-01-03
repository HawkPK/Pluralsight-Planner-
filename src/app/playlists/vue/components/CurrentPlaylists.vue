<template lang="pug">
.border
    md-table(v-model='playlists', md-card='')
        md-table-toolbar
            h1.md-title Playlists
        md-table-row(slot='md-table-row', slot-scope='{ item }')
            md-table-cell(md-label='Title', md-sort-by='title') {{ item.title }}
            md-table-cell(md-label='Courses', md-sort-by='courses') {{ item.courses }}
    md-button.md-accent.button(to='/CreatePlaylist') Import
    md-button.md-primary.button(to='/CreatePlaylist') Add another one
</template>
<script>
export default {
    data: () => ({
        playlists : []
        }
    ),
    mounted() {
        this.loadData()
    },
    methods: {
        loadData(){
            if(this.$store.state.playlist.length == 0){
                this.$store.commit('getPlaylistsFromStorage');
                this.playlists = this.$store.state.playlist;
            } else {
                this.playlists = this.$store.state.playlist;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
    .border {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    }
    .button {
        float: right;
    }
</style>