angular.module('app')
    .component('page', {
        templateUrl: 'layout.html',
        controller: class PageController {
            isOnPlaylists() {
                return /playlists/.test(location.href);
            }
        },
        $routeConfig: [{
            path: '/playlists/...',
            name: 'Playlists',
            component: 'playlists',
            useAsDefault: true
        }]
    })