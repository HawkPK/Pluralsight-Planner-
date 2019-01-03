angular.module('app', [
    'ngComponentRouter',
    'app.playlists'
])
    .config(() => {
        $('.button-collapse').sideNav();
    })
    .value('$routerRootComponent', 'page');