class PlaylistImportCtrl {
    constructor($scope, fetch, compare, time, Storage, PluralsightURLs) {
        this.$scope = $scope;
        this.fetch = fetch;
        this.time = time;
        this.compare = compare;
        this.Storage = Storage;
        this.PluralsightURLs = PluralsightURLs;

        this.$scope.$on('begin-import', () => {
            this.$scope.loading = true;
            this.$scope.loginUrl = this.PluralsightURLs.Login;
            this.$scope.issuesUrl = 'https://gitlab.com/jsek/pluralsight-planner/issues';

            this.$scope.accessFailure = false;
            this.$scope.otherFailure = false;

            this.loadChannels()
                .catch(err => { 
                    console.error(err);
                    if (err.Message == 'Not logged in') {
                        this.$scope.accessFailure = true; 
                    }
                    else {
                        this.$scope.otherFailure = true;
                    }
                })
                .then(_ => this.$scope.loading = false)
                .then(_ => this.$scope.$apply());
        });
    }

    async loadChannels() {
        let hasAccess = await this.fetch.hasAccess(this.PluralsightURLs.User);
        if (!hasAccess) throw new Error('Not logged in');

        this.playlistsCollection = await this.Storage.getCollection('playlists');
        let importedChannelsIds = this.playlistsCollection.items()
            .filter(x => x.importedDate != undefined)
            .map(x => x.channelId);

        let {data: user} = await this.fetch.json(this.PluralsightURLs.User);
        this.user = user;
        this.user.gravatar = `https://www.gravatar.com/avatar/${md5(this.user.email)}`;
        let {data: {myChannels: channels}} = await this.fetch.json(this.PluralsightURLs.Channels);
        this.channels = channels;

        let {data: progress} = await this.fetch.json(this.PluralsightURLs.Progress);
        Object.keys(progress)
        .forEach(key => {
            let channel = this.channels.filter(x => x.id === key)[0];

            channel.progressTime = this.time.AsDuration(progress[key].watchedDuration);
            channel.progressPercentValue = progress[key].percentComplete.toFixed(0) + '%';
            channel.imported = importedChannelsIds.includes(channel.id);
        });

        this.channels.sort(this.compare.byValue('name'));
        this.initialized = true;
    }

    async import() {
        this.importInProgress = true;

        let selectedChannels = this.channels.filter(c => c.selected);

        let importSubject = selectedChannels.length > 1
            ? `${selectedChannels.length} Playlists`
            : `1 Playlist`;

        try {
            let channels = await Promise.all(
                selectedChannels
                .map(async (channel) => {
                    return {
                        channel,
                        courses: (await this.fetch.json(this.PluralsightURLs.ChannelCourses(channel.id))).data,
                        details: (await this.fetch.json(this.PluralsightURLs.ChannelDetails(channel.id))).data,
                        importedDate: new Date()
                    }
                }));

            let importedPlaylists = channels.map(Playlist.fromPluralsight);

            importedPlaylists.forEach(p => this.playlistsCollection.save(p));

            this.importInProgress = false;
            this.$scope.$emit('import:success', importSubject);
        } catch (err) {
            console.error(err);
            this.$scope.$emit('import:failed', importSubject);
        }
    }
}

angular.module('app.playlists')
    .component('playlistsImport', {
        templateUrl: 'playlists/playlists-import.html',
        controller: PlaylistImportCtrl
    });