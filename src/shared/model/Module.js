class Module {
    constructor({
        id,
        title,
        duration,
        percentComplete,
        selected,
        clips,
        orderIndex,
        url,
    }){
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.percentComplete = percentComplete;
        this.selected = selected;
        this.clips = clips;
        this.orderIndex = orderIndex;
        this.url = url;
        
        this.classType = this.constructor.name;
    }

    static fromPluralsight({module, progress, courseId}) {
        return new Module({
            id: module.id,
            title: module.title,
            duration: module.duration,
            orderIndex: module.order,
            url: module.playerUrl
                ? `https://app.pluralsight.com${module.playerUrl}`
                : `https://app.pluralsight.com/channels/player?courseId=${courseId}&moduleId=${module.id}`,
            percentComplete: progress.percentComplete,
            selected: progress.selected,
            clips: module.clips.map(x => {
                return typeof(x) === 'string'
                    ? { slug: x }
                    : { id: x.id }
            })
        })
    }
}
