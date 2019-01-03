class CourseAutosuggest {
    constructor($http) {
        this.$http = $http;
        this.findSearchEndpointUrl({ fallback: 'https://sp10050dad.guided.ss-omtrdc.net' });
    }

    findSearchEndpointUrl({fallback}) {
        this.hostname = fallback;

        fetch('https://www.pluralsight.com/search', { mode: 'no-cors' })
        .then(response => response.text())
        .then(response => response.match(/spUrl:'([^']+)'/)[1])
        .then(
            x => {
                this.hostname = `https:${x}`;
                // log and store
            },
            err => {
                // log
            }
        );
    }

    suggest(phrase) {
        return this.$http
          .get(this.getUrl(phrase))
          .then(this.getResults);
    }

    getUrl(phrase) {
        return `${this.hostname}/?page=1&m_Sort=&q=${phrase}&x10=categories&q10=course&m_Count=25`;
    }

    getResults({data}) {
        return data.resultsets[0].results;
    }
}

angular.module('app.courses')
.service('courseAutosuggest', CourseAutosuggest);