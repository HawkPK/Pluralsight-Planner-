<template lang="pug">
div
    div
        router-link(to='/CurrentPlaylists') Your Playlist
        router-link(to='/CreatePlaylist') Create Playlist
        router-view
</template>

<script>
export default {   
    computed: {
        playlist(){
            return this.$store.state.playlist
        }
    }
}
</script>
<style lang="scss" scoped>
  
</style>