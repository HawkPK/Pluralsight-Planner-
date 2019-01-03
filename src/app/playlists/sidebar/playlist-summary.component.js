class PlaylistSummaryCtrl {
    constructor($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;
    }

    async $onInit(next) {
        // await this.initialized;

        this.$scope.showDescription = this.playlist && this.playlist.description;

        setTimeout(() => {
            this.$element.find('.tooltipped').tooltip({
                delay: 50
            });
        }, 100);
    }

    getTimeResult(courses) {
        let allModules = courses.reduce((acc, next) => acc.concat(next.modules), []);
        let timeResult = allModules.reduce((sum, next) => sum + Math.ceil(next.duration * (next.percentComplete / 100)), 0);

        var hours = Math.floor((timeResult / (60 * 60)));
        var divisor_for_minutes = timeResult % 3600;
        var minutes = Math.ceil(divisor_for_minutes / 60);
        var hoursAndMinutes = hours + "h " + minutes + "m";

        return timeResult == 0 ? "Let's start" : "You completed " + hoursAndMinutes;
    }

    getTimeToDeadline() {
        let endDateTxt = this.playlist.timeFrame.endDate;
        if (!endDateTxt) {
            return 'Set your deadline'
        }

        let endDate = moment(endDateTxt, 'YYYY-MM-DD')
        if (endDate < moment()) {
            return `Deadline passed ${endDate.fromNow()}`
        }

        return `${endDate.toNow(true)} to deadline`;
    }

    pickDate(event) {
        this.findInput(event.currentTarget)
            .pickadate({
                selectMonths: true,
                closeOnSelect: false,
                format: 'yyyy-mm-dd',
                onClose: () => $(document.activeElement).blur() //otherwise it reopens after switching tabs
            })
            .pickadate('picker')
            .open();

        event.stopPropagation();
    }

    getProgressDays() {
        let startDate = this.playlist.timeFrame.startDate;
        let endDate = this.playlist.timeFrame.endDate;

        if (!startDate || !endDate)
            return '0%';

        let start = moment(startDate, 'YYYY-MM-DD');
        let end = moment(endDate, 'YYYY-MM-DD');
        var today = moment().startOf('day');
        var daysPassed = today.diff(start, 'days');
        var totalDays = end.diff(start, 'days');

        return Math.ceil(100 * daysPassed / totalDays) + '%';
    }

    findInput(trigger) {
        return this.$element
            .find(trigger)
            .prev('input');
    }
}

angular.module('app.playlists')
    .component('playlistSummary', {
        templateUrl: 'playlists/sidebar/playlist-summary.html',
        controller: PlaylistSummaryCtrl,
        bindings: {
            playlist: '=',
        },
    });