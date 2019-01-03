angular.module('app.playlists', [
    'app.courses',
    'ng-sortable',
    'pluralsight',
    'storage',
    'utils.compare',
    'utils.fetch',
    'utils.time',
])
.component('playlists', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [
        { path: '/',         name: 'Playlists',     component: 'playlistsList', useAsDefault: true },
        { path: '/new',      name: 'PlaylistsNew',  component: 'playlistEdit' },
        { path: '/:id/edit', name: 'PlaylistsEdit', component: 'playlistEdit' },
    ]
});
