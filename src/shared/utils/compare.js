angular.module('utils.compare', [])
    .factory('compare', function () {
        return {
            byValue: function (key, ascending = true) {
                return function(a, b) {
                    return a[key].localeCompare(b[key]) * (ascending ? 1 : -1)
                };
            },
            strings: function(a, b) {
                return a.localeCompare(b)
            }
        };
    });