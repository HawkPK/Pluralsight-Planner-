import Vue from "vue";
import Vuex from "vuex";
import { persist, restore } from "./persistance";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      playlist: []
    },
    mutations: {
        createNewPlaylist (state, newPlaylist){
            //Add a new  playlist
            state.playlist.push({title: newPlaylist.title, courses: newPlaylist.courses})
            //chrome storage's synchronization is available only for the extensions
            let playlists = "";
            if (chrome.storage){
                playlists = state.playlist
            } else {
                let convertedPlaylists = [];
                state.playlist.forEach(function(element){
                convertedPlaylists.push(element.title);
                convertedPlaylists.push(element.courses);
                });
                playlists =  convertedPlaylists.join();  
            }             
            persist('local', 'playlists', playlists);
        },
        getPlaylistsFromStorage (state){
            restore('local', 'playlists').then(list => {
                console.log(list + " - current list");
                if (chrome.storage){
                    state.playlist = list;
                } else {
                    for(var i =0; i < list.length; i += 2){
                        let title = list[i];
                        let courses = list[i+1];
                        state.playlist.push({title: title, courses: courses});
                    }
                }
            }).catch(console.warn);
                console.log(state.playlist + "state.playlist");
        },
    },
  })
  export default store