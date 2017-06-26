import { createStore, combineReducers } from 'redux';
import UserStore from './redux/user.reducer';
import OptionStore from './redux/option.reducer';

const reducers = combineReducers({
    UserStore,
    OptionStore
});

export default createStore(reducers);
