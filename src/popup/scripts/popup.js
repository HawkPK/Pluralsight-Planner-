class PopupPage {
    constructor($scope, Storage) {
        this.$scope = $scope;
        this.Storage = Storage;
    }

    $onInit() {
        this.Storage.initialized
        .then(() => {
            let playlists = this.Storage.collections['playlists'].items();
            this.$scope.playlistsCount = playlists.length;
            this.$scope.coursesCount = playlists.reduce((count, nextPlaylist) => count + nextPlaylist.courses.length, 0);
        })
        .then(() => this.$scope.$apply());
    }

    open(url){
        chrome.tabs.create({ url: url, active: true });
        window.close();
    }
}

angular.module('popup', ['storage'])
.component('popupPage', {
    controller: PopupPage,
    templateUrl: 'popup-page.html'
});