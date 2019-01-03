class Course {
    constructor({
        id,
        title,
        description,
        duration,
        lastModifiedDate,
        level,
        modules,
        slug,
        url,
        authors,
        tags,
        status
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.lastModifiedDate = lastModifiedDate;
        this.level = level;
        this.modules = modules;
        this.slug = slug;
        this.url = url;
        this.authors = authors;
        this.tags = tags || [];
        this.status = status;

        this.classType = this.constructor.name;
    }

    get progress() {
        return this.modules.reduce((sum, next) => sum + next.duration * (next.percentComplete / 100), 0);
    }

    get percentComplete() {
        return 100 * this.progress / this.duration;
    }
}
