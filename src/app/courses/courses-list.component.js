class CourseListCtrl {
    constructor($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;

        this.coursesVM = [];
    }

    updateVM(courses) {
        this.coursesVM = courses
        .map(c => ({
            id: c.id,
            title: c.title,
            tags: c.tags,
            url: c.url,
            percentComplete: c.percentComplete
        }));
    }

    attachObjectFields(course, vm) {
        // to avoid losing changes on save
        vm.tags = course.tags;
    }

    $doCheck() {
        if (this.coursesVM.length < (this.courses && this.courses.length)) {
            this.updateVM(this.courses);
        }
    }

    remove(index) {
        this.coursesVM.splice(index, 1);
        this.courses.splice(index, 1);
    }

    move(index) {
        let currentId = this.coursesVM[index].id;
        this.coursesVM.splice(index, 1);

        let newIndex = this.coursesVM.map(x => x.id).indexOf(currentId);
        let currentCourse = this.courses.filter(x => x.id === currentId)[0];

        this.courses.splice(this.courses.indexOf(currentCourse), 1);
        this.courses.splice(newIndex, 0, currentCourse);

        this.attachObjectFields(currentCourse, this.coursesVM[newIndex]); 
    }
}

angular.module('app.courses')
.component('coursesList', {
    templateUrl: 'courses/courses-list.html',
    controller: CourseListCtrl,
    bindings: {
        courses: '<'
    },
});
