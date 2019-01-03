class PlaylistListCtrl {
    constructor($scope, $element, Storage) {
        $scope.orderByField = 'id';
        $scope.reverseSort = false;
        $element.find('#import-modal').modal();

        this.$scope = $scope;

        this.$scope.$on('import:success', (_, subject) => {
            $scope.$apply(this.loadPlaylists());
            Materialize.toast(`${subject} imported successfully`, 5000); // 5s
        });

        this.$scope.$on('import:failed', (_, subject) => {
            Materialize.toast(`ERROR: Import failed - Could not import ${subject}`, 20000); // 20s
        });

        Storage.getCollection('playlists')
        .then(collection => {
            this.playlistsCollection = collection;
            $scope.$apply(this.loadPlaylists());
        });
    }

    loadPlaylists() {
        this.playlists = this.playlistsCollection.items();
    }

    remove(id) {
        var result = confirm("Do you really want to remove this playlist?");
        if (result) {
            this.playlistsCollection.remove(id);
            this.playlists = this.playlistsCollection.items();
        }
    }

    openImport(selector) {
        $(selector).modal('open');
        this.$scope.$broadcast('begin-import');
    }
}

angular.module('app.playlists')
    .component('playlistsList', {
        templateUrl: 'playlists/playlists-list.html',
        controller: PlaylistListCtrl
    });