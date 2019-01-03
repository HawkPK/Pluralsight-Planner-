class PlaylistEditCtrl {
    constructor($scope, $element, Storage, compare, courseDetails) {
        this.$scope = $scope;
        this.$element = $element;
        this.compare = compare;
        this.courseDetails = courseDetails;

        this.initialized = this.init(Storage);
    }

    async init(Storage) {
        this.playlistsCollection = await Storage.getCollection('playlists');
    }

    async $routerOnActivate(next) {
        this.playlistId = parseInt(next.params.id, 10);

        await this.initialized;

        if (this.playlistId) {
            let currentPlaylist = this.playlistsCollection.find(this.playlistId);
            if (currentPlaylist === undefined) {
                this.$router.navigate(['Playlists']);
                return;
            }

            this.$scope.playlist = currentPlaylist;
            this.$scope.saveButtonText = 'Save';
        } else {
            this.$scope.playlist = new Playlist({
                name: 'New Playlist',
                courses: []
            });
            this.$scope.saveButtonText = 'Create';
        }

        setTimeout(() => {
            this.$element.find('select').material_select();
        }, 100);

        this.$scope.$apply();
    }

    save() {
        this.playlistsCollection.save(this.$scope.playlist);
        this.$router.navigate(['Playlists']);
    }

    async addCourse(courseInfo) {
        let newCourse = await this.courseDetails.load(courseInfo.prodId); // err -> log
        this.$scope.playlist.courses.unshift(newCourse);
        this.$scope.$apply();
    }
}

angular.module('app.playlists')
    .component('playlistEdit', {
        templateUrl: 'playlists/playlist-edit.html',
        controller: PlaylistEditCtrl,
        bindings: { $router: '<' },
    });