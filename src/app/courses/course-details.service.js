class CourseDetails {
    constructor(fetch, PluralsightURLs, courseFactory) {
        this.fetch = fetch;
        this.PluralsightURLs = PluralsightURLs;
        this.courseFactory = courseFactory;
    }

    async load(courseId) {
        let course = await this.fetch.json(this.PluralsightURLs.CourseDetails(courseId));

        // 🔑 login required
        let progress = await this.fetch.json(this.PluralsightURLs.CourseProgress(courseId));

        return this.courseFactory.fromPluralsight({ course, progress });
    }
}

angular.module('app.courses')
.service('courseDetails', CourseDetails);