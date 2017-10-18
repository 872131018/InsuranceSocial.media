import { createStore, combineReducers } from 'redux';
import UserStore from './redux/user.reducer';
import RecentStore from './redux/recent.reducer';
import PlanStore from './redux/plan.reducer';
import AgencyStore from './redux/agency.reducer';
import OptionStore from './redux/option.reducer';
import SelectionStore from './redux/selection.reducer';

const reducers = combineReducers({
    UserStore,
    RecentStore,
    PlanStore,
    AgencyStore,
    OptionStore,
    SelectionStore
});

export default createStore(reducers);
