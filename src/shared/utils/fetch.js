let jsonFetchOptions = {
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json'
    }
};

angular.module('utils.fetch', [])
    .factory('fetch', function () {
        return {
            json: async function (url) {
                let response = await (fetch(url, jsonFetchOptions));
                return await (response.json());
            },
            check: async function (url) {
                let response = await (fetch(url, jsonFetchOptions));
                return response.status === 200;
            },
            hasAccess: async function (url) {
                let response = await (fetch(url, jsonFetchOptions));
                return response.status !== 401;
            }
        };
    });