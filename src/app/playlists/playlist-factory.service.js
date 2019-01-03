class PlaylistFactory {
    constructor(time, courseFactory) {
        this.time = time;
        this.courseFactory = courseFactory;
    }

    fromPluralsightChannel({channel, courses, details, importedDate}) {
        return new Playlist({
            importedDate,
            channelId: channel.id,
            name: channel.name,
            courses: courses
                .filter(({content}) => content.contentType === undefined) // skip attached links
                .map(({content}) => courseFactory.fromPluralsightChannel({content, progress: details[content.id]}))
        })
    }
}

angular.module('app.playlists')
.service('playlistFactory', PlaylistFactory);