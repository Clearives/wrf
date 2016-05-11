import AppDispatcher from '../dispatcher/AppDispatcher'
import {EventEmitter} from 'events'
import _ from 'lodash'
import AppConstants from '../constants/AppConstants'

let _lists = []
let CHANGE_EVENT = 'change'

let AppStore = _.assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _lists;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    }
})
function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _lists.push(id + ' : ' + text)
}

AppDispatcher.register(function(action){
    let text
    switch (action.actionType) {
        case AppConstants.ADD_ITEM:
            text = action.item
            if (text !== '') {
                create(text)
                AppStore.emitChange()
            }
            break
    }
});
 export default AppStore;