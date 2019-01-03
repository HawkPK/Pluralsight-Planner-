const knownTypes = {
    Playlist: Playlist,
    Course: Course,
    Module: Module,
};

class Collection {
    constructor({data, lastId} = {data: "{}", lastId: 0}) {
        this._data = this._restoreModels(JSON.parse(data));
        this._lastId = lastId;
        this._subscribers = [];
    }

    items() {
        return Object.values(this._data);
    }

    find(id) {
        return this._data[id];
    }

    save(object) {
        let id = object.id || ++this._lastId;
        object.id = id;
        this._data[id] = object;
        this._onChanged();
    }

    remove(id) {
        delete this._data[id];
        this._onChanged();
    }

    _onChanged() {
        this._subscribers.forEach(fn => fn(this._serialize()));
    }

    subscribe(fn) {
        this._subscribers.push(fn);
    }

    _serialize() {
        return {
            data: angular.toJson(this._data), 
            lastId: this._lastId
        };
    }

    _restoreModels(data) {
        if (Array.isArray(data)) {
            return data.map(x => this._restoreModels(x));
        }
        else if ((typeof data === "object") && data) {
            Object.keys(data)
                .forEach(k => data[k] = this._restoreModels(data[k]));
        
            if (data.classType && Object.keys(knownTypes).includes(data.classType)) {
                return new knownTypes[data.classType](data);
            }
        }
        return data;
    }
}

angular.module('storage', [])
    .service('Storage', class Storage {

        constructor() {
            this.keys = [];
            this.collections = {};
            this.initialized = this
                ._restore('KEYS')
                .then(keys => {
                    this.keys = keys || [];
                    return this.keys.map(k => this._restoreCollection(k))
                })
                .then(promises => Promise.all(promises))
                .catch(console.error);
        }

        async getCollection(key) {
            await this.initialized;
            if (this.collections[key] === undefined) {
                this.collections[key] = this._createNewCollection(key);
            }
            return this.collections[key];
        }

        removeCollection(key) {
            if (!this.keys.includes(key)) return;
            this.keys = this.keys.filter(k => k !== key);
            this._persist('KEYS', this.keys);
            delete this.collections[key];
            this._persistCollection(key, undefined);
        }

        _createNewCollection(key) {
            if (!this.keys.includes(key)) this.keys.push(key);
            this._persist('KEYS', this.keys);
            return this._createCollection(key);
        }

        _createCollection(key, data) {
            let collection = new Collection(data);
            collection.subscribe(this._collectionChangeHandler(key));
            return collection;
        }

        _collectionChangeHandler(key) {
            return async (data) => {
                await this._persistCollection(key, data);
            };
        }

        async _persistCollection(key, collection) {
            await this._persist('COLLECTION_' + key, collection);
        }

        _persist(key, data) {
            return new Promise(resolve => {
                let obj = {};
                obj[key] = data;
                chrome.storage.local.set(obj, resolve);
            });
        }

        async _restoreCollection(key) {
            let data = await this._restore('COLLECTION_' + key);
            this.collections[key] = this._createCollection(key, data);
        }

        _restore(key) {
            return new Promise((resolve, reject) => {
                chrome.storage.local.get(key, o => resolve(o[key]));
            });
        }
    });