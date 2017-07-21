import { createStore, combineReducers } from 'redux';
import UserStore from './redux/user.reducer';
import AgencyStore from './redux/agency.reducer';
import OptionStore from './redux/option.reducer';

const reducers = combineReducers({
    UserStore,
    AgencyStore,
    OptionStore
});

export default createStore(reducers);
