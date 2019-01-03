class CourseFactory {
    constructor(time) {
        this.time = time;
    }

    _mapAuthors(authorsData) {
        return authorsData.map(a => {
            return {
                fitstName: a.firstName,
                lastName: a.lastName
            };
        })
    }

    fromPluralsightChannel({content, progress}) {
        return new Course({
            id: content.id,
            title: content.title,
            description: content.description,
            duration: content.duration,
            level: content.level,
            lastModifiedDate: content.lastModifiedDate,
            slug: content.slug,
            url: `https://app.pluralsight.com/library/courses/${content.slug}`,
            authors: this._mapAuthors(content.authors),

            modules: content.modules.map(module => {
                let moduleProgress = progress.filter(p => p.id === module.id)[0];
                return Module.fromPluralsight({ module, progress: moduleProgress, courseId: content.id })
            })
        });
    }

    fromPluralsight({course, progress}) {
        return new Course({
            id: course.courseId,
            title: course.title,
            description: course.description,
            duration: this.time.AsSeconds(course.duration),
            level: course.level,
            lastModifiedDate: course.updatedOn,
            slug: course.slug,
            url: `https://app.pluralsight.com/library/courses/${course.slug}`,
            authors: this._mapAuthors(course.authors),

            modules: course.modules.map((module, index) => {
                module.order = index;
                module.duration = this.time.AsSeconds(module.duration);
                let watchedDuration = module.clips
                    .filter(c => progress.watchedContentIds.includes(c.id))
                    .map(c => this.time.AsSeconds(c.duration))
                    .reduce((s, n) => s + n, 0);
                let moduleProgress = {
                    percentComplete: 100 * watchedDuration / module.duration,
                    // selected?
                };
                return Module.fromPluralsight({ module, progress: moduleProgress, courseId: course.id })
            }),
        });
    }
}

angular.module('app.courses')
.service('courseFactory', CourseFactory);