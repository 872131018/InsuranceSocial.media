const Module = {
    state: {
        name: '',
        email: '',
        phone: '',
        title_code: '',
        notify_frequency: '',
        notify_email: '',
        notify_text: '',
        cell_phone: '',
        regions: [],
        states: [],
        counties: []

    },
    mutations: {
        setUser(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
        setPhone(state, value) {
            state.phone = value;
        },
        setTitle(state, value) {
            state.title_code = value;
        },
        setFrequency(state, value) {
            state.notify_frequency = value;
        },
        setNotifyEmail(state, value) {
            state.notify_email = value;
        },
        setNotifyText(state, value) {
            state.notify_text = value;
        },
        setCellphone(state, value) {
            state.cell_phone = value;
        },
        setUserRegions(state, value) {
            state.regions = value;
        },
        clearUserRegions(state, value) {
            state.regions = [];
        },
        setUserRegion(state, value) {
            for(let selection of state.regions) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.regions.push(value);
        },
        removeUserRegion(state, value) {
            state.regions.splice(value, 1);
        },
        setUserStates(state, value) {
            state.states = value;
        },
        clearUserStates(state, value) {
            state.states = [];
        },
        setUserState(state, value) {
            for(let selection of state.states) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.states.push(value);
        },
        removeUserState(state, value) {
            state.states.splice(value, 1);
        },
        setUserCounties(state, value) {
            state.counties = value;
        },
        clearUserCounties(state, value) {
            state.counties = [];
        },
        setUserCounty(state, value) {
            for(let selection of state.counties) {
                if(selection.code == value.code) {
                    return;
                }
            }
            state.counties.push(value);
        },
        removeUserCounty(state, value) {
            state.counties.splice(value, 1);
        }
    }
}

export default Module;
