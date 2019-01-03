angular.module('utils.time', [])
    .factory('time', function () {
        return {
            AsDuration: function (secondsArg) {
                
                let duration = moment.duration(secondsArg, 'seconds');
                let hours = duration.hours();
                let minutes = duration.minutes();
                let seconds = duration.seconds();

                return hours > 0 
                    ? `${hours}h ${minutes}m`
                    : minutes > 0
                    ? `${minutes}m ${seconds}s`
                    : `${seconds}s`;
            },
            AsSeconds: function (durationArg) {
                return moment.duration(durationArg).asSeconds();
            }
        };
    });