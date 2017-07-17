import { createStore, combineReducers } from 'redux';
import UserStore from './redux/user.reducer';

const reducers = combineReducers({
    UserStore
});

export default createStore(reducers);
