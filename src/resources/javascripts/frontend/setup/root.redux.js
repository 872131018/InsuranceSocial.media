import { createStore, combineReducers } from 'redux';
import UserStore from './redux/user.reducer';
import PropertyStore from './redux/property.reducer';

const reducers = combineReducers({
    UserStore,
    PropertyStore
});

export default createStore(reducers);
