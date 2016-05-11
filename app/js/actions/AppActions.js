import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'



let AppActions = {
    addItem: function(item){
        AppDispatcher.dispatch({
            actionType:AppConstants.ADD_ITEM,
            item: item
        })
    }
}

export default AppActions