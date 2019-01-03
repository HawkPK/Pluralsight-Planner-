class OptionsPage {
    constructor($scope, Storage) {
        $('.section-switch').click((e) => {
            e.stopPropagation();
        });
        $('.collapsible').collapsible();
        
        this.$scope = $scope;
        this.Storage = Storage;
    }

    $onInit() {
        this.Storage.initialized
        .then(() => {
            this.collections = 
                this.Storage.keys
                .map(key => { return {
                    key: key,
                    size: this.Storage.collections[key].items().length
                }});
        })
        .then(() => this.$scope.$apply());
    }

    clearAllData() {
        chrome.storage.local.clear();
        this.init();
    }

    removeCollection(key){
        this.Storage.removeCollection(key);
        this.collections = [];
    }
}

angular.module('options', ['storage'])
.component('optionsPage', {
    controller: OptionsPage,
    templateUrl: 'options-page.html'
});