<template lang="pug">
div
    .md-layout.md-gutter
        .md-layout-item.md-size-15
        .md-layout-item
            div New Playlist
            div
                md-field
                    label Playlist Name
                    md-input(v-model='title')
                md-field
                    label Courses
                    md-input(v-model='courses')
        md-button.md-raised.md-primary.block(@click='save') Create 

</template>
<script>
export default {
    data: function(){
        return {
            title : "",
            courses : 0,
        }
    },
    methods: {
        save(){
            let newPlaylist = { title : this.title, courses : this.courses};
            this.$store.commit('createNewPlaylist', newPlaylist);
            this.$router.push({path: '/CurrentPlaylists'})
        }
    }
}
</script>
<style lang="scss" scoped>

</style>