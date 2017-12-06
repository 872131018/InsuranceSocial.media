const Module = {
    state: {
        engagement_mix: '',
        engagement_tone: '',
        plan_code: '',
        monday:'',
        tuesday:'',
        wednesday:'',
        thursday:'',
        friday:'',
        saturday:'',
        sunday:'',
        time_code: ''
    },
    mutations: {
        setPlan(state, value) {
            for(let property in state) {
                state[property] = value[property];
            }
        },
        setEngagementMix(state, value) {
            state.engagement_mix = value;
        },
        setEngagementTone(state, value) {
            state.engagement_tone = value;
        },
        setDay(state, value) {
            state[value.code] = true;
        },
        removeDay(state, value) {
            state[value.code] = false;
        },
        setTimeCode(state, value) {
            state.time_code = value;
        },
    }
}

export default Module;
