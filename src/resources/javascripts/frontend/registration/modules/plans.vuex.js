const Module = {
    state: {
        plans: []
    },
    mutations: {
        setPlans(state, value) {
            state.plans = value;
        }
    }
}

export default Module;
