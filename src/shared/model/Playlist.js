class Playlist {
    constructor({
        id,
        channelId,
        name,
        importedDate,
        courses,
        description,
        timeFrame
    }) {
        this.id = id;
        this.channelId = channelId;
        this.name = name;
        this.importedDate = importedDate;
        this.courses = courses;
        this.timeFrame = timeFrame || {};

        this.classType = this.constructor.name;
    }

    get duration() {
        return this.courses.reduce((sum, next) => sum + next.duration, 0);
    }

    get progress() {
        return this.courses.reduce((sum, next) => sum + next.duration * (next.percentComplete / 100), 0);
    }

    get percentComplete() {
        return 100 * this.progress / this.duration;
    }
}