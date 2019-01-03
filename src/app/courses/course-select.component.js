class CourseSelectCtrl {
    constructor($scope, $element, courseAutosuggest) {
        this.$scope = $scope;
        this.$element = $element;
        this.courseAutosuggest = courseAutosuggest;
    }

    $onInit() {
        let $input = this.$element.find('input');

        // this.filterEnterEvent($input[0]);
        this.listenAndSuggest($input[0]);
    }

    chooseAndClear() {
        let course = this.selectedCourse(this.$scope.selectedCourseTitle);
        if (course) {
            this.onCourseSelected({course: course});
            this.$scope.selectedCourseTitle = '';
        }
    }

    filterEnterEvent(target) {
        return Observable.fromEvent(target, 'keydown')
            .filter(({ keyCode }) => keyCode === 13)
            .subscribe(event => {
                event.preventDefault();
                // this.handleSelectSuggestion(this.activeResult);
            });
    }

    listenAndSuggest(target) {
        Rx.Observable
            .fromEvent(target, 'keyup')
            .filter(({ keyCode }) => keyCode !== 13)
            .map(e => e.target.value)
            .debounceTime(200)
            .concat()
            .distinctUntilChanged()
            .filter(phrase => phrase.length >= 2)
            .switchMap(phrase => Rx.Observable
                .fromPromise(this.courseAutosuggest.suggest(phrase))
                .catch(error => Rx.Observable.of(error))
            )
            .subscribe(results => {
                if (results.length > 0) {
                    let options = results.reduce((o,n) => { o[n.title] = null; return o }, {});
                    this.filteredOptions = results;

                    $(target)
                    .autocomplete({
                        data : options,
                        minLength: 2
                    })
                    .trigger('keyup');
                }
                // this.cdr.markForCheck();
            });
    }

    selectedCourse(title) {
        if (this.filteredOptions) {
            let selections = this.filteredOptions.filter(x => x.title === title);
            if (selections.length === 1) {
                return selections[0];
            }
        }
    }
}

angular.module('app.courses')
    .component('courseSelect', {
        templateUrl: 'courses/course-select.html',
        controller: CourseSelectCtrl,
        bindings: {
            onCourseSelected: '&'
        },
    });